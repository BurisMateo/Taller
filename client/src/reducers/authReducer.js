import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null
}

export default function(state=initialState, action){
    switch(action.type){
        //establece isLoading en verdadero
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            };

        //establece isLoading en falso e isAuthenticated en verdadero
        // y establecemos el usuario como la carga útil que recibimos del archivo de actions
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            }

        // establece isAuthenticated como verdadero y establecemos el token recibido en el localstorage
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token',action.payload.token);
            return{
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false
            };

        // eliminamos el token del almacenamiento local
        //establecemos el token y el usuario en nulo
        // tambien establecemos isAuthenticated e isLoading en falso
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return{
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            };
        default:
            return state;
    }
}