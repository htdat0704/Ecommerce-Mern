import React, { Fragment, useEffect, useContext, useState } from "react";
import "./orderDetails.css";
import { OrderContext } from "../../context/order/OrderContext";
import LoadingModal from "../Loading/loading";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth/AuthContext";
import Badge from "react-bootstrap/Badge";

const OrderDetails = () => {
  const {
    orderState: { order },
    getOneOrder,
  } = useContext(OrderContext);
  let { orderId } = useParams();
  const [isLoading, setLoading] = useState(true);
  const {
    authState: { user },
  } = useContext(AuthContext);

  useEffect(() => {
    const timer = setTimeout(async () => {
      await getOneOrder(orderId);
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [orderId]);

  return (
    <Fragment>
      <LoadingModal show={isLoading} />
      <div className="orderDetailsPage">
        <div className="orderDetailsContainer">
          <h1>Order #{order && order._id}</h1>
          <h2>Shipping Info</h2>
          <div className="orderDetailsContainerBox">
            <div>
              <p>Name:</p>
              <span>{user.name}</span>
            </div>
            <div>
              <p>Phone:</p>
              <span>{order.shippingInfo && order.shippingInfo.phoneNo}</span>
            </div>
            <div>
              <p>Address:</p>
              <span>
                {order.shippingInfo &&
                  `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.country}`}
              </span>
            </div>
          </div>
          <h2>Order Status</h2>
          <div className="orderDetailsContainerBox">
            <div>
              <Badge
                bg={
                  order.orderStatus === "Done"
                    ? "success"
                    : order.orderStatus === "Shipping"
                    ? "warning"
                    : order.orderStatus === "Processing"
                    ? "primary"
                    : "danger"
                }
              >
                {order.orderStatus && order.orderStatus}
              </Badge>
            </div>
          </div>
        </div>

        <div className="orderDetailsCartItems">
          <h2>Order Items:</h2>
          <div className="orderDetailsCartItemsContainer">
            {order.orderItems &&
              order.orderItems.map((item) => (
                <div key={item.product}>
                  <img src={item.image} alt="Product" />
                  <Link to={`/product/${item.product}`}>{item.name}</Link>{" "}
                  <span>
                    {item.quantity} X {item.price} VND ={" "}
                    <b>{item.price * item.quantity} VND</b>
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderDetails;
