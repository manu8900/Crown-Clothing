import {createStore,applyMiddleware} from 'redux';//apply middleware recieves some actions & pass it to root reducer
import logger from 'redux-logger';//logs the action
import {persistStore}from 'redux-persist';
import rootReducer from './root-reducer';
import thunk from 'redux-thunk';


const middlewares =[thunk];
if(process.env.NODE_ENV === 'development'){//redux-logger will only run in development mode not in production mode
    middlewares.push(logger);
}

export const store = createStore(rootReducer,applyMiddleware(...middlewares));

export const persistor= persistStore(store);

export default {store,persistor};