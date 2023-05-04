import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Orders() {
    const token = localStorage.getItem("token");
    const [email, setEmail] = useState()
    const [data, setData] = useState()

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
            {
                data !== undefined
                    ?
                    <div>
                        {data.map(order => (
                            <div>
                            <p>
                                <a class="btn btn-primary" data-bs-toggle="collapse" href={('#').concat(order._id)} role="button" aria-expanded="false" aria-controls="collapseExample">Pedido #{order._id} - {order.state}</a>
                            </p>
                            {order.products.map(product => (
                                <div class="collapse" id={order._id}>
                                <div class="card card-body">
                                  <p>{product.name} - {product.quantity}</p>
                                </div>
                              </div>
                            ))}
                            </div>
                        ))}
                    </div>
                    :
                    <p>No ningún pedido pendiente</p>
            }
        </div>
    )
}
