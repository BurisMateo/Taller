import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';

const initialState = {
    msg: {},
    status: null,
    id: null
}

export default function(state=initialState, action){
    switch(action.type){
        //configuramos el mensaje, el estado y el id desde la carga util
        case GET_ERRORS:
            return{
                msg: action.payload.msg,
                status: action.payload.status,
                id: action.payload.id
            };
        
        //reiniciamos todo
        case CLEAR_ERRORS:
            return{
                msg: {},
                status: null,
                id: null
            };
            
        default:
            return state;
    }
}