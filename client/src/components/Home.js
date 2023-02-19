import { Component } from 'react';
import AppNavbar from './AppNavbar';
import {Card, CardText, CardBody, CardTitle, CardSubtitle, Button, Container} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProducts } from '../actions/productActions';
import { addToCart } from '../actions/cartActions';

class Home extends Component {

    componentDidMount(){
        this.props.getProducts();
    }

    static propTypes = {
        getProducts: PropTypes.func.isRequired,
        product: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool,
        addToCart: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired
    }

    onAddToCart = async (id, productId) => {
        await this.props.addToCart(id, productId, 1);
        alert ('El producto se ha añadido al carrito');
    }

    render(){
        const { products } = this.props.product;
        const user = this.props.user;
        return (
            <div>
            <AppNavbar/>
            <Container>
                <div className="row">
                {products.map((product)=>(
                    <div className="col-md-4">
                    <Card className="mb-4">
                        <CardBody>
                            <CardTitle tag="h5">{product.title}</CardTitle>
                            <CardSubtitle tag="h6">Rs. {product.price}</CardSubtitle>
                            <CardText>{product.category}</CardText>
                            {this.props.isAuthenticated ? 
                                <Button
                                    color="success"
                                    size="sm"
                                    onClick={this.onAddToCart.bind(this, user._id, product._id)}
                                    >Agregar al carrito</Button> :
                                    null}
                        </CardBody>
                    </Card>
                    </div>
                ))}
                 </div>
            </Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    product: state.product,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})

export default connect(mapStateToProps, {getProducts, addToCart})(Home);