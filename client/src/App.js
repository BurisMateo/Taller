import React from "react";
import Register from "./components/Register.jsx"
//import Clientside from "./components/Clientside.jsx";
import AddProduct from "./components/AddProduct.jsx"
import Home from './components/Home'
import Navbar from './components/Navbar'
import "./app.css"
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx";

function App() {
  return (
    <>
      
      <Navbar />


      {/*<Register /> */}
      {/*<AddProduct/>*/}
      {/*<Clientside/>*/}

      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/add-product" element={ <AddProduct /> } />
      </Routes>

    </>

  );
}

export default App;
