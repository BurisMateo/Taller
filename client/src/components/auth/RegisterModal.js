import { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class RegisterModal extends Component {
    state = {
        modal: false,
        name: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
        address: '',
        msg: null
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if(error !== prevProps.error){
            // comprueba si hay error en el registro
            if(error.id === 'REGISTER_FAIL'){
                this.setState({msg: error.msg.msg});
            }
            else{
                this.setState({msg:null});
            }
        }

        // si esta autenticado cierra el modal
        if(this.state.modal){
            if(isAuthenticated){
                this.toggle();
            }
        }
    }

    //cambia estado del modal
    toggle = () => {
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = (e) => {
        this.setState({[e.target.name]:e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault();  
        
        const { name, lastName, email, password, phoneNumber, address } = this.state;

        // creamos el objeto usuario
        const newUser = { name, lastName, email, password, phoneNumber, address };

        // intentamos registrar
        this.props.register(newUser);


    }

    render(){
        return(
            <div className="container">
                <Button color="info" className="btn btn-sm"><NavLink onClick={this.toggle} href="#"><span className="text-dark"><b>Register</b></span></NavLink></Button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>
                        Register
                    </ModalHeader>
                    <ModalBody>
                        {this.state.msg ? (<Alert color="danger">{this.state.msg}</Alert>):null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="name">Nombre</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="mb-3"
                                    onChange={this.onChange}
                                />
                                <Label for="lastName">Apellido</Label>
                                <Input
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    className="mb-3"
                                    onChange={this.onChange}
                                />
                                <Label for="email">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="mb-3"
                                    onChange={this.onChange}
                                />
                                <Label for="password">Contraseña</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="mb-3"
                                    onChange={this.onChange}
                                />
                                <Label for="phoneNumber">Telefono</Label>
                                <Input
                                    type="text"
                                    name="phoneNumber"
                                    id="phoneNumber"
                                    className="mb-3"
                                    onChange={this.onChange}
                                />
                                <Label for="addres">Direccion</Label>
                                <Input
                                    type="text"
                                    name="addres"
                                    id="addres"
                                    className="mb-3"
                                    onChange={this.onChange}
                                />
                                <Button
                                    color="dark"
                                    style={{marginTop: '2rem'}}
                                    block
                                >Register</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps,{register, clearErrors})(RegisterModal);