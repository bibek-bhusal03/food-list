import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    nutritionist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Nutritionist",
      required: true,
    },
    message: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "declined"],
      default: "pending",
    },
    // ... other request-specific properties if needed
  },
  { timestamps: true }
);

const Request = mongoose.model("Request", requestSchema);

export default Request;
