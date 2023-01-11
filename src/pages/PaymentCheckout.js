import React from "react";
import axios from "axios";
import { API_URL } from "../utils/api";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements } from "@stripe/react-stripe-js";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCart } from "../redux/cart";
import { useSelector } from "react-redux";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      lineHeight: "27px",
      color: "#212529",
      fontSize: "1.1rem",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (elements == null) {
      return;
    }
    const paymentMethodResult = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement),
    });
    if (!(paymentMethodResult.paymentMethod === undefined)) {
      handlePayment(paymentMethodResult.paymentMethod.id);
    } else {
      toast("Card details are incorrect!");
    }
  };

  const handlePayment = async (ID) => {
    setLoading(true);
    try {
      let amount = JSON.parse(localStorage.getItem("amount"));
      let table = JSON.parse(localStorage.getItem("table"));
      let serveType = JSON.parse(localStorage.getItem("serveType"));
      let isBuffetOrder = JSON.parse(localStorage.getItem("isBuffetOrder"))
        ? JSON.parse(localStorage.getItem("isBuffetOrder"))
        : 0;
      const items = isBuffetOrder ? "Buffet" : cart;
      const response = await axios.post(`${API_URL}/payment/create`, {
        amount: amount,
        paymentID: ID,
        table: table,
        items: items,
        serveType: serveType,
        isBuffetOrder: isBuffetOrder,
      });
      console.log(response);
      if (response.status == 200) {
        setTimeout(() => {
          dispatch(setCart([]));
          localStorage.removeItem("cart");
          localStorage.removeItem("amount");
          localStorage.removeItem("serveType");
          localStorage.removeItem("isBuffetOrder");
          setLoading(false);
          toast.success("Order placed successfully!");
          setTimeout(() => {
            navigate("/payment-success");
          }, 1500);
        }, 500);
      }
    } catch (error) {
      toast("Some error occurred during payment");
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light nave-bar">
        <div className="container-fluid d-flex ">
          <button
            type="button"
            className="btn btn-outline-dark borderRadious"
            onClick={() => {
              navigate("/cart");
            }}
          >
            &larr; Back to Cart
          </button>
          <div>
            <img src="/assets/logo.png" alt="" width="80" height="80" />
          </div>
          <div></div>
        </div>
      </nav>

      <div className="container mb-5 px-5 py-5">
        <form onSubmit={handleSubmit}>
          <div className="row" style={{ marginTop: 75 }}>
            <div className="col-md-12 mb-3">
              <div className="d-flex justify-content-between align-items-center"> 
              <label htmlFor="cc-number">Card Number</label>
              <img style={{width:"55%"}} src="/assets/card.png" alt="" />
              </div>
              <CardNumberElement
                id="cc-number"
                className="form-control"
                options={CARD_ELEMENT_OPTIONS}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="expiry">Expiration Date</label>
              <CardExpiryElement
                id="expiry"
                className="form-control"
                options={CARD_ELEMENT_OPTIONS}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="cvc">CVC</label>
              <CardCvcElement
                id="cvc"
                className="form-control"
                options={CARD_ELEMENT_OPTIONS}
              />
            </div>
          </div>
          {loading ? (
            <button
              className="btn btn-common borderRadious"
              style={{ background: "#CC6744", color: "white" }}
            >
              Processing...
            </button>
          ) : (
            <button
              className="btn btn-common borderRadious"
              style={{ background: "#CC6744", color: "white" }}
              type="submit"
              disabled={!stripe || !elements}
            >
              Pay
            </button>
          )}
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");

const PyamentCheckout = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default PyamentCheckout;
