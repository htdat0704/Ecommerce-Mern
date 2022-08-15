import React from "react";

import "./OrderSuccess.css";
import CheckoutSteps from "./CheckoutStreps";
import CheckCircleIcon from "../../assets/check-ne.svg";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="orderSuccess">
      <CheckoutSteps activeStep={2} />
      <img alt="circle-fill" src={CheckCircleIcon} className="imgSVG" />

      <h2>Your Order has been Placed successfully </h2>
      <Link to="/orders">View Orders</Link>
    </div>
  );
};

export default OrderSuccess;
