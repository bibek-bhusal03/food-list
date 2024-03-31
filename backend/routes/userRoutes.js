// User Routes
import { Router } from "express";
const router = Router();
import bcrypt from "bcrypt";
import User from "../models/User.js";
import jsonwebtoken from "jsonwebtoken";
import nodemailer from "nodemailer";
import verifyToken from "../middlewares/verifyToken.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import Request from "../models/Request.js";

// Get the directory name of the current module
const __dirname = dirname(fileURLToPath(import.meta.url));

// Multer configuration for storing images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

// get user data on basis of user id
router.get("/get-user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user by ID and exclude the password field
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

//user signup
router.post("/signupPage", upload.single("image"), async (req, res) => {
  try {
    const { firstName, lastname, username, email, password } = req.body;

    // Check if image was uploaded
    const image = req.file;
    if (!image) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    // Check if the user already exists with the given email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Save user to the database
    const newUser = new User({
      firstName,
      lastname,
      username,
      email,
      password: hashedPassword,
      image: image.filename,
    });

    console.log("Received signup request:", req.body);
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
    console.log("Registered");
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// user image get
router.get("/userImage/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return the image file
    res.sendFile(path.resolve(__dirname, "../uploads", user.image));
  } catch (error) {
    console.error("Error retrieving user image:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//user login
router.post("/login", async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or email" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jsonwebtoken.sign(
      { username: user.username },
      "your_secret_key",
      { expiresIn: "50m" }
    );
    res.status(200).json({ message: "Login successful", user, Token: token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//BMI api
router.put("/update-bmi/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const { bmi } = req.body;

    await User.findByIdAndUpdate(userId, { "NutritionistData.bmi": bmi });

    res.json({ success: true, message: "BMI updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

//BEE api
router.put("/update-bee/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const { bee } = req.body;

    await User.findByIdAndUpdate(userId, { "NutritionistData.bee": bee });

    res.json({ success: true, message: "BEE updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Sample route for handling forgot password requests
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);
    // Check if the email exists in your database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a unique token for password reset (you may use a library like crypto or uuid)
    // const resetToken = generateUniqueToken();
    const token = jsonwebtoken.sign(
      { email: user.email, id: user._id },
      "your_secret_key",
      {
        expiresIn: "5m",
      }
    );

    const link = `http://localhost:8000/api/resetPassword/${user._id}/${token}`;
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
      subject: "Password Reset Link",
      text: `Welcome to NutriNest customer support. Click on the given click to reset the password, ${link}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        res.status(200).json({ message: "Mail Sent" });
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    console.error("Error in forgot password route:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Sample route for handling password reset
router.post("/resetPassword/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password, confirmPassword } = req.body;

  console.log("Password: ", password);
  console.log("Confirm Password: ", confirmPassword);
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }
  // Check if user exists
  const user = await User.findById(id);
  console.log(user);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  try {
    // Verify the token
    const verify = jsonwebtoken.verify(token, "your_secret_key");

    // Hash the new password
    const encryptedPassword = await bcrypt.hash(password, 10);
    console.log("", encryptedPassword);
    // Update the user's password
    const updatedUser = await User.findByIdAndUpdate(id, {
      $set: { password: encryptedPassword },
    });

    res.json({ status: "Password Updated", updatedUser });
  } catch (error) {
    console.log(error);
    res.json({ status: "Something went wrong" });
  }
});

router.get("/resetPassword/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  console.log(req.params);
  const ID = id;
  const TOKEN = token;
  const user = await User.findOne({ _id: id });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  try {
    const verify = jsonwebtoken.verify(token, "your_secret_key");
    const capitalizedFirstName =
      user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1);
    res.render("../view/index", {
      name: capitalizedFirstName,
      id: ID,
      token: TOKEN,
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "Something went wrong" });
  }
});

router.get("/getUserImage/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return the image file
    res.sendFile(path.resolve(__dirname, "../uploads", user.image));
  } catch (error) {
    console.error("Error retrieving user image:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.get("/getRequestedUser/:nutritionist", async (req, res) => {
  try {
    // Extract nutritionist ID from the decoded token in the request object
    const nutritionistId = req.params.nutritionist;
    // Find requests sent to the logged-in nutritionist
    const requests = await Request.find({
      nutritionist: nutritionistId,
      status: "pending",
    });

    // Extract user IDs from the requests
    const userIds = requests.map((request) => request.user);
    const users = await User.find({ _id: { $in: userIds } });
    // Respond with the user IDs
    const userWithImageURLs = users.map((user) => ({
      ...user.toObject(),
      imageURL: `http://localhost:8000/api/getUserImage/${user._id}`,
    }));
    res.json(users);
  } catch (error) {
    console.error("Error fetching requested users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
export default router;
