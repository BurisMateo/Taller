import StripeCheckout from 'react-stripe-checkout';

const STRIPE_PUBLISHABLE = 'pk_test_51Ma6xoEySfBVAZELMqsiQB7q73Rr6WDkdcuRavvG3fa6t2jm1YUxPzSZ6u2EE67uLpfaH7tVVsNIh7Rs7RsVaHES00X51BQsZr';

//funcion para realizar el pago con el usuario y el id del token
const onToken = (user,checkout) => token => 
    checkout(user, token.id);

//
const Checkout = ({ amount, user, checkout }) => 
    <StripeCheckout
      amount={amount}
      token={onToken(user,checkout)}
      currency='ARS'
      stripeKey={STRIPE_PUBLISHABLE}
/>

export default Checkout;