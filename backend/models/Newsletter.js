import { Schema, model } from 'mongoose';

const subscriberSchema = new Schema({
    email: {
      type: String,
      unique: true, // Ensure uniqueness of emails in the database
      required: true, // Require an email address for subscription
    },
    lastEmailWater: Date,
    lastEmailMeal: Date,
});
  
const Subscriber = model('Subscriber', subscriberSchema);

export default Subscriber;