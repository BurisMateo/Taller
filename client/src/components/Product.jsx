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
      console.log(data);
    }

    const addToDDBB = () => {
      if (token) {
        axios
            .get(`http://localhost:8080/api/user`, {
                headers: {
                    token: token,
                },
            }).then(({ data }) => setEmail(data.email))
            .catch((error) => console.error(error));
      }
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
    },[]);

  return (
      <div className='cards'>
          <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{product.description}</h6>
              <p className="card-text">{product.price}</p>
              <p className="card-text">{product.tags}</p>
              <button onClick={() => addToDDBB()}>Agregar al carrito</button>
            </div>
          </div>
      </div>
  )}