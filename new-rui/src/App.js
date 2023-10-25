import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import OrderList from "./Pages/Orders/index.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<OrderList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
