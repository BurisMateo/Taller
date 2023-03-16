import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const AddProduct = () => {

    const [inputs, setInputs] = useState({
        title: "",
        description: "",
        price: 0
    });
    const [image,setImage] = useState();
    const [tags, setTags] = useState([]);

    
    const [loading, setLoading] = useState(false);

    const { title, description, price } = inputs;

    const navigate = useNavigate()

    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    

    const handleChangeImg = (e) => {
        if (e.target.files) {
            setImage(e.target.files[0])
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (title !== "" && description !== "" && price !== 0 && /*tags !== [] &&*/ (image !== undefined || image !== null )) {
            const Product = {
                title,
                description,
                price,
                //tags,
                image
            };
            setLoading(true);
            await axios
                .post("http://localhost:8080/api/products", Product)
                .then((res) => {
                    const { data } = res;
                    console.log(data);
                    setInputs({ title: "", description: "", price: 0, /*tags: [],*/ });
                    setTimeout(() => {
                        navigate("/");
                    }, 1500);
                })
                .catch((error) => {
                    console.error(error);
                });

            setLoading(false);
        } else {
            window.alert('Completa todos los datos')
        }
    };

        return (
            <>
                <div className="login mb-3">
                    <h1 class="display-3">Agregue un producto</h1>
                    <div className="form-container">
                        <form onSubmit={(e) => onSubmit(e)}>
                            <div className="mb-3">
                                <label for="title" className="form-label">Título</label>
                                <input type="text" className="form-control" onChange={(e) => handleChange(e)} value={title} name="title" id="title" autoComplete='off' />
                            </div>
                            <div className="mb-3">
                                <label for="description" className="form-label">Descripcion</label>
                                <textarea type="text" className="form-control" id="description" onChange = {(e) => handleChange(e)} value = {description} name="description" autoComplete='off' />
                            </div>
                            <div className="mb-3">
                                <label for="price" className="form-label">Precio</label>
                                <input type="number" className="form-control" id="price" onChange = {(e) => handleChange(e)} value = {price} name="price" autoComplete='off'/>
                            </div>
                            {/**
                            <div className="mb-3">
                                <label for="tags" className="form-label">Etiquetas</label>
                                <input type="text" className="form-control" id="tags" value = {tags} autoComplete='off' />
                            </div>
                            
                             */}
                            <div className="mb-3">
                                <label for="image" className="form-label">Imagen</label>
                                <input type="file" className="form-control" id="image" onChange = { (e) => setImage(e.target.value)} value = {image} name="image" />
                            </div>
                            <div className='d-flex justify-content-center'>
                                <button type="button" onClick={() => navigate('/')} className="btn btn-danger me-3">Cancelar</button>
                                <button type="submit" className="btn btn-success ms-3">Agregar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        )
    }

export default AddProduct;