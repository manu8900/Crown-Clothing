import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import{Provider} from 'react-redux';//Provide access to store & reducers
import{PersistGate} from 'redux-persist/integration/react';
import './index.css';
import App from './App';
import {persistor,store} from './redux/store';

ReactDOM.render(
    <Provider store ={store}>
    <BrowserRouter>
    <PersistGate persistor={persistor}>
     <App /> 
    </PersistGate>
    </BrowserRouter>
    </Provider>,
     document.getElementById('root')
     );

