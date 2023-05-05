import React, {useEffect, useState} from 'react'
import axios from 'axios';

export default function MyOrders() {
    const token = localStorage.getItem("token");
    const [userId, setUserId] = useState()
    const [data, setData] = useState()

    useEffect(() => {
        if (token) {
            axios
                .get(`http://localhost:8080/api/user`, {
                    headers: {
                        token: token,
                    },
                }).then( async ({ data }) => {
                    setUserId(data._id);
                    if (userId !== undefined) {
                        await axios
                            .get(`http://localhost:8080/api/order/${userId}`)
                            .then(({ data }) => {
                                setData(data);
                                console.log(data)
                            })
                    }
                })
                .catch((error) => console.error(error));
        }
    }, [userId]);


  return (
    <div>
        {
                data !== undefined
                    ?
                    <div>
                        {data.map(order => (
                            <div>
                            <p>
                                <a class="btn btn-primary" data-bs-toggle="collapse" href={('#').concat(order._id)} role="button" aria-expanded="false" aria-controls="collapseExample">Pedido #{order._id} - {order.state} - Fecha {order.date_added.substr(0, 10)} </a>
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
                    <p>No hay ningún pedido en el historial</p>
            }
    </div>
  )
}
