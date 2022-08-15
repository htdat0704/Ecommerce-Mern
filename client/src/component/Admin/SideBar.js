import React from "react";
import "./SideBar.css";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";

import PostAddIcon from "../../assets/unlock-fill.svg";
import AddIcon from "../../assets/unlock-fill.svg";

import ListAltIcon from "../../assets/unlock-fill.svg";
import DashboardIcon from "../../assets/unlock-fill.svg";
import PeopleIcon from "../../assets/unlock-fill.svg";
import RateReviewIcon from "../../assets/unlock-fill.svg";

const tree = [
  {
    items: [
      {
        text: (
          <Link to="/admin/products">
            <p>
              <img src={PostAddIcon} alt="Ecommerce" className="svgIMG" /> All
            </p>
          </Link>
        ),
      },
      {
        text: (
          <Link to="/admin/products">
            <p>
              <img src={AddIcon} alt="Ecommerce" className="svgIMG" /> Create
            </p>
          </Link>
        ),
      },
    ],
  },
];

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/admin/dashboard">
        <p>
          <img src={DashboardIcon} alt="Ecommerce" className="svgIMG" />
          Dashboard
        </p>
      </Link>
      <p className="treeHeading">Product</p>
      <ul>
        <li>
          <Link to="/admin/products">
            <p>
              <img src={PostAddIcon} alt="Ecommerce" className="svgIMG" /> All
            </p>
          </Link>
        </li>
        <li>
          <Link to="/admin/products">
            <p>
              <img src={AddIcon} alt="Ecommerce" className="svgIMG" /> Create
            </p>
          </Link>
        </li>
      </ul>
      <Link to="/admin/orders">
        <p>
          <img src={ListAltIcon} alt="Ecommerce" className="svgIMG" />
          Orders
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <img src={PeopleIcon} alt="Ecommerce" className="svgIMG" /> Users
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          <img src={RateReviewIcon} alt="Ecommerce" className="svgIMG" />
          Reviews
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
