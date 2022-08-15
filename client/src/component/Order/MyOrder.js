import React, { Fragment, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth/AuthContext";
import { OrderContext } from "../../context/order/OrderContext";
import "./MyOrder.css";
import Badge from "react-bootstrap/Badge";
import { Link } from "react-router-dom";

import DataGrid from "react-data-grid";
import LaunchIcon from "../../assets/grid-3x3-gap.svg";

const formatterStatus = (value) => {
  return (
    <Badge
      bg={
        value === "Done"
          ? "success"
          : value === "Delivered"
          ? "warning"
          : value === "Processing"
          ? "primary"
          : "Danger"
      }
    >
      {value}
    </Badge>
  );
};

const formatterActions = (value) => {
  return (
    <Link to={`/order/${value}`}>
      <img src={LaunchIcon} alt="icon" />
    </Link>
  );
};
const MyOrders = () => {
  const {
    authState: { user },
  } = useContext(AuthContext);

  const {
    orderState: { orders },
    getMyOrders,
  } = useContext(OrderContext);

  const columns = [
    { key: "id", name: "Order ID", minWidth: 300, flex: 1 },

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
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      key: "actions",
      flex: 0.3,
      name: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      formatter: (value) => {
        return formatterActions(value.row.id);
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    getMyOrders();
  }, []);

  return (
    <Fragment>
      (
      <div className="myOrdersPage">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          className="myOrdersTable"
          autoHeight
        />

        <h2 id="myOrdersHeading">{user.name}'s Orders</h2>
      </div>
      )
    </Fragment>
  );
};

export default MyOrders;
