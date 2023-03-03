import React from 'react'

export default function Login() {
    return (
        <>
            <div className="login">
                <h1 class="display-3">Iniciar sesión</h1>
                <div className="form-container">
                    <form>
                        <div className="mb-3">
                            <label for="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputPassword1" className="form-label">Contraseña</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" />
                        </div>
                        <div className='d-flex justify-content-center'>
                            <a href='/'>
                                <button type="button" className="btn btn-danger me-3">Cancelar</button>
                            </a>
                            <button type="submit" className="btn btn-success ms-3">Aceptar</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
