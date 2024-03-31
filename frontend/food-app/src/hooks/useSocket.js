import { useEffect, useRef } from "react";
import io from "socket.io-client";
import { Enums } from "../utils/enums";
import useLoggedInUser from "../zustand/useLoggedInUser";
import setSocketStore from "../zustand/useSocketStore";
import useConversation from "../zustand/useConversation";

const useSocket = () => {

  const { loggedInUser } = useLoggedInUser();
  const socketRef = useRef();
    const { setSocket } = setSocketStore();

  const { setMessages, selectedConversation } = useConversation();
  

  useEffect(() => {
    const socket = io("ws://localhost:8000");
    socketRef.current = socket;
    setSocket(socketRef.current)
    return () => {
      socketRef.current?.emit(Enums.LEAVE, loggedInUser?._id);
    };

  }, [loggedInUser?._id]);






  useEffect(() => {
    if (!loggedInUser?._id || !socketRef.current) return;
    socketRef.current?.emit(Enums.JOIN, loggedInUser._id);
  }, [loggedInUser?._id, socketRef.current]);

  useEffect(() => {
    if (!socketRef.current) return;

    socketRef.current.on(Enums.SEND_ONLINE_USERS, handleOnlineUsersEvent);
    socketRef.current.on(Enums.MESSAGE, handleMessageEvent);
    socketRef.current.on(Enums.SEND_NOTIFICATION, handleNotificationEvent);

    return () => {
      // Clean up previous socket listener
      socketRef.current?.off(Enums.MESSAGE, handleMessageEvent);
      socketRef.current?.off(Enums.SEND_ONLINE_USERS, handleOnlineUsersEvent);
      socketRef.current?.off(Enums.SEND_NOTIFICATION, handleNotificationEvent);
    };
  }, [selectedConversation]);


  const handleMessageEvent = (message) => {
    console.log("debug incomming message: " ,message);

    if (message) {
      setMessages(message)
    }

  };

  const handleNotificationEvent = (notification) => {
    console.log("handle notification event");
  };

  const handleOnlineUsersEvent = (onlineUsers) => {
    console.log("handle online user  event", onlineUsers);
  };
};

export default useSocket;
