import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Cart() {

    const [cart, setCart] = useState();
    const [userId, setUserId] = useState();
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const token = localStorage.getItem("token");

    const navigate = useNavigate()

    const deleteFromCart = (id) => {
        axios
        .delete(`http://localhost:8080/api/cart/${userId}/${id}`)
        .then(navigate(0))
    }

    const Pagar = () => {
        
        axios.post(`http://localhost:8080/api/order/${userId}`).then((res)=>window.location.href = res.data.response.body.init_point)
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
                    if (userId !== undefined) {
                        await axios
                            .get(`http://localhost:8080/api/cart/${userId}`)
                            .then(({ data }) => {
                                setCart(data);
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
        cart !== undefined
        ?
            <div className='cards'>
                <div>
                    {
                    cart.products !== undefined
                    ?
                        <div className="card" style={{width: '540px'}}>
                            <ul className="list-group list-group-flush">
                                {
                                cart.products.map(product => (
                                    <li className="list-group-item">
                                    <div className="row g-0">
                                        <div className="col-md-4">
                                            <h5 className="card-title">{product.name}</h5>
                                            <h6 className="card-subtitle mb-2 text-muted">Cantidad: {product.quantity}</h6>
                                            <p className="card-text">Precio unitario: ${product.price}</p>
                                        </div>
                                        <div className="col-md-8">
                                            <div className='d-flex justify-content-end'>
                                                <button className='btn btn-outline-danger' onClick={()=>deleteFromCart(product.productId)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bell-fill" viewBox="0 0 16 16">
                                                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                        
                                    </li>
                                ))}
                            </ul>
                            <p>Total: ${cart.bill}</p>
                            <button onClick={Pagar}>Pagar</button>
                        </div>
                    :
                        <p>No tienes productos en el carrito</p>
                    }
                </div>
            </div>    

        :
          <p>No tienes productos en el carrito</p>
        }
    </div>

  )
}
/*
    <div>
        {   
            cart!==undefined
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
    */