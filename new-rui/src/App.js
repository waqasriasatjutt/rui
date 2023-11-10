import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import OrderList from "./Pages/Orders/index.jsx";
import Home from "./Pages/Home";
import LoginPage from "./Pages/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
