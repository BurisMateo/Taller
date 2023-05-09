import React, {useEffect, useState} from 'react'
import axios from 'axios';

const filterOrders = (allOrders, searchTerm) => {
    if (!searchTerm) return allOrders;

    return allOrders.filter((o) => 
        `${o.userName}
        ${o.userAddress}
        ${o.products.map((p) => p.name).join(" ")}
        ${o.state}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()));
};

export default function MyOrders() {
    const token = localStorage.getItem("token");
    const [userId, setUserId] = useState()
    const [data, setData] = useState([])
    const [searchTerm, setSearchTerm] = useState("");
    const filteredOrders = filterOrders(data, searchTerm);

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
                                console.log(userId)
                                setData(data);
                                console.log(data)
                            })
                    }
                })
                .catch((error) => console.error(error));
        }
    }, [userId]);

  return (
    <div className="mt-5">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {data !== undefined ? (
        <div
          style={{
            displat: "flex",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          {filteredOrders.map((order) => (
            <div key={order._id}>
              <p>
                <a
                  className="btn btn-primary"
                  data-bs-toggle="collapse"
                  href={"#".concat(order._id)}
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  Pedido #{order._id} - {order.state} - Fecha{" "}
                  {order.date_added.substr(0, 10)}{" "}
                </a>
              </p>
              <div className="collapse" id={order._id}>
                {order.products.map((product) => (
                  <div className="card card-body" key={product._id}>
                    <p>
                      {product.name} - {product.quantity}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No hay ningún pedido en el historial</p>
      )}
    </div>
  );
}
