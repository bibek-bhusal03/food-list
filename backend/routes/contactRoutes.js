import { Router } from "express";
const router = Router();
import ContactUs from "../models/Contact.js";

// Customer queries
router.post("/contactQueries", async (req, res) => {
    try {
      const { Name, email, subject, message } = req.body;
  
      // Create a new teacher
      const newQuery = new ContactUs({
        Name,
        email,
        subject,
        message,
      });
  
      // Save the user to MongoDB
      const savedQuery = await newQuery.save();
      
      console.log(savedQuery);
      res.json(savedQuery);
    } catch (error) {
      console.error("Error registering contact form:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });


  export default router;