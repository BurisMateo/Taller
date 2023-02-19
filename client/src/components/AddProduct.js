import { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { addProduct } from '../actions/productActions';
import PropTypes from 'prop-types';
import AppNavbar from './AppNavbar';

class AddProduct extends Component {
    state = {
        title: '',
        description: '',
        price: '',
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool
    }

    onChange = (e) => {
        this.setState({[e.target.name]:e.target.value});
    }

    onSubmit = async (e) => {
        e.preventDefault();

        const newProduct = {
            title: this.state.title,
            description: this.state.description,
            price: this.state.price
        }

        await this.props.addProduct(newProduct);

        alert('El producto se agregó correctamente');
    }

    render(){
        return(
            <div>
                <AppNavbar/>
                <Container>
                    <h2 className="text-center mb-3">Add a new Product</h2>
                    { this.props.isAuthenticated ?
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label for="title">Titulo</Label>
                            <Input
                                type="text"
                                name="title"
                                id="title"
                                placeholder="Titulo del producto"
                                onChange={this.onChange}
                            />
                            <br/>
                            <Label for="description">Descripcion</Label>
                            <Input
                                type="text"
                                name="description"
                                id="description"
                                placeholder="Descripcion del producto"
                                onChange={this.onChange}
                            />
                            <br/>
                            <Label for="price">Precio</Label>
                            <Input
                                type="number"
                                name="price"
                                id="price"
                                placeholder="Precio del producto"
                                onChange={this.onChange}
                            />
                            
                            <Button
                                color="dark"
                                style={{marginTop: '2rem'}}
                                block
                            >Add product</Button>
                        </FormGroup>
                    </Form> : 
                    <Alert className="text-center" color="danger">Login to add products!</Alert>
                    }
                </Container>
            </div>
        )
    }
}

                /**
                 * VER COMO AGREGAR TAGS, FAV E IMG
                 */



const mapStateToProps = (state) => ({
    product: state.product,
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps,{addProduct})(AddProduct);