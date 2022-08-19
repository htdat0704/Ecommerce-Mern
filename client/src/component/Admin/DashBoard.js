import React, { useEffect, useContext, useState } from "react";
import Sidebar from "./SideBar.js";
import "./dashboard.css";

import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { Chart } from "react-chartjs-2";
import { UserContext } from "../../context/user/UserContext";
import { OrderContext } from "../../context/order/OrderContext";
import { ProductContext } from "../../context/product/ProductContext";

import LoadingModel from "../Loading/loading";

ChartJS.register(...registerables);
const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);

  const {
    productState: { productsAdmin },
    getAllProducts,
  } = useContext(ProductContext);

  const {
    orderState: { ordersAdmin },
    getAllOrders,
  } = useContext(OrderContext);

  const {
    userState: { usersAdmin },
    getAllUsers,
  } = useContext(UserContext);

  let outOfStock = 0;

  productsAdmin &&
    productsAdmin.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    const timer = setTimeout(async () => {
      await getAllUsers();
      await getAllOrders();
      await getAllProducts();
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  let totalAmount = 0;
  ordersAdmin &&
    ordersAdmin.forEach((item) => {
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
        data: [outOfStock, productsAdmin.length - outOfStock],
      },
    ],
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <LoadingModel show={isLoading} />
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
              <p>{productsAdmin && productsAdmin.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{ordersAdmin && ordersAdmin.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{usersAdmin && usersAdmin.length}</p>
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
