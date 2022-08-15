import React, { useEffect, useContext } from "react";
import Sidebar from "./SideBar.js";
import "./dashboard.css";

import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { Chart } from "react-chartjs-2";
import { AuthContext } from "../../context/auth/AuthContext";
import { OrderContext } from "../../context/order/OrderContext";
import { ProductContext } from "../../context/product/ProductContext";
ChartJS.register(...registerables);
const Dashboard = () => {
  const {
    productState: { products },
  } = useContext(ProductContext);

  const {
    orderState: { orders },
  } = useContext(OrderContext);

  const {
    authState: { users },
  } = useContext(AuthContext);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  //   useEffect(() => {
  //     dispatch(getAdminProduct());
  //     dispatch(getAllOrders());
  //     dispatch(getAllUsers());
  //   }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboardContainer">
        <h2>Dashboard</h2>
        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> {totalAmount} VND
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>
        <div className="lineChart">
          <Line data={lineState} />
        </div>
        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
