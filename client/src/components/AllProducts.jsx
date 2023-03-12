import React , { useState } from 'react'

export default function AllProducts() {

  const [products, setProducts] = useState([])


  const getData = async () => {
    const res = await fetch('http://localhost:8080/products')
    const data = await res.json();
    setProducts(data)
    console.log(data);
  }

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
              <button className='btn btn-success' onClick={()=>navigate(`/product/${product.id}`)} >More info</button>
            </div>
          </div>
        ))}
      </div>
    </div>

  )
}
