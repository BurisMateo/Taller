import { GET_PRODUCTS, ADD_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT, PRODUCTS_LOADING } from '../actions/types';

const initialState = {
    products: [],
    loading: false
}

export default function(state=initialState, action){
    switch(action.type){
        //establece el array de productos como la carga util de action
        //establecemos loading en falso
        case GET_PRODUCTS:
            return{
                ...state,
                products: action.payload,
                loading: false
            }
        
        //llamamos al state con el operador spread y
        //agregamos el nuevo elemento que recibimos de la carga util
        case ADD_PRODUCT:
            return{
                ...state,
                products: [action.payload, ...state.products]
            }
        
        //obtenemos el id de la carga util
        //filtramos y eliminamos del array
        case DELETE_PRODUCT:
            return{
                ...state,
                products: state.products.filter(product => product._id!==action.payload)                
            };
        
        //obtenemos el id y el elemento actualizado de la carga util
        //buscamos el elemento en el array y lo actializamos
        case UPDATE_PRODUCT:
            const { id, data } = action.payload;
            return{
                ...state,
                products: state.products.map(product => {
                    if(product._id===id){
                        product = data;
                    }
                })
            }
        
        //establece loading en verdadero
        case PRODUCTS_LOADING:
            return{
                ...state,
                loading: true
            }

        default:
            return state;
    }
}