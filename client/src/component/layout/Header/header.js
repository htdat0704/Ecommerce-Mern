import React from "react";
import { useState, useContext } from "react";
import "./header.css";
import logo from "../../../assets/bag-heart.svg";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/auth/AuthContext";
import NavDropdown from "react-bootstrap/NavDropdown";
import CartLogo from "../../../assets/cart3.svg";
import ProfileLogo from "../../../assets/person-circle.svg";
import DoorOpen from "../../../assets/box-arrow-right.svg";
import ListOrder from "../../../assets/list-ul.svg";
import Manage from "../../../assets/kanban.svg";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

export const Header = () => {
  const {
    authState: { isAuthenticated, user },
    logoutUserNow,
  } = useContext(AuthContext);

  const handleClick = async () => {
    await logoutUserNow();
  };

  return (
    <Navbar
      expand="lg"
      bg="primary"
      variant="dark"
      className="shadow"
      fixed="top"
    >
      <Navbar.Brand
        className="font-weight-bolder text-white nav__brand"
        style={{ marginLeft: "40px" }}
      >
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link className="font-weight-bolder text-white" to="/" as={Link}>
            Home
          </Nav.Link>
          <Nav.Link
            className="font-weight-bolder text-white"
            to="/products"
            as={Link}
          >
            Products
          </Nav.Link>
          <Nav.Link
            className="font-weight-bolder text-white"
            to="/cart"
            as={Link}
          >
            Cart
          </Nav.Link>
        </Nav>
        <Nav style={{ marginLeft: "auto", marginRight: "40px" }}>
          {isAuthenticated ? (
            <NavDropdown
              id="nav-dropdown-dark-example"
              title={user.name}
              menuVariant="dark"
            >
              {user.role === "admin" && (
                <NavDropdown.Item to="/admin/dashboard" as={Link}>
                  <img src={Manage} alt="cart" className="filter-green" />{" "}
                  Manage
                </NavDropdown.Item>
              )}
              <NavDropdown.Item to="/profile" as={Link}>
                <img src={ProfileLogo} alt="cart" className="filter-green" />{" "}
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item to="/orders" as={Link}>
                <img src={ListOrder} alt="cart" className="filter-green" />{" "}
                Orders
              </NavDropdown.Item>
              <NavDropdown.Item to="/cart" as={Link}>
                <img src={CartLogo} alt="cart" className="filter-green" /> Cart
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleClick}>
                {" "}
                <img src={DoorOpen} alt="cart" className="filter-green" />{" "}
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <li className="nav__item">
              <Link to="/login" className="nav__link">
                Login
              </Link>
            </li>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
