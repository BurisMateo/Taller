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
                    <div class="accordion" id="accordionExample">

                        {
                            data.map(order => (
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" href={order} aria-expanded="true" aria-controls={order}>
                                            {order.name}
                                        </button>
                                    </h2>
                                    <div id={order} class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        {order.products.map(product => (
                                            <div class="accordion-body">
                                                <strong>{order.userId}</strong>
                                                <p>{product.name}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    :
                    <p>No ningún pedido pendiente</p>
            }
        </div>
    )
}
