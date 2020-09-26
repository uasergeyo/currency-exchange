import { combineReducers } from 'redux';
import promiseReducer from './promiseReducer';
import createData from './createData';
import changeCurrencyPosition from './changeCurrencyPosition'

const reducers = combineReducers({
    
    promiseReducer,
    createData,
    changeCurrencyPosition,
});

export default reducers;