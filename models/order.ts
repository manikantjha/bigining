import { Schema, model, models } from "mongoose";

// Define the Order schema
const orderSchema = new Schema({
  amount: Number,
  amount_due: Number,
  amount_paid: Number,
  attempts: Number,
  createdAt: Number,
  currency: String,
  entity: String,
  id: String,
  notes: Array,
  offer_id: Schema.Types.Mixed,
  receipt: Schema.Types.Mixed,
  status: String,
  ticketAndUserDetails: {
    amount: Number,
    dates: [String],
    email: String,
    name: String,
    numberOfAttendees: Number,
    pass: String,
    passPrice: Number,
    phone: String,
  },
  paymentDetails: {
    razorpay_order_id: String,
    razorpay_payment_id: String,
    razorpay_signature: String,
  },
});

// Create the Order model
const Order = models.orders || model("orders", orderSchema);

export default Order;
