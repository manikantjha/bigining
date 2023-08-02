import { Schema, model, models } from "mongoose";
import { imageSchema } from "./image";

const teamMemberSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    image: imageSchema,
  },
  { timestamps: true }
);

const TeamMember = models.teamMembers || model("teamMembers", teamMemberSchema);

export default TeamMember;
