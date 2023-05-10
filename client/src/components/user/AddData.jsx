import React, {useState} from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

export default function AddData() {
  
    const [phoneNumber, setphoneNumber] = useState('');
    const [address, setAddress] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    const editPersonalData = async() => {
        console.log(location.state.email);
        await fetch('http://localhost:8080/api/profile',{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email: location.state.email,
                phoneNumber,
                address
            })
        })
    }

    const backLogin = () => {
        window.alert('usuario registrado correctamente, vuelva a inciar sesion')
        navigate('/login')
        
    }

  
    return (
        <>
            <div className="login mb-5">
                <h1 class="display-6">Antes de continuar, necesitamos que nos digas tu Dirección y Número de Teléfono</h1>
                <div className="form-container">
                    <form onSubmit={(e) => editPersonalData()}>
                        <div className="mb-3">
                            <label htmlfor="phoneNUmber" className="form-label">Número telefónico</label>
                            <input type="text" className="form-control" onChange = { e => setphoneNumber(e.target.value)} value={phoneNumber} name="phoneNumber" id="phoneNumber" autoComplete='off' />
                        </div>
                        <div className="mb-3">
                            <label htmlfor="address" className="form-label">Dirección</label>
                            <input type="text" className="form-control" onChange={e => setAddress(e.target.value)} value={address} name="address" id="address" autoComplete='off' />
                        </div>
                        <div className='d-flex justify-content-center'>
                            <button type="submit" className="btn btn-success ms-3" onClick={backLogin}>Aceptar</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
  )
}
