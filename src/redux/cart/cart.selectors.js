import {createSelector} from 'reselect';

const selectCart = state => state.cart; //input selector that take state of cart

export const selectCartItems = createSelector(
    [selectCart],
    (cart) => cart.cartItems
);
 export const selectCartItemsCount = createSelector(
     [selectCartItems],
     cartItems => cartItems.reduce(
         (accumalatedQuantity, cartItem) => accumalatedQuantity + cartItem.quantity,
          0)
 )