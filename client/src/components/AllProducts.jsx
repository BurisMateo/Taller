import React , { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const config = require('../config');


export default function AllProducts(props) {

  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");
  const [email, setEmail] = useState()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  const isAuthorized = () => {
      if (!isAuthenticated || !config.authorized.includes(email)) return false;
      return true
  };
  const navigate = useNavigate();


  const addToCart = (id) => {
    props.carrito.push(id)
    console.log("Estoy en carrito " + props.carrito)
  }


  const getData = async () => {
    const res = await fetch('http://localhost:8080/api/products')
    const data = await res.json();
    setProducts(data)
    console.log(data);
  }

  useEffect(() => {
    getData();
    if (token) {
      setIsAuthenticated(true);
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
      <div className='cards'>
        {
          isAuthorized() ?
            <button className='btn btn-warning' onClick={()=>navigate('/add-product')}>Add product</button>
            :
            null
        }
        {products.map(product => (
          <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{product.description}</h6>
              <p className="card-text">{product.price}</p>
              <p className="card-text">{product.tags}</p>
              <button className='btn btn-success' onClick={()=>navigate(`/product/${product._id}`)} >More info</button>
              <button className='btn btn-warning' onClick={()=>addToCart(product._id)}>Add to cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>

  )
}
