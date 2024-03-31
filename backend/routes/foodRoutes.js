// Food Routes
import { Router } from "express";
const router = Router();
import Food from "../models/Food.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import verifyToken from "../middlewares/verifyToken.js";
import Nutritionist from "../models/Nutritionist.js";

//get all food
router.get("/foods", verifyToken, async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// post food item
router.post("/foodPost", async (req, res) => {
  const { name, calories, category } = req.body;

  try {
    const newFood = new Food({ name, calories, category });
    await newFood.save();

    res.status(201).json(newFood);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
