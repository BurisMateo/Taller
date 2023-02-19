import axios from 'axios';
import { returnErrors } from './errorActions';
import { USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL} from './types';

export const loadUser = () => (dispatch, getState) => {
    // Cargando usuario
    dispatch({ type: USER_LOADING });

    axios.get('/api/user', tokenConfig(getState))
        // usuario cargado
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            });
        });
}

export const register = ({name,lastName, email, password, phoneNumber, address}) => dispatch => {
    // headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    //Cuerpo de solicitud de registro
    const body = JSON.stringify({name, lastName, email, password, phoneNumber, address});

    axios.post('/api/register',body,config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
            dispatch({
                type: REGISTER_FAIL
            });
        });
}

export const login = ({email, password}) => dispatch => {
    // headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    //cuerpo de solicitud de inicio de sesión
    const body = JSON.stringify({email, password});

    axios.post('/api/login',body,config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({
                type: LOGIN_FAIL
            });
        });
}
// Cerrar sesión
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}


// este token se utiliza en loadUser para obtener 
// el estado del usuario que ha inisiado sesión
export const tokenConfig = getState => {
    //Obtener token del local storage
    const token = getState().auth.token;

    // Headers
    const config = {
        headers:{
            "Content-type": "application/json",
        }
    }

    if(token){
        config.headers['x-auth-token'] = token;
    }

    return config;
}