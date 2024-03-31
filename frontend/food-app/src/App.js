import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Menuroutes from "./components/Menuroutes";

import { SocketContextProvider } from "../src/context/SocketContext";
function App() {
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
