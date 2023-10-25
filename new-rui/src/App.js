import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Uploadfile from './Pages/UploadFile';
import Home from './Pages/Home';
import OrderList from "./Pages/Orders/index.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<OrderList />} />
          <Route path="/uploadfile" element={<OrderList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
