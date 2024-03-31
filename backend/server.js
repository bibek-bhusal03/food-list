// server.js
import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import foodRoutes from "./routes/foodRoutes.js";
import subscriber from "./routes/subscriber.js";
import userRoutes from "./routes/userRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import nutritionistRoutes from "./routes/nutritionistRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import bodyParser from "body-parser";
import { server, app } from "./socket/socket.js";
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use("/api", foodRoutes);
app.use("/api", subscriber);
app.use("/api", userRoutes);
app.use("/api", nutritionistRoutes);
app.use("/api", contactRoutes);
app.use("/api", chatRoutes);
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongoose.connect(
  "mongodb+srv://ammarahmed20011:ammar2001@cluster0.y9zhsqj.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
