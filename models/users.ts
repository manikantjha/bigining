import { Schema, model, models } from "mongoose";

const usersSchema = new Schema(
  {
    uid: { type: String, required: true, unique: true },
    name: { type: String },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const Users = models.users || model("users", usersSchema);

export default Users;
