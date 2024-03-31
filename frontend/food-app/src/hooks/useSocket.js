import { useEffect, useRef } from "react";
import  io from "socket.io-client";
import { Enums } from "../utils/enums";



const useSocket = () => {
  


    const socketRef = useRef()
    const user = {
        _id: new Date().getTime()
    }
    



  useEffect(() => {
    const socket = io("ws://localhost:8000");
    socketRef.current = socket;

    return () => {
      socketRef.current?.emit(Enums.LEAVE, user?._id);
    };
  }, [user?._id]);



    

  useEffect(() => {
    if (!user._id || !socketRef.current) return;
    socketRef.current?.emit(Enums.JOIN, user._id);
  }, [user._id, socketRef.current]);
    

  useEffect(() => {
    if (!socketRef.current) return;

    socketRef.current.on(Enums.SEND_ONLINE_USERS, handleOnlineUsersEvent);
    socketRef.current.on(Enums.MESSAGE, handleMessageEvent);
    socketRef.current.on(Enums.SEND_NOTIFICATION, handleNotificationEvent);

    return () => {
      // Clean up previous socket listener
      socketRef.current?.off(Enums.SEND_MESSAGE, handleMessageEvent);
      socketRef.current?.off(Enums.SEND_ONLINE_USERS, handleOnlineUsersEvent);
      socketRef.current?.off(Enums.SEND_NOTIFICATION, handleNotificationEvent);
    };
  }, []);


  const handleMessageEvent = (message) => {
    console.log("handle message event")
  };

  const handleNotificationEvent = (notification) => {
    console.log("handle notification event");
 
  };

    const handleOnlineUsersEvent = (onlineUsers) => {
    console.log("handle online user  event",onlineUsers);
  };
};

export default useSocket;
