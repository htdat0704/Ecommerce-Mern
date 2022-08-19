import React, { Fragment, useEffect, useContext, useState } from "react";
import { UserContext } from "../../context/user/UserContext";
import "./ProductList.css";
import { Link } from "react-router-dom";
import Sidebar from "./SideBar.js";

import DataGrid from "react-data-grid";
import EditIcon from "../../assets/pencil-fill.svg";
import DeleteIcon from "../../assets/trash-fill.svg";
import Badge from "react-bootstrap/Badge";
import LoadingModel from "../Loading/loading";

const UserList = () => {
  const [isLoading, setLoading] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const {
    userState: { usersAdmin },
    getAllUsers,
    deleteUser,
  } = useContext(UserContext);

  const loadingShow = () => {
    setLoadingSubmit(true);
    setTimeout(() => {
      setLoadingSubmit(false);
    }, 2000);
  };

  const formatterActions = (value) => {
    return (
      <>
        <Link to={`/admin/user/${value}`}>
          <img src={EditIcon} alt="icon" />
        </Link>
        <button onClick={() => deleteProductHandler(value)}>
          <img src={DeleteIcon} alt="icon" />
        </button>
      </>
    );
  };

  const formatterRole = (value) => {
    return <Badge bg={value === "user" ? "success" : "danger"}>{value}</Badge>;
  };

  const deleteProductHandler = (id) => {
    console.log(id);
    loadingShow();
    deleteUser(id);
  };

  const columns = [
    { key: "id", name: "User ID", minWidth: 300, flex: 1 },

    {
      key: "email",
      name: "Email",
      minWidth: 150,
      flex: 0.5,
    },
    {
      key: "name",
      name: "Name",
      minWidth: 150,
      flex: 0.3,
    },

    {
      key: "role",
      name: "Role",
      minWidth: 270,
      flex: 0.5,
      formatter: (value) => {
        return formatterRole(value.row.role);
      },
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

  usersAdmin &&
    usersAdmin.forEach((name) => {
      rows.push({
        id: name._id,
        role: name.role,
        email: name.email,
        name: name.name,
      });
    });

  useEffect(() => {
    const timer = setTimeout(async () => {
      await getAllUsers();
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Fragment>
      <LoadingModel show={isLoading || loadingSubmit} />(
      <div className="dashboardProduct">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
          />
        </div>
      </div>
      )
    </Fragment>
  );
};

export default UserList;
