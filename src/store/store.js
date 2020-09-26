import { createStore,applyMiddleware } from 'redux';
import reducers from './reducers';
import initialState from './initialState';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
const store = createStore(reducers, initialState,composeWithDevTools(applyMiddleware(thunk)));

store.subscribe(()=>console.log("STORE ",store.getState()))

export default store;