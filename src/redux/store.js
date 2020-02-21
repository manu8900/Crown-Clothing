import {createStore,applyMiddleware} from 'redux';//apply middleware recieves some actions & pass it to root reducer
import logger from 'redux-logger';//logs the action
import rootReducer from './root-reducer';


const middlewares =[logger];

const store = createStore(rootReducer,applyMiddleware(...middlewares));

export default store;