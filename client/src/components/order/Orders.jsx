import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Orders() {
    const token = localStorage.getItem("token");
    const [email, setEmail] = useState()
    const [data, setData] = useState()
    const [user, setUser] = useState()

    const navigate = useNavigate()

    const getPedidos = async () => {

        try {
            const res = await fetch('http://localhost:8080/api/orders')
            const data = await res.json()
            setData(data);
            console.log(data)
        } catch (error) {
            throw error
        }
    }
    

    const finishOrder = (id) => {
        axios
        .put(`http://localhost:8080/api/order/${id}`)
        .then(navigate(0))
    }

    useEffect(() => {
        getPedidos();
        if (token) {
            axios
                .get(`http://localhost:8080/api/user`, {
                    headers: {
                        token: token,
                    },
                }).then(({ data }) => setEmail(data.email))
                .catch((error) => console.error(error));
        }
    }, [token]);

    return (
        <div>
            <div className='d-grid gap-2 col-6 mx-auto justify-content-center mt-3 mb-3'>
                <button className='btn btn-warning' onClick={()=>navigate('/order-history')}>Historial</button>
            </div>
            {
                data !== undefined
                    ?
                    <div>
                        {data.map(order => (
                            <div>
                            <p>
                                <a class="btn btn-primary" data-bs-toggle="collapse" href={('#').concat(order._id)} role="button" aria-expanded="false" aria-controls="collapseExample">Pedido #{order._id} - {order.state}</a>
                                <button className='btn btn-danger' onClick={() => finishOrder(order._id)}>Finalizar</button>
                            </p>
                            <div class="collapse" id={order._id}>
                                {order.products.map(product => (
                                    <div class="card card-body">
                                    <p>{product.name} - {product.quantity}</p>
                                    </div>
                                ))}
                            </div>
                            </div>
                        ))}
                    </div>
                    :
                    <p>No hay ningún pedido pendiente</p>
            }
        </div>
    )
}
