import { Schema, model } from "mongoose";

const contactSchema = new Schema({
  Name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
});

const ContactUs = model("ContactUs", contactSchema);

export default ContactUs;