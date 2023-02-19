import { combineReducers } from 'redux';
import productReducer from './productReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import cartReducer from './cartReducer';
import orderReducer from './orderReducer';

//combinamos los reducer con la funcion conbineReducers de Redux
export default combineReducers({
    product: productReducer,
    error: errorReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer
})