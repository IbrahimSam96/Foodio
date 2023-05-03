import React from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

import SyncIcon from '@mui/icons-material/Sync';

export default function CheckoutForm({ setPaymentStatus, PlaceOrder }) {

  const stripe = useStripe();
  const elements = useElements();


  const [message, setMessage] = React.useState(null);
  const [error, setError] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        // return_url: "http://localhost:3000/plans",
        // receipt_email: email,
      },
      redirect: 'if_required'
    }).then((res) => {
      // console.log(res)

      if (res.error) {
        if (res.error.type === "card_error" || res.error.type === "validation_error") {
          setMessage(res.error.message);
          setError(true)
          setPaymentStatus("failed")
        } else {
          setMessage("An unexpected error occurred.");
          setError(true)
          setPaymentStatus("failed")
        }
      }
      else{
        setPaymentStatus("succeeded");
        PlaceOrder(res.paymentIntent)
      }

    }).catch((err) => {
      console.log("Error", err)
    })

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className={`justify-self-center self-center m-8 p-8  shadow shadow-slate-400 border-[1px] border-[#056835]`} >

      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button
        className={`w-full p-2 mt-4 bg-[#056835] text-white font-Financials text-[1em] opacity-100 hover:opacity-90`}
        disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <SyncIcon className={`animate-spin	`} sx={{ color: "white", fontSize: "25px" }} /> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div className={`${error && 'text-[red] text-center pt-2'}`} id="payment-message">{message}</div>}

    </form>
  );
}