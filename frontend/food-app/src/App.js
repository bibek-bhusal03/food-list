import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SocketContextProvider } from "../src/context/SocketContext";
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Menuroutes from './components/Menuroutes';
import useSocket from './hooks/useSocket';
import { useEffect, useState } from "react";
import { getLoggedInUser } from "./utils/methods";
import useLoggedInUser from "./zustand/useLoggedInUser";
function App() {

  const { loggedInUser } = useLoggedInUser();
  

  console.log("debug the logged in user ",loggedInUser)






  useSocket()

  return (
    <div>
      <ToastContainer autoClose={3000}></ToastContainer>
      <SocketContextProvider>
        <Menuroutes />
      </SocketContextProvider>
    </div>
  );
}

export default App;
