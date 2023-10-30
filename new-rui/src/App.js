import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import OrderList from "./Pages/Orders/index.jsx";
import Home from "./Pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/orders" element={<OrderList />} />
          <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
