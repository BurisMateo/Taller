import "./app.css"
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Register from "./components/user/Register.jsx"
import AddProduct from "./components/product/AddProduct.jsx"
import Navbar from './components/navbar/Navbar'
import Login from "./components/user/Login.jsx";
import Profile from "./components/user/Profile.jsx";
import AllProducts from "./components/product/AllProducts";
import Product from "./components/product/Product.jsx";
import Cart from './components/user/Cart.jsx'
import Orders from './components/order/Orders.jsx'
import OrderHistory from "./components/order/OrderHistory.jsx";
import Favorites from "./components/user/Favorites";
import MyOrders from "./components/order/MyOrders";
import AddData from "./components/user/AddData";

function App() {

  return (
    <>
      
      <Navbar />

      <Routes>
        <Route path="/" element={ <AllProducts /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/add-data" element={ <AddData />} />
        <Route path="/add-product" element={ <AddProduct /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/products" element={ <AllProducts /> } />
        <Route path="/product/:id" element={ <Product /> } />
        <Route path="/cart" element={ <Cart />} />
        <Route path="/orders" element={ <Orders />} />
        <Route path="/order-history" element={ <OrderHistory /> } />
        <Route path="/favorites" element={ <Favorites /> } />
        <Route path="/my-orders" element= { <MyOrders /> } />
      </Routes>

    </>

  );
}

export default App;
