import { GET_ORDERS, CHECKOUT, ORDERS_LOADING } from '../actions/types';

const initialState = {
    orders: [],
    loading: false
}

export default function(state=initialState, action){
    switch(action.type){
        //establecemos el array de pedidos de la carga util de la accion
        //establece loading en falso
        case GET_ORDERS:
            return{
                ...state,
                orders: action.payload,
                loading: false
            }

        //recibimos el nuevo pedido de la carga util y los agregamos al array
        case CHECKOUT:
            return{
                ...state,
                orders: [action.payload, ...state.orders]
            }

        //estblecemos loading en verdadero
        case ORDERS_LOADING:
            return{
                ...state,
                loading: true
            }

        default:
            return state;
    }
}