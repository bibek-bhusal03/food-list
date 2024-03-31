import { Router } from "express";
import verifyToken from "../middlewares/verifyToken.js";
import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import Request from "../models/Request.js";

const router = Router();

router.get("/sidebarUsers/:userId/:userRole", async (req, res) => {
  try {
    let filteredUsers;
    
    if (req.params.userRole === "User") {
      console.log("user userRole", req.params.userRole);
      filteredUsers = await Request.find({
        user: req.params.userId, // Use _id for consistency
        status: "accepted",
      })
        .populate(["nutritionist", "user"])
        .select("-password -__v"); // Exclude password and version field
      const nutritionist = filteredUsers.map((user) => user.nutritionist);
      return res.json(nutritionist); // Use default 200 status for success
    } else {
      console.log("user role", req.params.userRole);
      filteredUsers = await Request.find({
        nutritionist: req.params.userId, // Use _id for consistency
        status: "accepted",
      })
        .populate(["user", "nutritionist"])
        .select("-password -__v"); // Exclude password and version field
      console.log("filteredUsers", filteredUsers);
        const users = filteredUsers.map((user) => user.user);
        res.json(users); 
    }
  // Use default 200 status for success
  } catch (error) {
    console.error("Error in getUsersForSidebar:", error.message);
    // Consider providing a more informative error message:
    res.status(500).json({ error: "Failed to retrieve users for sidebar" });
  }
});

router.post(
  "/send/:selectedconversation_id/:sender_id",

  async (req, res) => {
    try {
      const { message } = req.body;
      const receiverId = req.params.selectedconversation_id;
      const senderId = req.params.sender_id;

      let conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] },
      });

      if (!conversation) {
        conversation = await Conversation.create({
          participants: [senderId, receiverId],
        });
      }

      const newMessage = new Message({
        senderId,
        receiverId,
        message,
      });

      if (newMessage) {
        conversation.messages.push(newMessage._id);
      }

      // await conversation.save();
      // await newMessage.save();

      // this will run in parallel
      await Promise.all([conversation.save(), newMessage.save()]);


      // thik xa yo sabai code ?

      // // SOCKET IO FUNCTIONALITY WILL GO HERE
      // const receiverSocketId = getReceiverSocketId(receiverId);
      // if (receiverSocketId) {
      //   // io.to(<socket_id>).emit() used to send events to specific client
      //   io.to(receiverSocketId).emit("newMessage", newMessage);
      // }

      res.status(201).json(newMessage);
    } catch (error) {
      console.log("Error in sendMessage controller: ", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.get("api/messages/:id", verifyToken, async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});
export default router;
