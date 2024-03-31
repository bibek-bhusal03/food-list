// Newsletter Routes
import { Router } from "express";
const router = Router();
import nodemailer from "nodemailer";
import Subscriber from "../models/Newsletter.js";
import cron from "node-cron";

//subscriber Newsletter Api
router.post("/subscribeNewsletter", async (req, res) => {
  const { email } = req.body;

  // Validate email (you can add more validation)
  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  try {
    // Check if the email is already subscribed
    const existingSubscriber = await Subscriber.findOne({ email });

    if (existingSubscriber) {
      return res.status(400).json({ error: "Email is already subscribed" });
    }

    // Save the new subscriber to the database
    const newSubscriber = new Subscriber({
      email,
      lastEmailWater: null,
      lastEmailMeal: null,
    });

    await newSubscriber.save();

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "hamza.sohailpk@gmail.com",
        pass: "kyvpvdhgatlcytda",
      },
    });

    var mailOptions = {
      from: "support.nutrinest@gmail.com",
      to: email,
      subject: "Nutrinest Newsletter",
      text: `Welcome to NutriNest customer support. Be hydrated and get your meal on time.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: "Error sending email" });
      }

      console.log("Subscription email sent: " + info.response);
      res.json({ message: "Subscription successful. Check your email." });
    });
  } catch (error) {
    console.error("Error processing subscription request", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Automatic Email Api
cron.schedule("0 */1 * * *", async () => {
  const subscribers = await Subscriber.find();
  console.log("Cron job started at local time:", new Date().toLocaleString());
  console.log(subscribers);
  subscribers.forEach(async (subscriber) => {
    //Water Email
    const lastEmailWater = subscriber.lastEmailWater
      ? new Date(subscriber.lastEmailWater).getTime()
      : null;

    const currentTime = new Date().getTime();
    const timeLastEmailWater = lastEmailWater
      ? currentTime - lastEmailWater + 10000
      : null;

    console.log("Time since last email water(ms):", timeLastEmailWater);

    if (!lastEmailWater || timeLastEmailWater >= 1 * 60 * 60 * 1000) {
      await sendWaterIntakeEmail(subscriber.email);
      subscriber.lastEmailWater = new Date().toISOString();
      await subscriber.save();
    }

    //Meal Email
    const lastEmailMeal = subscriber.lastEmailMeal
      ? new Date(subscriber.lastEmailMeal).getTime()
      : null;

    const timeLastEmailMeal = lastEmailMeal
      ? currentTime - lastEmailMeal + 10000
      : null;

    console.log("Time since last email meal(ms):", timeLastEmailMeal);

    if (!lastEmailMeal || timeLastEmailMeal >= 2 * 60 * 60 * 1000) {
      await sendDietSuggestionEmail(subscriber.email);
      subscriber.lastEmailMeal = new Date().toISOString(); // Save in UTC format
      await subscriber.save();
    }
  });
});

async function sendWaterIntakeEmail(email) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "hamza.sohailpk@gmail.com",
      pass: "kyvpvdhgatlcytda",
    },
  });

  const mailOptions = {
    from: "your.email@gmail.com",
    to: email,
    subject: "Stay Hydrated!",
    text: "Remember to drink water for good health.",
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Water intake email sent to: " + email);
  } catch (error) {
    console.error("Error sending water intake email to: " + email, error);
  }
}

async function sendDietSuggestionEmail(email) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "hamza.sohailpk@gmail.com",
      pass: "kyvpvdhgatlcytda",
    },
  });

  const mailOptions = {
    from: "your.email@gmail.com",
    to: email,
    subject: "Take your Meal!",
    text: "Remember to take meal on time for good health.",
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Meal intake email sent to: " + email);
  } catch (error) {
    console.error("Error sending meal intake email to: " + email, error);
  }
}

export default router;
