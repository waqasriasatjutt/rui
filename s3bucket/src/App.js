import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/templates/Layout";
import Login from "./Views/Login";
import ImageUploader from "./Views/ImageUploader";
import Orders from "./Views/Orders";
import Comments from "./Views/Orders/Comments";
import './App.css'
import OrderStatusList from "./Views/OrderStatus";
import OrderDetail from "./Views/LineItems";
import { useSelector } from "react-redux";
import ProofStatusList from "./Views/ProofStatus";
const App = () => {
  const { user } = useSelector((state) => state.auth);
  console.log("🚀 ~ file: App.js:17 ~ App ~ user:", user)

  let routes;
  if (!user) {
    routes = [
      { path: "/login", element: <Login /> },
      { path: "/:type/orders/comments/:id", element: <Comments /> },
      { path: "/:type/orders/order_detail/:id", element: <OrderDetail /> },
      { path: "*", element: <Navigate to="/login" replace /> },
    ];
  } else {
    routes = [
      // { path: "/image_uploader", element: <ImageUploader /> },
      { path: "/orders", element: <Orders /> },
      { path: "/order_status", element: <OrderStatusList /> },
      { path: "/proof_status", element: <ProofStatusList /> },
      { path: "/orders/comments/:id", element: <Comments /> },
      { path: "/orders/order_detail/:id", element: <OrderDetail /> },
      { path: "*", element: <Navigate to="/orders" replace /> },
    ];
  }
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} {...route} />
          ))}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
