import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './components/PaymentForm';

const stripePromise = loadStripe('pk_test_51Njbr5F88g5WT6iJr0GEA0BURM3v2wvrBM2JIcs5WeSR4jCiadTmHAvpWmwCpPGEKOuZDT43cjognE4Vr5CtuSWc00oPpsZwRe'); // Replace with your actual publishable key

const App = () => {
  return (
    <div>
      <h1>Stripe Payment Example</h1>
      <Elements stripe={stripePromise}>
        <PaymentForm />
      </Elements>
    </div>
  );
};

export default App;
