import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import setSocketStore from "../zustand/useSocketStore";
import { Enums } from "../utils/enums";
import useLoggedInUser from "../zustand/useLoggedInUser";

const useSendMessage = () => {
  const { messages, setMessages, selectedConversation } = useConversation();
  const { socket } = setSocketStore();
  const {_id} = useLoggedInUser()|| {}







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
        `http://localhost:8000/api/send/${selectedConversationId}/${userId}`,
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
      const socketPayload = {
        sender_id: _id,
        receiver_id:selectedConversation?._id,
        ...data,
      }
      console.log("debug the posted data", data)

      
      console.log("sending socket mesage", socket, socketPayload)

      socket.emit(Enums.SEND_MESSAGE, socketPayload);
    setMessages({...data});
    
    } catch (error) {
      toast.error(error.message);
    }
  };

  return { sendMessage };
};

export default useSendMessage;
