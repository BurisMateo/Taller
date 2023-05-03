import React from 'react'

export default function AdminButtons() {
  return (
    <ul className="navbar-nav fw-bold me-3">
        <li className="nav-item">
            <a className="nav-link" aria-current="page" href="/">Inicio</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" aria-current="page" href="/products">Productos</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" aria-current="page" href="/orders">Pedidos</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" aria-current="page" href="/profile">Mi perfil</a>
        </li>
    </ul>
  )
}
