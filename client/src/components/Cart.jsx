import React, { useState, useEffect } from 'react'
import axios from 'axios';

export default function Cart() {

    const [cart, setCart] = useState();
    const [userId, setUserId] = useState();
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const token = localStorage.getItem("token");

    const getData = () => {
        
        console.log(cart);

    }

    useEffect( () =>{
        if (token) {
            setIsAuthenticated(true);
            axios
                .get(`http://localhost:8080/api/user`, {
                    headers: {
                        token: token,
                    },
                }).then(async ({ data }) => {
                    setUserId(data._id);
                    if (userId != undefined) {
                        await axios
                            .get(`http://localhost:8080/api/cart/${userId}`)
                            .then(({ data }) => {
                                setCart(data);
                                if (cart != undefined) {
                                    console.log(cart);
                                    getData();
                                }
                            })
                    }
                })
                .catch((error) => console.error(error));
        }
        //console.log(email);
      },[userId]);

  return (
    <div>
        {   
            cart!=undefined
                ?
                    <div>
                    {
                        
                        cart.products.map(product => (
                            <div>
                                <p>Producto: {product.name}</p>
                                <p>Cantidad: {product.quantity}</p>
                            </div>
                        ))
                    }
                    <p>Total: {cart.bill}</p>
                    </div>
                :
                    null
            
        }
    </div>
  )
}