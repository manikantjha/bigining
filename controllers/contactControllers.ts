import { mailOptions, transporter } from "@/services/nodemailerServices";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

const CONTACT_MESSAGE_FIELDS: any = {
  name: "Name",
  email: "Email",
  phone: "Phone No.",
  service: "Service",
  message: "Message",
};

function generateEmailContent(data: any) {
  const stringData = Object.entries(data).reduce((str, [key, value]) => {
    return (str += `${CONTACT_MESSAGE_FIELDS[key]}: \n${value}\n\n`);
  }, "");

  const htmlData = Object.entries(data).reduce((str, [key, value]) => {
    return (str += `<tr style="border: solid 1px gray;"><td style="font-weight:bold; border: solid 1px #BDBDBD; padding: 4px 6px;">${CONTACT_MESSAGE_FIELDS[key]}</td><td style="border: solid 1px #BDBDBD; padding: 4px 6px;">${value}</td>`);
  }, "");

  return {
    text: stringData,
    html: `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Mail</title>
    </head>
    <body>
    <div style="padding:24px; font-size:1.15rem;">
    <h2 style="margin-bottom: 16px; text-align: center;">New Enquiry from ${data.name}</h2>
    <table style="border: solid 1px #BDBDBD; border-collapse: collapse; width: auto; margin: auto;">${htmlData}</table>
    <div>
    </body>
    </html>
    `,
  };
}

export default async function contact(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = req.body;
  if (
    !data ||
    (data && !data.name) ||
    (data && !data.email) ||
    (data && !data.phone) ||
    (data && !data.message)
  ) {
    return res.status(400).json({ message: "Bad Request" });
  }

  try {
    await transporter.sendMail({
      ...mailOptions,
      ...generateEmailContent(data),
      subject: data.name,
    });
    return res.status(200).json({ message: "Message sent successfully!" });
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
}
