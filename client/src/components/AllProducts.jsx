import React , { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AllProducts(props) {

  const [products, setProducts] = useState([]);
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
    getData()
  },[])

  return (

    <div>
      <div className='cards'>
        {products.map(product => (
          <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{product.description}</h6>
              <p className="card-text">{product.price}</p>
              <p className="card-text">{product.tags}</p>
              <button className='btn btn-success' onClick={()=>navigate(`/product/${product._id}`)} >More info</button>
              <button className='btn btn-warning' onClick={addToCart(product._id)}>Add to cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>

  )
}
