import {CREATE_DATA,EDIT_CELL } from '../actions';
import actionPromiseGetCurrencies from './promiseActions/actionPromiseGetCurrencies';

export {
    actionGetCurrencies,
    actionCreateCurrencyData,
    actionEditCell,
}

function actionGetCurrencies() {
    return async dispatch => {
        return await dispatch(actionPromiseGetCurrencies())
    }
}


function actionCreateCurrencyData(currencies) {
    return {
        type: CREATE_DATA,
        currencies: currencies
    }
}

function actionEditCell(cell){
    return {
        type: EDIT_CELL,
        cell
    }
}

