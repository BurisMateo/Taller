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
            <a className="nav-link" aria-current="page" href="/cart">Carrito</a>
        </li>
        <li className="nav-item me-2">
            <a className="nav-link" aria-current="page" href="/profile">Mi perfil</a>
        </li>
        
        
    </ul>
  )
}
