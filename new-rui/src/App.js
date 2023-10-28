import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import OrderList from "./Pages/Orders/index.jsx";
import Home from "./Pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/orderlist" element={<OrderList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
