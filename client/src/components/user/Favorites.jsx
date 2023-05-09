import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Favorites() {
    const [favs, setFavs] = useState();
    const [userId, setUserId] = useState();
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const deleteFromFavs = (id) => {
        if (window.confirm('¿Está seguro que desea eliminarlo de sus favoritos?') == true){
            axios
            .delete(`http://localhost:8080/api/favorite/${userId}/${id}`)
            .then(navigate(0))
        }
    }

    useEffect(() => {
        if (token) {
            axios
                .get(`http://localhost:8080/api/user`, {
                    headers: {
                        token: token,
                    },
                }).then(async ({ data }) => {
                    setUserId(data._id);
                    if (userId !== undefined) {
                        await axios
                            .get(`http://localhost:8080/api/favorite/${userId}`)
                            .then(({ data }) => {
                                setFavs(data);
                            })
                    }
                })
                .catch((error) => console.error(error));
        }
        //console.log(email);
    }, [userId]);


    return (
        <div>
            {
                favs !== undefined
                    ?
                    <div>
                        {
                            favs.products !== undefined
                                ?
                                <div className="row row-cols-1 row-cols-md-5 g-4 justify-content-center mt-2">

                                    {
                                        favs.products.map(product => (
                                            <div className="col">
                                                <div className="card h-100">
                                                    <img src={product.imgUrl} className="card-img-top "></img>
                                                    <div className="card-body">
                                                        <h5 className="card-title" >{product.name}</h5>
                                                    </div>
                                                    <div className='card-footer'>
                                                        <button className='btn btn-danger' onClick={() => deleteFromFavs(product.productId)} >Quitar</button>
                                                        <button className='btn btn-success ms-2' onClick={()=>navigate(`/product/${product.productId}`)} >Ver más</button>

                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                                :
                                <p>No tienes productos favoritos</p>
                        }
                    </div>

                    :
                    <p>No tienes productos favoritos</p>
            }
        </div>
    )
}
