// server.js
import express from "express";
import mongoose from "mongoose";
import foodRoutes from "./routes/foodRoutes.js";
import subscriber from "./routes/subscriber.js";
import userRoutes from "./routes/userRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import nutritionistRoutes from "./routes/nutritionistRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import { Enums } from "./utils/Enums.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/", (req, res, next) => {
  console.log("hello");
  next();
});
const PORT = process.env.PORT || 8000;

mongoose.connect(
  "mongodb+srv://ammarahmed20011:ammar2001@cluster0.y9zhsqj.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use("/api", chatRoutes);
app.use("/api", foodRoutes);
app.use("/api", subscriber);
app.use("/api", userRoutes);
app.use("/api", nutritionistRoutes);
app.use("/api", contactRoutes);
app.use(bodyParser.json());

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

const userSocketMap = {}; // {userId: socketId}
const getSocketIdOfUser = (user) => {};

io.on("connection", (socket) => {

  io.emit(Enums.SEND_ONLINE_USERS, userSocketMap);

  socket.on(Enums.JOIN, (userId) => {
    console.log("adding user", userId)

    const users = Object.keys(userSocketMap);
    if (!users.includes(userId)) {
      userSocketMap[userId] = socket.id;
      io.emit(Enums.SEND_ONLINE_USERS, userSocketMap);

      console.log("adding");
    } else {
      console.log("this user already exist ", users,   userId);
    }
  });
  console.log("online users", userSocketMap);


  socket.on(Enums.SEND_MESSAGE, (data) => {
    // socket.emit(Enums.MESSAGE,data)
    console.log('receiving message', data)

    const receiver_socket_id = userSocketMap[data.receiver_id];
    if (receiver_socket_id) {
      console.log("sending message to "+ receiver_socket_id)
      io.to(receiver_socket_id).emit(Enums.MESSAGE,data)
    } else {
      console.log("reciver not found", userSocketMap, data)
    }
  });



  // io.emit() is used to send events to all the connected clients

  // socket.on() is used to listen to the events. can be used both on client and server side

  socket.on(Enums.LEAVE, (user_id) => {
    console.log("user disconnected", socket.id);
    delete userSocketMap[user_id]
    

    io.emit("GET_ONLINE_USERS", Object.keys(userSocketMap));
      console.log("online users", userSocketMap);

  });
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    for (let user_id in userSocketMap) {
      // Check if the current key is "id2" and its value is "12"
      if (userSocketMap[user_id] === socket.id) {
        // If the condition is met, delete the property
        delete userSocketMap[user_id];
      }
    }
    socket.emit("GET_ONLINE_USERS", Object.keys(userSocketMap));
    console.log("online users", userSocketMap);
  });
});

export { app, io, server };

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
