import React,{useState} from 'react'


const AddProduct = () => {

const [title,setTitle] = useState('');
const [description,setDescription] = useState('');
const [price,setPrice] = useState('');
const [phoneNumber,setPhoneNumber] = useState('');
const [image,setImage] = useState('');


const handleSubmit = async (e) => {
    e.preventDefault()
    await fetch(`http://localhost:8080/api/products`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            title,
            description,
            price,
            phoneNumber
        })
    })
}

    return (
        <>
            <div className="login mb-3">
                <h1 class="display-3">Agregue un producto</h1>
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label for="name" className="form-label">Título</label>
                            <input type="name" className="form-control" id="name" aria-describedby="nameHelp" onChange = { e => setTitle(e.target.value)} value = {title} />
                        </div>
                        <div className="mb-3">
                            <label for="description" className="form-label">Descripcion</label>
                            <input type="name" className="form-control" id="description" aria-describedby="descriptionHelp" onChange = { e => setDescription(e.target.value)} value = {description} />
                        </div>
                        <div className="mb-3">
                            <label for="price" className="form-label">Precio</label>
                            <input type="number" className="form-control" id="price" aria-describedby="priceHelp" onChange = { e => setPrice(e.target.value)} value = {price} />
                        </div>
                        <div className="mb-3">
                            <label for="phoneNUmber" className="form-label">Etiquetas</label>
                            <input type="name" className="form-control" id="phoneNumber" aria-describedby="phoneHelp" onChange = { e => setPhoneNumber(e.target.value)} value = {phoneNumber} />
                        </div>
                        <div className="mb-3">
                            <label for="image" className="form-label">Imagen</label>
                            <input type="file" className="form-control" id="image" onChange = { e => setImage(e.target.value)} value = {image} />
                        </div>
                        <div className='d-flex justify-content-center'>
                            <button type="submit" className="btn btn-danger me-3">Cancelar</button>
                            <button type="submit" className="btn btn-success ms-3">Agregar</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddProduct;