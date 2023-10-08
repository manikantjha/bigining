import Order from "@/models/order";
import { transporter } from "@/services/nodemailerServices";
import { razorpayInstance } from "@/services/razorpayServices";
import crypto from "crypto";
import { NextApiRequest, NextApiResponse } from "next";

const MESSAGE_FIELDS: any = {
  orderId: "Order ID",
  paymentId: "Payment ID",
  name: "Name",
  pass: "Pass",
  passPrice: "Pass Price",
  numberOfAttendees: "Number of Attendees",
  dates: "Dates",
  amount: "Amount Paid",
};

function generateEmailContent(data: any) {
  const stringData = Object.entries(data).reduce((str, [key, value]) => {
    return (str += `${MESSAGE_FIELDS[key]}: \n${value}\n\n`);
  }, "");

  return {
    text: stringData,
    html: `<!DOCTYPE html>
    <html>
      <head>
        <title>Order Confirmed</title>
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
          <div class="title-bar">Order Confirmed</div>
          <div class="info">
            <div class="label">Order ID:</div>
            <div>${data.orderId}</div>
          </div>
          <div class="info">
            <div class="label">Payment ID:</div>
            <div>${data.paymentId}</div>
          </div>
          <div class="info">
            <div class="label">Name:</div>
            <div>${data.name}</div>
          </div>
          <div class="info">
            <div class="label">Pass:</div>
            <div>${data.pass}</div>
          </div>
          <div class="info">
            <div class="label">Number of Attendees:</div>
            <div>
              ${data.numberOfAttendees}
            </div>
          </div>
          <div class="info">
            <div class="label">Dates:</div>
            <div>
              ${data.dates}
            </div>
          </div>
          <div class="info">
            <div class="label">Amount Paid:</div>
            <div>
              ${data.amount}
            </div>
          </div>
        </div>
      </body>
    </html>
    `,
  };
}

export async function checkout(req: NextApiRequest, res: NextApiResponse) {
  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
  };

  const razorpayOrder = await razorpayInstance.orders.create(options);

  const order = {
    ...razorpayOrder,
    ticketAndUserDetails: { ...req.body },
  };

  const response = await Order.create(order);

  res.status(200).send({ success: true, order: response });
}

export async function paymentVerification(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, _id } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature == razorpay_signature;

  if (isAuthentic) {
    const order = await Order.findById(_id).lean();

    const updatedOrder = {
      ...order,
      paymentDetails: {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      },
    };

    const response = await Order.findByIdAndUpdate(_id, updatedOrder, {
      new: true,
    }).lean();

    // Send Mails
    await transporter.sendMail({
      ...{
        from: "info.bigining@gmail.com",
        to: (order as any)?.ticketAndUserDetails?.email,
      },
      ...generateEmailContent({
        orderId: (response as any)?.paymentDetails?.razorpay_order_id,
        paymentId: (response as any)?.paymentDetails?.razorpay_payment_id,
        name: (response as any)?.ticketAndUserDetails?.name,
        pass: (response as any)?.ticketAndUserDetails?.pass,
        passPrice: (response as any)?.ticketAndUserDetails?.passPrice,
        numberOfAttendees: (response as any)?.ticketAndUserDetails
          ?.numberOfAttendees,
        dates: (response as any)?.ticketAndUserDetails?.dates,
        amount: (response as any)?.ticketAndUserDetails?.amount,
      }),
      subject: (response as any)?.ticketAndUserDetails?.name,
    });

    await transporter.sendMail({
      ...{
        from: "info.bigining@gmail.com",
        to: "info.bigining@gmail.com",
      },
      ...generateEmailContent({
        orderId: (response as any)?.paymentDetails?.razorpay_order_id,
        paymentId: (response as any)?.paymentDetails?.razorpay_payment_id,
        name: (response as any)?.ticketAndUserDetails?.name,
        pass: (response as any)?.ticketAndUserDetails?.pass,
        passPrice: (response as any)?.ticketAndUserDetails?.passPrice,
        numberOfAttendees: (response as any)?.ticketAndUserDetails
          ?.numberOfAttendees,
        dates: (response as any)?.ticketAndUserDetails?.dates,
        amount: (response as any)?.ticketAndUserDetails?.amount,
      }),
      subject: (response as any)?.ticketAndUserDetails?.name,
    });
    // End Send Mails

    res.status(200).send({
      success: true,
      order: response,
    });
  } else {
    res.status(400).send({ success: false });
  }
}
