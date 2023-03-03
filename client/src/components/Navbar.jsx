import React from 'react'


const Navbar = () => {
    return (
        <>
            <nav class="navbar sticky-top navbar-expand-lg" style={{backgroundColor: "#64FF7E"}}>
                <div class="container-fluid">
                    <a class="navbar-brand" href="/">Navbar</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                        <div class="input-group input-group-sm w-25 me-5">
                            <input type="text" class="form-control" placeholder="Buscar" aria-label="Recipient's username" aria-describedby="button-addon2"></input>
                                <button class="btn btn-outline-secondary bg-body-tertiary" type="button" id="button-addon2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                    </svg>
                                </button>
                        </div>
                        <ul class="navbar-nav fw-bold">
                            <li class="nav-item">
                                <a class="nav-link" aria-current="page" href="/">Inicio</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" aria-current="page" href="#">Mis Pedidos</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" aria-current="page" href="#">Favoritos</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" aria-current="page" href="#">Carrito</a>
                            </li>
                            <li class="nav-item dropdown me-2">
                                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell-fill" viewBox="0 0 16 16">
                                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
                                    </svg>
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item">Notificación 1</a></li>
                                    <li><a class="dropdown-item">Notificación 2</a></li>
                                </ul>
                            </li>
                        </ul>
                        <a href='/login'>
                            <button type="button" class="btn btn-primary me-2">Login</button>
                        </a>
                        <a href="/register">
                            <button type="button" class="btn btn-success">Sign Up</button>
                        </a>

                    </div>
                </div>
            </nav>

        </>
    )
}

export default Navbar;