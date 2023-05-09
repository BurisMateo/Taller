import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function OrderHistory() {
    const token = localStorage.getItem("token");
    const [email, setEmail] = useState()
    const [data, setData] = useState()

    const navigate = useNavigate()

    const getHistorialPedidos = async () => {

        try {
            const res = await fetch('http://localhost:8080/api/order-history')
            const data = await res.json()
            setData(data);
            console.log(data)
        } catch (error) {
            throw error
        }
    }
    

    useEffect(() => {
        getHistorialPedidos();
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
    <div className='mt-5'>
        {
                data !== undefined
                    ?
                    <div style={{displat:'flex', justifyContent:'center', textAlign:'center'}}>
                        {data.map(order => (
                            <div>
                                <p>
                                    <a class="btn btn-primary" data-bs-toggle="collapse" href={('#').concat(order._id)} role="button" aria-expanded="false" aria-controls="collapseExample">Pedido #{order._id} - {order.state} - Fecha {order.date_added.substr(0, 10)}</a>
                                </p>
                                <div class="collapse" id={order._id}>
                                    {order.products.map(product => (
                                        <div class="card card-body">
                                        <p>{product.name} - {product.quantity}</p>
                                        </div>
                                    ))}
                                    <div className='card card-footer'>
                                        <p>Para: {order.userName} - Dirección: {order.userAddress} - Total: ${order.bill}</p>
                                    </div>
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
