import React, { Fragment, useEffect, useContext, useState } from "react";
import { OrderContext } from "../../context/order/OrderContext";
import "./ProductList.css";
import { Link } from "react-router-dom";
import Sidebar from "./SideBar.js";
import Badge from "react-bootstrap/Badge";
import DataGrid from "react-data-grid";
import EditIcon from "../../assets/pencil-fill.svg";
import DeleteIcon from "../../assets/trash-fill.svg";

import LoadingModel from "../Loading/loading";

const ProductList = () => {
  const [isLoading, setLoading] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [keyword, setKeyword] = useState("");
  const {
    orderState: { ordersAdmin },
    getAllOrders,
    deleteOrder,
  } = useContext(OrderContext);

  const loadingShow = () => {
    setLoadingSubmit(true);
    setTimeout(() => {
      setLoadingSubmit(false);
    }, 2000);
  };

  const formatterStatus = (value) => {
    return (
      <Badge
        bg={
          value === "Done"
            ? "success"
            : value === "Shipping"
            ? "warning"
            : value === "Processing"
            ? "primary"
            : "danger"
        }
      >
        {value}
      </Badge>
    );
  };

  const formatterActions = (value) => {
    return (
      <>
        <Link to={`/admin/order/${value}`}>
          <img src={EditIcon} alt="icon" />
        </Link>
        <button onClick={() => deleteOrderHandler(value)}>
          <img src={DeleteIcon} alt="icon" />
        </button>
      </>
    );
  };

  const deleteOrderHandler = (id) => {
    loadingShow();
    deleteOrder(id);
  };

  const columns = [
    { key: "stt", name: "STT" },
    { key: "user", name: "Customer" },
    {
      key: "status",
      name: "Status",
      minWidth: 150,
      flex: 0.5,
      formatter: (value) => {
        return formatterStatus(value.row.status);
      },
    },
    {
      key: "itemsQty",
      name: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      key: "amount",
      name: "Amount",
      minWidth: 270,
      flex: 0.5,
      type: "number",
    },

    {
      key: "actions",
      flex: 0.3,
      name: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      formatter: (value) => {
        return formatterActions(value.row.orderId);
      },
    },
  ];
  const rows = [];
  let STT = 1;
  ordersAdmin &&
    ordersAdmin.forEach((order, index) => {
      rows.push({
        stt: STT,
        orderId: order._id,
        itemsQty: order.orderItems.length,
        amount: order.totalPrice + " VND ",
        status: order.orderStatus,
        user: order.user.name,
      });
      STT++;
    });

  useEffect(() => {
    const timer = setTimeout(async () => {
      await getAllOrders();
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    keyword ? getAllOrders(keyword) : getAllOrders();
  }, [keyword]);

  return (
    <Fragment>
      <LoadingModel show={isLoading || loadingSubmit} />(
      <div className="dashboardProduct">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL ORDERS</h1>
          <form className="searchBox">
            <input
              type="text"
              name="keyword"
              placeholder="Search Username ..."
              onChange={(e) => setKeyword(e.target.value)}
            />
          </form>
          <DataGrid
            rows={rows}
            columns={columns}
            disableSelectionOnClick
            className="productListTable"
            rowHeight={50}
          />
        </div>
      </div>
      )
    </Fragment>
  );
};

export default ProductList;
