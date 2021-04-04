import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import todoReducer from './todo-reducer';
import thunkMiddleware from "redux-thunk";

let reducer = combineReducers({
  todo: todoReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, /* preloadedState, */ composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;