import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
const config = require('../config');


export default function Product() {
    const token = localStorage.getItem("token");
    const [product, setProduct] = useState([])
    const [userEmail, setUserEmail] = useState();
    const [userId, setUserId] = useState()
    const { id } = useParams();

    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const navigate = useNavigate()


    const isAuthorized = () => {
        if (!isAuthenticated || !config.authorized.includes(userEmail)) return false;
        return true
    };

    const getData = async () => {
      const res = await fetch(`http://localhost:8080/api/product/${id}`)
      const data = await res.json();
      setProduct(data)
    }

    const addToCart = () => {
        const productId = id;
        const quantity = 1;     
        fetch(`http://localhost:8080/api/product/${id}`,{
          method:'POST',
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify({
            productId,
            quantity,
            userId
          })
      })
    }

    const deleteProduct = (id) => {
      axios
      .delete(`http://localhost:8080/api/products/${id}`)
      .then(navigate(`/`))
    }

    useEffect(() =>{
      getData();
      if (token) {
        setIsAuthenticated(true);
        axios
        .get(`http://localhost:8080/api/user`, {
          headers: {
            token: token,
          },
        }).then(({ data }) => {
          setUserId(data._id);
          setUserEmail(data.email);
          })
            .catch((error) => console.error(error));
      }
      console.log(userEmail);
    },[token, userId]);

  return (
    <div className="card mb-3 w-75">
      <div className="row g-0">
        <div className="col-md-4">
          <img src={product.imgUrl} className="img-fluid rounded-start"></img>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{product.title}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{product.description}</h6>
            <p className="card-text">Precio: ${product.price}</p>
            {
              isAuthorized() 
              ?
                <div>
                  <button className='btn btn-primary me-2' onClick={() => console.log('editar')}>Editar</button>
                  <button className='btn btn-danger' onClick={() => deleteProduct(product._id)}>Eliminar</button>
                </div>
              : isAuthenticated
                ?
                  <button className='btn btn-success' onClick={() => addToCart()}>Agregar al carrito</button>
                :
                null
            }
          </div>
        </div>
      </div>
    </div>


)}