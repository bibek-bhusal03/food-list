import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useSendMessage = () => {
  const { messages, setMessages, selectedConversation } = useConversation();
  let userId;
  const selectedConversationId = selectedConversation?._id;
  if (localStorage.getItem("UserLoggedIn") === "true") {
    userId = localStorage.getItem("UserID");
  } else if (localStorage.getItem("NutritionistLoggedIn") === "true") {
    userId = localStorage.getItem("NutritionistID");
  }

  const sendMessage = async (message) => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/messagesSend/${selectedConversationId}/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        }
      );
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setMessages([...messages, data]);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return { sendMessage };
};

export default useSendMessage;
