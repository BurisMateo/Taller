import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    
    const [inputs, setInputs] = useState({ email: "", password: "" });
    //const [message, setMessage] = useState();
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();

    const { email, password } = inputs;

    const HandleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };
    
    const onSubmit = async (e) => {
        e.preventDefault();
        if(email !== "" && password !== ""){
            const User = {
                email,
                password
            };
            setLoading(true);
            await axios.post("http://localhost:8080/api/login", User)
            .then((res) => {
                const { data } = res;
                console.log(data);
                if (data.msg) {
                    window.alert(data.msg)
                }
                
                
                if (data.user) {
                    localStorage.setItem('token', data.user.token);
                    navigate('/')
                }
            })
            .catch((error) => {
                console.error(error);
            });
            setInputs({ email: "", password: ""});
            setLoading(false)
        }
    }

  
    return (
        <>
            <div className="login mb-5">
                <h1 class="display-3">Iniciar sesión</h1>
                <div className="form-container">
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label for="email" className="form-label">Email</label>
                            <input type="email" className="form-control" onChange={(e) => HandleChange(e)} value={email} name="email" id="email" autoComplete='off' />
                        </div>
                        <div className="mb-3">
                            <label for="password" className="form-label">Contraseña</label>
                            <input type="password" className="form-control" onChange={(e) => HandleChange(e)} value={password} name="password" id="password" autoComplete='off' />
                        </div>
                        <div className='d-flex justify-content-center'>
                            <a href='/'>
                                <button type="button" className="btn btn-danger me-3">Cancelar</button>
                            </a>
                            <button type="submit" className="btn btn-success ms-3">{loading ? "Cargando..." : "Aceptar"}</button>
                        </div>
                        <p>
                            Aun no tienes cuenta?{" "}
                            <b onClick={() => navigate("/register")}>Registrate!</b>
                        </p>
                    </form>
                </div>
            </div>
            
        </>
    )
}
