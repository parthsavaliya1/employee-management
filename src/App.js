import Dashboard from './component/Dashboard';
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <div>
      <Dashboard />
      <ToastContainer autoClose={3000} />

    </div>
  );
}

export default App;
