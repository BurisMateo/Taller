import { GET_ERRORS, CLEAR_ERRORS } from './types';

// Muestra los errores en mensajes
export const returnErrors = (msg, status, id = null) => {
    return {
        type: GET_ERRORS,
        payload: { msg, status, id }
    }
}

// elimina los mensajes de error
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
}