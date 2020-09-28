import initialState from '../initialState';
import {EDIT_CELL} from '../actions';

export default function changeCurrencyPosition(state = initialState, action) {
    if (action.type === EDIT_CELL) {
        return {
            lastChange: action.cell
        }
    } else {
        return state
    }
}
