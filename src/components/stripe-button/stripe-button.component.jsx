import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) =>{
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_889aOgf8ugSkgwmfZ2vW3dmx0076YVjkZx';
     const onToken =token =>{
         console.log(token);
         alert('Payment Successful');
        }
    return(
        <StripeCheckout
         label='Pay Now'
         name= 'CRWN Clothing Ltd.'
          billingAddresss
          shippingAddress
          image = 'https://svgshare.com/i/CUz.svg'
          description = {`Your total is $${price}`}
          amount = {priceForStripe}
          panelLabel = 'Pay now'
          token ={onToken}
          stripeKey ={publishableKey}
          />
    )
}

export default StripeCheckoutButton;