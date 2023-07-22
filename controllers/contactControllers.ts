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

  // const htmlData = Object.entries(data).reduce((str, [key, value]) => {
  //   return (str += `<tr style="border: solid 1px gray;"><td style="font-weight:bold; border: solid 1px #BDBDBD; padding: 4px 6px;">${CONTACT_MESSAGE_FIELDS[key]}</td><td style="border: solid 1px #BDBDBD; padding: 4px 6px;">${value}</td>`);
  // }, "");

  return {
    text: stringData,
    html: `<!DOCTYPE html>
    <html>
      <head>
        <title>Contact Information</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            color: black;
          }
          .container {
            max-width: 400px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid black;
            background-color: #ffe2c1;
          }
          .title-bar {
            background-color: #4b2d87;
            color: white;
            font-size: 20px;
            padding: 10px;
            text-align: center;
            border-radius: 0px;
            margin-bottom: 20px;
          }
          .info {
            margin-bottom: 10px;
          }
          .label {
            font-weight: bold;
            margin-bottom: 5px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="title-bar">Contact Information</div>
          <div class="info">
            <div class="label">Name:</div>
            <div>${data.name}</div>
          </div>
          <div class="info">
            <div class="label">Email:</div>
            <div>${data.email}</div>
          </div>
          <div class="info">
            <div class="label">Contact Number:</div>
            <div>${data.phone}</div>
          </div>
          <div class="info">
            <div class="label">Selected Service:</div>
            <div>${data.service}</div>
          </div>
          <div class="info">
            <div class="label">Contact Message:</div>
            <div>
              ${data.message}
            </div>
          </div>
        </div>
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
