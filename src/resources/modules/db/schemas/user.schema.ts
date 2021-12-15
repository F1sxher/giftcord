import { Schema, model } from "mongoose";

const UserProfileSchema = new Schema({
  userId: String,
  currentLevel: Number,
  xpRequired: Number,
  currentXp: Number,
  chatCooldown: Date,
});

model("Users", UserProfileSchema, "Users");
