import { Schema, model } from "mongoose";

const chatSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true, auto: true },
  participants: [
    {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference the User model
    },
    {
      type: Schema.Types.ObjectId,
      ref: "Nutritionist", // Reference the Nutritionist model
    },
  ],
  messages: [
    {
      type: String,
      ref: "Message",
      default: [],
    },
  ],
  timestamp: { type: Date, default: Date.now },
});

const Conversation = model("Conversation", chatSchema);

export default Conversation;
