import React, { Fragment, useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import CheckoutSteps from "./CheckoutStreps";
import LoadingModel from "../Loading/loading";

import "./ConfirmOrder.css";

import { CartContext } from "../../context/cart/CartContext";
import { AuthContext } from "../../context/auth/AuthContext";
import { OrderContext } from "../../context/order/OrderContext";

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const {
    cartState: { cartItems, shippingInfor },
    removeAllItems,
  } = useContext(CartContext);
  const {
    authState: { user },
  } = useContext(AuthContext);
  const { createOrder } = useContext(OrderContext);
  const [isLoading, setLoading] = useState(false);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfor.address}, ${shippingInfor.city}, ${shippingInfor.country}`;

  const proceedToPayment = () => {
    const dataOrder = {
      shippingInfo: shippingInfor,
      orderItems: cartItems,
      taxPrice: tax,
      totalPrice,
      user: user._id,
      shippingPrice: shippingCharges,
      itemsPrice: subtotal,
    };

    loadingShow();

    createOrder(dataOrder);
    removeAllItems();
    navigate("/orderSuccess", { replace: true });
  };
  const loadingShow = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <Fragment>
      <LoadingModel show={isLoading} />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <h2>Shipping Info</h2>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfor.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <h2>Your Cart Items:</h2>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X {item.price} VND ={" "}
                      <b>{item.price * item.quantity} VND</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <h2>Order Summery</h2>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>{subtotal} VND</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>{shippingCharges} VND</span>
              </div>
              <div>
                <p>GST:</p>
                <span>{tax} VND</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>{totalPrice} VND</span>
            </div>

            <button onClick={proceedToPayment}>Order</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
