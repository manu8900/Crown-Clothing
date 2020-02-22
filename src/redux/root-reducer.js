// This is the base reducer object that represent all 
//       of our states in our application

import {combineReducers} from 'redux';//to put all other reducer inside this root reducer
import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
export default combineReducers({
    user:userReducer,
    cart:cartReducer
})