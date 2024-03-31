import { createContext, useState, useEffect, useContext } from "react";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  let authUser;
  if (localStorage.getItem("isUserLoggedIn") === "true") {
    authUser = localStorage.getItem("User");
  } else if (localStorage.getItem("isNutritionistLoggedIn") === "true") {
    authUser = localStorage.getItem("Nutritionist");
  }
  useEffect(() => {
    if (authUser) {
      const socket = io("http://localhost:8000", {
        query: {
          userId: authUser._id,
        },
      });
      console.log(socket);
      setSocket(socket);

      // socket.on() is used to listen to the events. can be used both on client and server side
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
