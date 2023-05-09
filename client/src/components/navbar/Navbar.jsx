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
        if (window.confirm('¿Está seguro que desea cerrar sesión?')){
            localStorage.removeItem("token");
            window.location.reload();
            navigate('/');
        }
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
                    <a className="navbar-brand" href="/">RestoHome</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                        
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