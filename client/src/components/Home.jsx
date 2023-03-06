import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {

  const [name, setName] = useState();

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
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
        <h2 className='mb-auto'>{name ? `Hola ${name}!` : "Inicia Sesión!"}</h2>
        <p className='mt-1000'>Home</p>
        <div className='position-absolute bottom-0 start-0'>
          <nav class="navbar fixed-bottom bg-body-tertiary">
            <div class="container-fluid">
              <a class="navbar-brand text-secondary">.</a>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}
