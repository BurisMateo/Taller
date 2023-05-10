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

      <div class="row">
          <div class="col">
            {null}
          </div>
          <div class="col-6">
            <div className="input-group mb-3 mt-2">
              <span className="input-group-text" id="basic-addon1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
              </span>
              <input type="text" placeholder='Buscar' className="form-control" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
          </div>
          <div class="col">
            {null}
          </div>
        </div>

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
