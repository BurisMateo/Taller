import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import AuthButtons from './AuthButtons';
import ClientButtons from './ClientButtons';
import AdminButtons from './AdminButtons';
const config = require('../../config');

const Navbar = () => {
    const token = localStorage.getItem("token");
    const [email, setEmail] = useState()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    
    const isAuthorized = () => {
        if (!isAuthenticated || !config.authorized.includes(email)) return false;
        return true
    };

    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    }

    useEffect(() => {
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
        <>
            <nav className="navbar sticky-top navbar-expand-lg" style={{ backgroundColor: "#64FF7E" }}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                        <div className="input-group input-group-sm w-25 me-5">
                            <input type="text" className="form-control" placeholder="Buscar" aria-label="Recipient's username" aria-describedby="button-addon2"></input>
                            <button className="btn btn-outline-secondary bg-body-tertiary" type="button" id="button-addon2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg>
                            </button>
                        </div>
                        
                        {
                            isAuthenticated && isAuthorized() 
                                ? <AdminButtons />
                                : isAuthenticated 
                                    ? <ClientButtons />
                                    : 
                                    <ul className='navbar-nav fw-bold me-3'>
                                        <li className="nav-item">
                                            <a className="nav-link" aria-current="page" href="/">Inicio</a>
                                        </li>
                                    </ul>
                        }

                        {isAuthenticated ?
                            <button className='btn btn-danger' onClick={logout}>Logout</button>
                        :
                            <AuthButtons />
                        }
                            

                        
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Navbar;