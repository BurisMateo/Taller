import React from 'react'

const Register = () => {
    return (
        <>
            <div className="login">
                <div className="form-container">
                    <form>
                        <div className="mb-3">
                            <label for="name" className="form-label">Name</label>
                            <input type="name" className="form-control" id="name" aria-describedby="nameHelp" />
                        </div>
                        <div className="mb-3">
                            <label for="lastName" className="form-label">Last Name</label>
                            <input type="lastName" className="form-control" id="lastName" aria-describedby="lastNameHelp" />
                        </div>
                        <div className="mb-3">
                            <label for="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" />
                        </div>
                        <div className="mb-3">
                            <label for="phoneNUmber" className="form-label">Phone Number</label>
                            <input type="phoneNumber" className="form-control" id="phoneNumber" aria-describedby="phoneHelp" />
                        </div>
                        <div className="mb-3">
                            <label for="address" className="form-label">Address</label>
                            <input type="address" className="form-control" id="address" aria-describedby="addressHelp" />
                        </div>
                        <button type="submit" className="btn btn-danger mr-5">Cancelar</button>
                        <button type="submit" className="btn btn-success ml-5">Agregar</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register;