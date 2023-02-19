import axios from 'axios';
import { GET_PRODUCTS, ADD_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT, PRODUCTS_LOADING } from './types';
import { returnErrors } from './errorActions';

export const getProducts = () => dispatch => {
    dispatch(setProductsLoading());
    axios.get('/api/products')
        .then(res => dispatch({
            type: GET_PRODUCTS,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const addProduct = (product) => (dispatch) => {
    axios.post('/api/products', product)
        .then(res => dispatch({
            type: ADD_PRODUCT,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const deleteProduct = (id) => (dispatch) => {
    axios.delete(`/api/products/${id}`)
        .then(res => dispatch({
            type: DELETE_PRODUCT,
            payload: id
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const updateProduct = (id, product) => (dispatch) => {
    axios.put(`/api/products/${id}`, product)
        .then(res => dispatch({
            type: UPDATE_PRODUCT,
            payload: Promise.all([id, res.data])
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

// esta función establece el tipo como PRODUCTS_LOADING
export const setProductsLoading = () => {
    return{
        type: PRODUCTS_LOADING
    }
}