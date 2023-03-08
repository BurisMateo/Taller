import React from 'react'

export default function AdminButtons() {
  return (
    <ul className="navbar-nav fw-bold">
        <li className="nav-item">
            <a className="nav-link" aria-current="page" href="/">Inicio</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" aria-current="page" href="/add-product">Productos</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" aria-current="page" href="#">Pedidos</a>
        </li>
    </ul>
  )
}
