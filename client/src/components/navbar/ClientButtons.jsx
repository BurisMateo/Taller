import React from 'react'

export default function ClientButtons() {
  return (
    <ul className="navbar-nav fw-bold">
        <li className="nav-item">
            <a className="nav-link" aria-current="page" href="/">Inicio</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" aria-current="page" href="#">Mis Pedidos</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" aria-current="page" href="#">Favoritos</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" aria-current="page" href="#">Carrito</a>
        </li>
        
        <li className="nav-item dropdown me-2">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bell-fill" viewBox="0 0 16 16">
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
                </svg>
            </a>
            <ul className="dropdown-menu">
                <li><a className="dropdown-item">Notificación 1</a></li>
                <li><a className="dropdown-item">Notificación 2</a></li>
            </ul>
        </li>
    </ul>
  )
}
