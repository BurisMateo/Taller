import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {

    const [inputs, setInputs] = useState({
        name: "",
        lastName: "",
        email: "",
        password: "",
        phoneNumber: "",
        address: ""
    });
    const [message, setMessage] = useState();
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const { name, lastName, email, password, phoneNumber, address } = inputs;

    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (name !== "" && lastName !== "" && email !== "" && password !== "" && phoneNumber !== "" && address !== "") {
            const User = {
                name,
                lastName,
                email,
                password,
                phoneNumber,
                address
            };
            setLoading(true);
            await axios
                .post("http://localhost:8080/api/register", User)
                .then((res) => {
                    const { data } = res;
                    console.log(data);
                    setMessage(data.msg);
                    setInputs({ name: "", lastName: "", email: "", password: "", phoneNumber: "", address: "" });
                    setTimeout(() => {
                        setMessage("");
                        navigate("/login");
                    }, 1500);
                })
                .catch((error) => {
                    console.error(error);
                    setMessage("Hubo un error");
                    setTimeout(() => {
                        setMessage("");
                    }, 1500);
                });

            setLoading(false);
        } else {
            setMessage("Completa todos los campos")
        }
    };

    return (
        <>
            <div className="login mb-5">
                <h1 class="display-3">Registrarse</h1>
                <div className="form-container">
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label for="name" className="form-label">Nombre</label>
                            <input type="text" className="form-control" onChange={(e) => handleChange(e)} value={name} name="name" id="name" autoComplete='off' />
                        </div>
                        <div className="mb-3">
                            <label for="lastName" className="form-label">Apellido</label>
                            <input type="text" className="form-control" onChange={(e) => handleChange(e)} value={lastName} name="lastName" id="lastName" autoComplete='off' />
                        </div>
                        <div className="mb-3">
                            <label for="email" className="form-label">Email</label>
                            <input type="text" className="form-control" onChange={(e) => handleChange(e)} value={email} name="email" id="email" autoComplete='off' />
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputPassword1" className="form-label">Contraseña</label>
                            <input type="text" className="form-control" onChange={(e) => handleChange(e)} value={password} name="password" id="password" autoComplete='off' />
                        </div>
                        <div className="mb-3">
                            <label for="phoneNUmber" className="form-label">Número telefónico</label>
                            <input type="text" className="form-control" onChange={(e) => handleChange(e)} value={phoneNumber} name="phoneNumber" id="phoneNumber" autoComplete='off' />
                        </div>
                        <div className="mb-3">
                            <label for="address" className="form-label">Dirección</label>
                            <input type="text" className="form-control" onChange={(e) => handleChange(e)} value={address} name="address" id="address" autoComplete='off' />
                        </div>
                        <div className='d-flex justify-content-center'>
                            <button type="button" onClick={() => navigate('/')} className="btn btn-danger me-3">Cancelar</button>
                            <button type="submit" className="btn btn-success ms-3">
                                {loading ? "Cargando..." : "Registrarme"}
                            </button>
                        </div>
                        <p>
                            Ya tienes una cuenta?{" "}
                            <b onClick={() => navigate("/login")}>Inicia Sesión!</b>
                        </p>
                    </form>
                </div>
            </div>
            {message && <div className="alert alert-secondary" role="alert">{message}</div>}
        </>
    )
}

export default Register;