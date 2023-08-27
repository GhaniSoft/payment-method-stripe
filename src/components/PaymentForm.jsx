import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (error) {
      setPaymentError(error.message);
      setPaymentSuccess(false);
    } else {
      // Send the paymentMethod.id to your backend for processing
      const response = await fetch(
        "http://localhost:4000/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentMethodId: paymentMethod.id,
            amount: 5000,
            currency: "usd",
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setPaymentSuccess(true);
        setPaymentError(null);
      } else {
        setPaymentError(data.error);
        setPaymentSuccess(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ width: "300px", margin: "auto" }}>
        <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
      </div>
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
      {paymentError && <p style={{ color: "red" }}>{paymentError}</p>}
      {paymentSuccess && <p style={{ color: "green" }}>Payment successful!</p>}
    </form>
  );
};

export default PaymentForm;