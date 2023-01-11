import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
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

function App() {
  return (
    <Provider store={store}>
      <Background />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MobileDetect />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/cart_empty" element={<CartEmpty />} />
          <Route path="/login" element={<Login />} />
          <Route path="/payment" element={<PaymentCheckout />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
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
        </Routes>
      </BrowserRouter>
      <Footer />
    </Provider>
  );
}

export default App;
