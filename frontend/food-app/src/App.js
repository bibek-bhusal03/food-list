import './App.css';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Menuroutes from './components/Menuroutes';
import useSocket from './hooks/useSocket';
function App() {
  useSocket()
  
  return (
    <div>
      <ToastContainer autoClose={3000}></ToastContainer>
      <Menuroutes/>
    </div>
  );
}

export default App;
