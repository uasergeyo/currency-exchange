import initialState from '../initialState';
import {CREATE_DATA} from '../actions';

export default function createData(state=initialState,action){
    if(action.type === CREATE_DATA){
        return {
            editableData: action.currencies 
        }
    }else{
        return state
    }
}