import React,{useState, useEffect} from 'react';
import axios from 'axios';
import ProfileEdit from './ProfileEdit';

export default function Profile(props) {

    const [data, setData] = useState({})
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [edit, setEdit] = useState(props.state);

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
          setIsAuthenticated(true);
          axios
            .get(`http://localhost:8080/api/user`, {
              headers: {
                token: token,
              },
            })
            .then(({ data }) => setData(data))
            .catch((error) => console.error(error));
        }
      }, [token]);

    return (
        <div className='mt-5' style={{justifyContent:'center',display:'flex', textAlign:'center'}}>
            <div className="card" style={{width: 250}}>
                <img src="https://cdn-icons-png.flaticon.com/512/17/17004.png" className="card-img-top" style={{width:100, margin:'auto'}} alt="img"/>
                    <div className="card-body">
                        <h5 className="card-title">Nombre: {data.name}</h5>
                        <p className="card-text">Apellido: {data.lastName}</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Numero de telefono: {data.phoneNumber}</li>
                        <li className="list-group-item">Email: {data.email}</li>
                        <li className="list-group-item">Direccion: {data.address}</li>
                    </ul>
                    <b className="btn btn-warning" onClick={()=> setEdit(true)}>Editar</b>
            </div>
            {edit ? <ProfileEdit data = {data} stateButton = {edit}/> : null}
        </div>
    )
}
