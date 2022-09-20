import React, { Fragment, useEffect, useState, useContext } from "react";
import Badge from "react-bootstrap/Badge";

import { Link, useParams, useNavigate } from "react-router-dom";
import { OrderContext } from "../../context/order/OrderContext";
import AccountTreeIcon from "../../assets/bezier2.svg";
import LoadingModal from "../Loading/loading";

import SideBar from "./SideBar";
import "./OrderProcess.css";

const ProcessOrder = () => {
  const navigate = useNavigate();
  const {
    orderState: { order },
    getOneOrder,
    updateOrder,
  } = useContext(OrderContext);

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    updateOrder(orderId, { status: status });
    navigate("/admin/orders");
  };
  const [isLoading, setLoading] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [status, setStatus] = useState("");

  // use const for variables not being reassigned
  const { orderId } = useParams();

  useEffect(() => {
    const timer = setTimeout(async () => {
      await getOneOrder(orderId);
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [orderId]);

  useEffect(() => {
    setStatus(order.orderStatus || "");
  }, [getOneOrder]);

  return (
    <Fragment>
      <LoadingModal show={isLoading || loadingSubmit} />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <div
            className="confirmOrderPage"
            style={{
              display: order.orderStatus === "Delivered" ? "block" : "grid",
            }}
          >
            <div>
              <div className="confirmshippingArea">
                <h2>Shipping Info</h2>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p>Name:</p>
                    <span>{order.user && order.user.name}</span>
                  </div>
                  <div>
                    <p>Phone:</p>
                    <span>
                      {order.shippingInfo && order.shippingInfo.phoneNo}
                    </span>
                  </div>
                  <div>
                    <p>Address:</p>
                    <span>
                      {order.shippingInfo &&
                        `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.country}`}
                    </span>
                  </div>
                </div>
                <h2>Payment</h2>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p>Amount:</p>
                    <span>{order.totalPrice && order.totalPrice} VND</span>
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
              <div className="confirmCartItems">
                <h2>Your Cart Items:</h2>
                <div className="confirmCartItemsContainer">
                  {order.orderItems &&
                    order.orderItems.map((item) => (
                      <div key={item.product}>
                        <img src={item.image} alt="Product" />
                        <Link to={`/product/${item.product}`}>
                          {item.name}
                        </Link>{" "}
                        <span>
                          {item.quantity} X {item.price} VND={" "}
                          <b>{item.price * item.quantity} VND</b>
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            {/*  */}
            <div>
              <form
                className="updateOrderForm"
                onSubmit={updateOrderSubmitHandler}
              >
                <h1>Process Order</h1>

                <div>
                  <img
                    src={AccountTreeIcon}
                    alt="TreeIcon"
                    className="imgSVG"
                  />
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value={status}>{status}</option>
                    {status === "Processing" && (
                      <>
                        <option value="Shipping">Shipping</option>
                        <option value="Cancel">Cancel</option>
                      </>
                    )}

                    {status === "Cancel" && (
                      <>
                        <option value="Shipping">Shipping</option>
                        <option value="Processing">Processing</option>
                      </>
                    )}

                    {status === "Shipping" && (
                      <>
                        <option value="Done">Done</option>
                        <option value="Cancel">Cancel</option>
                      </>
                    )}
                  </select>
                </div>

                <button
                  id="createProductBtn"
                  type="submit"
                  disabled={status === "Processing"}
                >
                  Process
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
