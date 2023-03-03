import React from 'react'

const Register = () => {
    return (
        <>
            <div className="login mb-3">
                <h1 class="display-3">Registrarse</h1>
                <div className="form-container">
                    <form>
                        <div className="mb-3">
                            <label for="name" className="form-label">Nombre</label>
                            <input type="name" className="form-control" id="name" aria-describedby="nameHelp" />
                        </div>
                        <div className="mb-3">
                            <label for="lastName" className="form-label">Apellido</label>
                            <input type="lastName" className="form-control" id="lastName" aria-describedby="lastNameHelp" />
                        </div>
                        <div className="mb-3">
                            <label for="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputPassword1" className="form-label">Contraseña</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" />
                        </div>
                        <div className="mb-3">
                            <label for="phoneNUmber" className="form-label">Número telefónico</label>
                            <input type="phoneNumber" className="form-control" id="phoneNumber" aria-describedby="phoneHelp" />
                        </div>
                        <div className="mb-3">
                            <label for="address" className="form-label">Dirección</label>
                            <input type="address" className="form-control" id="address" aria-describedby="addressHelp" />
                        </div>
                        <div className='d-flex justify-content-center'>
                            <a href='/'>
                                <button type="button" className="btn btn-danger me-3">Cancelar</button>
                            </a>
                            <button type="submit" className="btn btn-success ms-3">Agregar</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register;