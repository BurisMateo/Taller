import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function Product() {
    const token = localStorage.getItem("token");
    const [product, setProduct] = useState([])
    const [userEmail, setEmail] = useState()
    const { id } = useParams();

    const getData = async () => {
      const res = await fetch(`http://localhost:8080/api/product/${id}`)
      const data = await res.json();
      setProduct(data)
    }

    const addToDDBB = () => {
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
            userEmail
          })
      })
    }

    useEffect(() =>{
      getData();
      if (token) {
        axios
            .get(`http://localhost:8080/api/user`, {
                headers: {
                    token: token,
                },
            }).then(({ data }) => setEmail(data.email))
            .catch((error) => console.error(error));
      }
      console.log(userEmail);
    },[token]);

  return (
    <div className="card mb-3" style={{width: '540px'}}>
      <div className="row g-0">
        <div className="col-md-4">
          <img src={product.imgUrl} className="img-fluid rounded-start"></img>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{product.title}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{product.description}</h6>
            <p className="card-text">{product.price}</p>
            <button onClick={() => addToDDBB()}>Agregar al carrito</button>
          </div>
        </div>
      </div>
    </div>


)}