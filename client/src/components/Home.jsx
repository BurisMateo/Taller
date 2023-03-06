import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {

  const [name, setName] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
      axios
        .get(`http://localhost:8080/api/user`, {
          headers: {
            token: token,
          },
        })
        .then(({ data }) => setName(data.name))
        .catch((error) => console.error(error));
    }
  }, [token]);

  return (
    <>
      <div className='container-fluid bg-body-tertiary'>
        <h2 className='mb-auto'>{isAuthenticated ? `Hola ${name}!` : "Inicia Sesión!"}</h2>
        <p className='mt-1000'>Home</p>
        <div className='position-absolute bottom-0 start-0'>
          <nav className="navbar fixed-bottom bg-body-tertiary">
            <div className="container-fluid">
              <a className="navbar-brand text-secondary">.</a>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}
