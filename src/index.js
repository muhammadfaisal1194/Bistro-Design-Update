import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "./App.css";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import CartEmpty from "./pages/CartEmpty";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddMenu from "./pages/AddMenu";
import AddProduct from "./pages/AddProduct";
import Orders from "./pages/Orders";
import Subcategories from "./pages/Subcategories";
import Chat from "./pages/Chat";
import KitchenModule from "./pages/kitchenModule";
import ListMenu from "./pages/ListMenu";
import Menu from "./pages/Menu";
import MobileDetect from "./pages/Home/MobileDetect";
import PaymentCheckout from "./pages/PaymentCheckout";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import PaymentSuccess from "./pages/PaymentSuccess";
import Background from "./pages/Background";
import EditProduct from "./pages/EditProduct";
import EditMenu from "./pages/EditMenu";
import EditOrder from "./pages/EditOrder";
import ViewOrder from "./pages/ViewOrder";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
  <Background />
  <BrowserRouter>
    <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/dashboard" element={<Dashboard />}>
        <Route path="/dashboard/allproducts" element={<ListMenu />} />
        <Route path="/dashboard/addproduct" element={<AddProduct />} />
        <Route path="editproduct/:id" element={<EditProduct />} />
        <Route path="editmenu/:id" element={<EditMenu />} />
        <Route path="editorders/:id" element={<EditOrder />} />
        <Route path="vieworder/:id" element={<ViewOrder />} />
        <Route path="/dashboard/addmenu" element={<AddMenu />} />
        <Route path="/dashboard/allmenus" element={<Menu />} />
        <Route path="/dashboard/kitchen" element={<KitchenModule />} />
        <Route path="/dashboard/orders" element={<Orders />} />
        <Route
          path="/dashboard/subcategories"
          element={<Subcategories />}
        />
        <Route path="/dashboard/chat" element={<Chat />} />
      </Route>
      <Route path="/" element={<App />}>
      <Route index element={<MobileDetect />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/cart_empty" element={<CartEmpty />} />
      <Route path="/payment" element={<PaymentCheckout />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      </Route>
    </Routes>
  </BrowserRouter>
</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
