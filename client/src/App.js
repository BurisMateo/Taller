import React, { useState } from "react";
import Register from "./components/Register.jsx"
//import Clientside from "./components/Clientside.jsx";
import AddProduct from "./components/AddProduct.jsx"
import Navbar from './components/navbar/Navbar'
import "./app.css"
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx";
import Profile from "./components/Profile.jsx";
import AllProducts from "./components/AllProducts.jsx";
import Product from "./components/Product";
import Cart from './components/Cart.jsx'

function App() {
  
  const [carrito, setCarrito] = useState([])

  return (
    <>
      
      <Navbar />


      {/*<Register /> */}
      {/*<AddProduct/>*/}
      {/*<Clientside/>*/}

      <Routes>
        <Route path="/" element={ <AllProducts /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/add-product" element={ <AddProduct /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/products" element={ <AllProducts /> } />
        <Route path="/product/:id" element={ <Product /> } />
        <Route path="/cart" element={ <Cart />} />
      </Routes>

    </>

  );
}

export default App;
