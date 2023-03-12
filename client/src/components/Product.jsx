import React from 'react'
import { useParams } from 'react-router-dom';

export default function Product() {

    const [product, setProduct] = useState([])

    const id = useParams();

    const getData = async () => {
      const res = await fetch(`http://localhost:8080/products/${id}`)
      const data = await res.json();
      setProduct(data)
      console.log(data);
    }

  return (
      <div className='cards'>
          <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{product.description}</h6>
              <p className="card-text">{product.price}</p>
              <p className="card-text">{product.tags}</p>
            </div>
          </div>
      </div>
  )
}
