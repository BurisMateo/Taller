import React, { useState } from 'react'
import {Button, Modal, ModalHeader,ModalBody,FormGroup} from 'reactstrap';
import Profile from './Profile';

export default function ProfileEdit(props) {
    const [name, setName] = useState(props.data.name);
    const [lastName, setlastName] = useState(props.data.lastName);
    const [phoneNumber, setphoneNumber] = useState(props.data.phoneNumber);
    const [email, setEmail] = useState(props.data.email);
    const [address, setAddress] = useState(props.data.address);
    const [isOpen, setIsOpen] = useState(props.stateButton)

    const editPersonalData = async() => {
        const token = localStorage.getItem('token');
             await fetch('http://localhost:8080/api/profile',{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    name,
                    lastName,
                    phoneNumber,
                    email,
                    address,
                    token
                })
            })
            setIsOpen(false);
            window.location.reload(true);
    }

    return (

        <Modal isOpen={isOpen}>

            <ModalHeader>
                Editar Datos
            </ModalHeader>

            <ModalBody>

                <FormGroup>
                    <div className="mb-3">
                        <label for="name" className="form-label">Nombre</label>
                        <input type="text" className="form-control" id="name" value={name} onChange = { e => setName(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label for="name" className="form-label">Apellido</label>
                        <input type="text" className="form-control" id="apellido" value={lastName} onChange = { e => setlastName(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label for="name" className="form-label">Numero de telefono</label>
                        <input type="text" className="form-control" id="phoneNumber" value={phoneNumber} onChange = { e => setphoneNumber(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label for="name" className="form-label">Email</label>
                        <input type="email" className="form-control" id="Email" value={email} onChange = { e => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label for="name" className="form-label">Direccion</label>
                        <input type="text" className="form-control" id="address" value={address} onChange = { e => setAddress(e.target.value)} required />
                    </div>
                    <Button className='btn btn-success' onClick={editPersonalData}>Confirmar</Button>
                    <Button className='btn btn-danger' onClick={(()=>setIsOpen(false))}>Cancelar</Button>
                    {isOpen ? null : <Profile state = {isOpen}/>}

                </FormGroup>

            </ModalBody>

        </Modal>
    )
}