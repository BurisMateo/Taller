import React , { useEffect, useState } from 'react'
import axios from 'axios'
import {debounce} from 'lodash';
import { useNavigate } from 'react-router-dom'
const config = require('../../config');


export default function AllProducts(props) {

  const [allProducts, setAllProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(AllProducts);
  const token = localStorage.getItem("token");
  const [email, setEmail] = useState()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  const isAuthorized = () => {
      if (!isAuthenticated || !config.authorized.includes(email)) return false;
      return true
  };
  const navigate = useNavigate();

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

const filterProducts = debounce((allProducts, searchTerm) => {
  if (!searchTerm) return allProducts;

  return allProducts.filter((p) => `${p.title} ${p.description}`.toLowerCase().includes(searchTerm.toLowerCase()));
}, 500);

useEffect(() => {
  setFilteredProducts(filterProducts(allProducts, searchTerm));
}, [allProducts, searchTerm]);
  
  return (
    <div>
      {
        isAuthorized() ?
          <div className='d-grid gap-2 col-6 mx-auto justify-content-center mt-3 mb-3'>
            <button className='btn btn-warning' onClick={()=>navigate('/add-product')}>Add product</button>
          </div>
          :
          null
      }
      <input type="text" value={searchTerm} setValue={setSearchTerm} />
      <div className="row row-cols-1 row-cols-md-5 g-4 justify-content-center mt-2">
        {filteredProducts.map(product => (
          <div className="col">
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
