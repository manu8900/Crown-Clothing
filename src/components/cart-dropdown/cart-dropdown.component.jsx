import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CartItem from '../cart-item/cart-item.component';
import CustomButton from '../custom-button/custom-button.component';
import { selectCartItems } from '../../redux/cart/cart.selectors'
import { withRouter } from 'react-router';
import { toggleCartHidden } from '../../redux/cart/cart.actions'
import './cart-dropdown.styles.scss';

const CartDropdown = ({ cartItems, history, dispatch }) => (
    <div className="cart-dropdown">
        <div className={`${cartItems.length ? 'cart-items' : 'cart-items--hidden'}`}>
            {cartItems.length ? (
                cartItems.map(cartItem => (
                    <CartItem key={cartItem.id} item={cartItem} />
                ))
            ) : (
                    <span className="empty-message">Your cart is empty</span>
                )
            }
        </div>
        {cartItems.length !== 0 ? (<CustomButton onClick={() => {
            history.push('/checkout');
            dispatch(toggleCartHidden())
        }}>GO TO CHECKOUT</CustomButton>) : (<CustomButton onClick={() => {
            history.push('/shop');
            dispatch(toggleCartHidden())
        }}>GO TO SHOP</CustomButton>)}
        
    </div>
);
// const mapStateToProps = ({cart:{cartItems}}) =>({
// const mapStateToProps = state =>({
const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
    // cartItems: selectCartItems(state)
})

export default withRouter(connect(
    mapStateToProps
)(CartDropdown));
