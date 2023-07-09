import { Schema, model, models } from "mongoose";

const teamMemberSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  imageURL: String,
  createdAt: { type: Date, default: Date.now },
});

const teamMembersSchema = new Schema({ teamMembers: [teamMemberSchema] });

const TeamMembers =
  models.teamMembers || model("teamMembers", teamMembersSchema);

export default TeamMembers;
