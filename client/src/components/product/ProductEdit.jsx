import axios from 'axios';
import React, {useState} from 'react'
import {Button, Modal, ModalHeader,ModalBody,FormGroup} from 'reactstrap';
import Product from './Product';
import { useNavigate } from 'react-router-dom';

export default function ProductEdit(props) {
    const [title, setTitle] = useState(props.data.title);
    const [description, setDescription] = useState(props.data.description);
    const [price, setPrice] = useState(props.data.price);
    //const [image,setImage] = useState();

    //const [] = useState(props.data.);

    const [isOpen, setIsOpen] = useState(props.stateButton);

    const navigate = useNavigate()

    const editProductData = async () => {
        await fetch(`http://localhost:8080/api/products/${props.data._id}`,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    title,
                    description,
                    price
                })
            })
        setIsOpen(false);
        navigate(0);
    }

    return (
        <Modal isOpen={isOpen}>

            <ModalHeader>
                Editar Producto
            </ModalHeader>

            <ModalBody>

                <FormGroup>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Título</label>
                        <input type="text" className="form-control" onChange={e => setTitle(e.target.value)} value={title} name="title" id="title" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Descripcion</label>
                        <textarea type="text" className="form-control" id="description" onChange={e => setDescription(e.target.value)} value={description} name="description" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">Precio</label>
                        <input type="number" className="form-control" id="price" onChange={e => setPrice(e.target.value)} value={price} name="price" required />
                    </div>
                    <div className='d-flex justify-content-center'>
                        <Button className='btn btn-success' onClick={editProductData}>Confirmar</Button>
                        <Button className='btn btn-danger ms-4' onClick={(() => setIsOpen(false))}>Cancelar</Button>
                    </div>
                    {isOpen ? null : <Product state={isOpen} />}

                </FormGroup>

            </ModalBody>

        </Modal>
    )
}
