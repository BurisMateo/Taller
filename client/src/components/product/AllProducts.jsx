import React , { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { debounce } from 'lodash';
const config = require('../../config');

const filterProducts = (allProducts, searchTerm) => {
  if (!searchTerm) return allProducts;

  return allProducts.filter((p) => `${p.title} ${p.description}`.toLowerCase().includes(searchTerm.toLowerCase()));
};

export default function AllProducts(props) {

  const [allProducts, setAllProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredProducts = filterProducts(allProducts, searchTerm);

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
    setAllProducts(data)
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
      {
        isAuthorized() ?
          <div className='d-grid gap-2 col-6 mx-auto justify-content-center mt-3 mb-3'>
            <button className='btn btn-warning' onClick={()=>navigate('/add-product')}>Agregar Producto</button>
          </div>
          :
          null
      }
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
      
      <div className="row row-cols-1 row-cols-md-5 g-4 justify-content-center mt-2">
        {filteredProducts.map(product => (
          <div className="col" key={product._id}>
            <div className="card h-100">
              <img src={product.imgUrl} className="card-img-top "></img>
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                </div>
                <div className='card-footer'>
                  <button className='btn btn-success' onClick={()=>navigate(`/product/${product._id}`)} >Ver más</button>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
/*

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
              <button className='btn btn-success' onClick={()=>navigate(`/product/${product._id}`)} >Ver más</button>
            </div>
          </div>
        ))}
      </div>
    </div>


*/
}
