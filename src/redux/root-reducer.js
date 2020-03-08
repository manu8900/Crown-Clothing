// This is the base reducer object that represent all 
//       of our states in our application

import { combineReducers } from 'redux';//to put all other reducer inside this root reducer
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage' //setting local storage through redux-persist
import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart'] //array sets the only reducer we want to persist
}

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer,
    shop: shopReducer
});

export default persistReducer(persistConfig, rootReducer);