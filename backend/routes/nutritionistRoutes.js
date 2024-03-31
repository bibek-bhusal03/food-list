// Nutritionist Routes
import { Router } from "express";
const router = Router();
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import verifyToken from "../middlewares/verifyToken.js";
import Nutritionist from "../models/Nutritionist.js";
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
    cb(null, "nutritionistPics/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

// -------------Nutritionist API's-------------

//user signup
router.post("/nutritionistSignup", upload.single("image"), async (req, res) => {
  try {
    const { firstName, lastname, username, email, password } = req.body;

    // Check if image was uploaded
    const image = req.file;
    if (!image) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    // Check if the user already exists with the given email
    const existingUser = await Nutritionist.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Save user to the database
    const newUser = new Nutritionist({
      firstName,
      lastname,
      username,
      email,
      password: hashedPassword,
      image: image.filename,
    });

    console.log("Received nutritionist signup request:", req.body);
    await newUser.save();

    res.status(201).json({ message: "Nutritionist registered successfully" });
    console.log("Nutritionist Registered");
  } catch (error) {
    console.error("Error during nutritionist signup:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//user login
router.post("/nutritionistLogin", async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    // Check if the user exists
    const user = await Nutritionist.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or email" });
    }

    // Compare passwords
    // const isPasswordValid = await bcrypt.compare(password, user.password);

    // if (!isPasswordValid) {
    //   return res.status(401).json({ message: "Invalid password" });
    // }
    const token = jsonwebtoken.sign(
      { username: user.username },
      "your_secret_key",
      { expiresIn: "10m" }
    );
    res
      .status(200)
      .json({ message: "Nutritionist Login successful", user, Token: token });
  } catch (error) {
    console.error("Error during nutritionist login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// nutritionist image get
router.get("/nutritionistImage/:nutritionistId", async (req, res) => {
  try {
    const nutritionistId = req.params.nutritionistId;

    // Find the user by ID
    const nutritionist = await Nutritionist.findById(nutritionistId);

    if (!nutritionist) {
      return res.status(404).json({ error: "Nutritionist not found" });
    }

    // Return the image file
    res.sendFile(
      path.resolve(__dirname, "../nutritionistPics", nutritionist.image)
    );
  } catch (error) {
    console.error("Error retrieving nutritionist image:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get nutritionist with Image URLs
router.get("/getNutritionist", async (req, res) => {
  try {
    const nutritionists = await Nutritionist.find();

    // Map each nutritionist to include the image URL
    const nutritionistsWithImageURLs = nutritionists.map((nutritionist) => ({
      ...nutritionist.toObject(),
      imageURL: `http://localhost:8000/api/nutritionistImage/${nutritionist._id}`,
    }));

    res.json(nutritionistsWithImageURLs);
  } catch (error) {
    console.error("Error fetching nutritionists:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Define the route to handle the video call initiation request
router.post("/sendRequest", async (req, res) => {
  try {
    // Extract the user ID from the authenticated user

    // Extract the nutritionist ID from the request body
    const { userID, nutritionistId } = req.body;

    // Create a new request object to initiate the video call
    const newRequest = new Request({
      user: userID,
      nutritionist: nutritionistId,
      status: "pending", // You can set the initial status as per your requirement
    });

    // Save the new request object to the database
    await newRequest.save();

    // Send a success response indicating that the request was sent successfully
    res.json({ message: "Request sent successfully" });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error sending request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/acceptRequest/:userId", async (req, res) => {
  try {
    const requestId = req.params.userId;
    console.log("requestId: ", requestId);
    const request = await Request.find({ user: { _id: requestId } });
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }
    console.log("request: ", request);
    request.status = "accepted";
    await request.save();
    res.json({ message: "Request accepted successfully" });
  } catch (error) {
    console.error("Error accepting request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
