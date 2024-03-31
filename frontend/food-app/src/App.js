import './App.css';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Menuroutes from './components/Menuroutes';
function App() {
  return (
    <div>
      <ToastContainer autoClose={3000}></ToastContainer>
      <Menuroutes/>
    </div>
  );
}

export default App;
