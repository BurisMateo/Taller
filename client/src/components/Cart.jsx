import React, { useState } from 'react'
import axios from 'axios';

export default function Cart() {

    const [cart, setCart] = useState([]);
    const [email, setEmail] = useState('');

    const token = localStorage.getItem("token");

    const getData = () => {

        if (token) {
            axios
                .get(`http://localhost:8080/api/user`, {
                    headers: {
                        token: token,
                    },
                }).then(({ data }) => setEmail(data.email))
                .catch((error) => console.error(error));
          const res = fetch(`http://localhost:8080/api/cart/${email}`)
          const carrito =  res.json();
          setCart(carrito);
          console.log(email);
        }
    }

  return (
    <div>
        {
            /*
            cart.map(product => (
                <p>product.title</p>
            ))
                */
        }
    <h1>carrito</h1>

    </div>
  )
}