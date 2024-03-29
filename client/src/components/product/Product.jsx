import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductEdit from './ProductEdit';
import Rating from '@mui/material/Rating'

const config = require('../../config');



export default function Product(props) {
    const token = localStorage.getItem("token");
    const [product, setProduct] = useState([])
    const [userEmail, setUserEmail] = useState();
    const [userId, setUserId] = useState()
    const { id } = useParams();
    const [edit, setEdit] = useState(props.state);
    const [currentValue, setCurrentVal] = useState(0)

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

    const addToFavs = (pid) => {
      const productId = pid; 
      console.log(userId, productId);
      fetch(`http://localhost:8080/api/favorite/${userId}`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
          productId
        })
    })
    window.alert('Se ha agregado a tus favoritos')
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
    window.alert('Se ha agregado a tu carrito')
}

    const deleteProduct = (id) => {
      if (window.confirm('¿Esta seguro que desea eliminar este producto?')){
        axios
        .delete(`http://localhost:8080/api/products/${id}`)
        .then(setTimeout(() => {
              navigate("/")
              }, 1000))
      }
    }

    const setValoration = async (newValue) => {
      setCurrentVal(parseInt(newValue))
      const value = parseInt(newValue);
      
      await fetch(`http://localhost:8080/api/valproduct/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            userId,
            value
        })
    })
    
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
        }).then( async ({ data }) => {
          setUserId(data._id);
          setUserEmail(data.email);
          if (userId !== undefined) {
            await axios
                .get(`http://localhost:8080/api/valproduct/${id}/${userId}`)
                .then(({ data }) => {
                  setCurrentVal(parseInt(data));
                })
            }
        })
        .catch((error) => console.error(error));
      }
    },[userId, currentValue]);

  return (
    <div className="card mb-3 w-75" style={{marginLeft:"15%", marginRight:"15%", marginTop:"5%"}}>
      <div className="row g-0">
        <div className="col-md-4">
          <img src={product.imgUrl} className="img-fluid rounded-start"></img>
        </div>
        <div className="col-md-6">
          <div className="card-body">
            <h5 className="card-title">{product.title}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{product.description}</h6>
            <p className="card-text">Precio: ${product.price}</p>
            {
              isAuthorized() 
              ?
                <div>
                  <button className='btn btn-primary me-2' onClick={()=> setEdit(true)}>Editar</button>
                  <button className='btn btn-danger' onClick={() => deleteProduct(product._id)}>Eliminar</button>
                  {edit ? <ProductEdit data = {product} stateButton = {edit}/> : null}
                </div>
              : isAuthenticated
                ?
                  <div>
                    <button className='btn btn-success' onClick={() => { addToCart()}}>Agregar al carrito</button>
                    <button className='btn btn-warning ms-2' onClick={() => addToFavs(product._id)}>Agregar a fav</button>
                  </div>
                :
                null
            }
          </div>
        </div>
        <div className='col-md-2'>
          {
            isAuthenticated
            ?
              <div>
                <h1 className='text-center'>{product.rate}</h1>
                <Rating
                  name="simple-controlled"
                  value={currentValue}
                  onChange={(e) => { setValoration(e.target.value); }}
                />
              </div>
            :
            null
          }
        </div>
      </div>
    </div>


)}