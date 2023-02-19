import { GET_CART, ADD_TO_CART, DELETE_FROM_CART, CART_LOADING } from '../actions/types';

const initialState = {
    cart: null,
    loading: false
}

export default function(state=initialState, action){
    switch(action.type){
        //recibimos el carrito de la carga util y lo seteamos en el carrito del estado inicial
        //establecemos loading en falso
        case GET_CART:
            return {
                ...state,
                cart: action.payload,
                loading: false
            }
        
        //obtenemos el carrito actualizado de la carga util y lo actualizamos
        case ADD_TO_CART:
            return {
                ...state,
                cart: action.payload
            }
        
        //funciona igual que ADD_TO_CART
        case DELETE_FROM_CART:
            return {
                ...state,
                cart: action.payload
            }

        //establecemos loading en verdadero
        case CART_LOADING:
            return {
                ...state, 
                loading: true
            }

        default:
            return state;
    }
}