import React from "react";
import { useState, useContext } from "react";
import "./header.css";
import logo from "../../../assets/bag-heart.svg";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/auth/AuthContext";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import CartLogo from "../../../assets/cart3.svg";
import ProfileLogo from "../../../assets/person-circle.svg";
import DoorOpen from "../../../assets/box-arrow-right.svg";
import ListOrder from "../../../assets/list-ul.svg";
import Manage from "../../../assets/kanban.svg";

export const Header = () => {
  const [active, setActive] = useState("nav__menu");
  const [icon, setIcon] = useState("nav__toggler");
  const {
    authState: { isAuthenticated, user },
    logoutUserNow,
  } = useContext(AuthContext);

  const handleClick = async () => {
    await logoutUserNow();
  };

  const navToggle = () => {
    if (active === "nav__menu") {
      setActive("nav__menu nav__active");
    } else setActive("nav__menu");

    // Icon Toggler
    if (icon === "nav__toggler") {
      setIcon("nav__toggler toggle");
    } else setIcon("nav__toggler");
  };
  return (
    <Navbar className="nav fixed-top">
      <Link to="/" className="nav__brand">
        <img src={logo} alt="logo" />
      </Link>
      <ul className={active}>
        <li className="nav__item">
          <Link to="/" className="nav__link">
            Home
          </Link>
        </li>
        <li className="nav__item">
          <Link to="/products" className="nav__link">
            Products
          </Link>
        </li>
        {isAuthenticated ? (
          <NavDropdown
            id="nav-dropdown-dark-example"
            title={user.name}
            menuVariant="dark"
          >
            {user.role === "admin" && (
              <NavDropdown.Item to="/admin/dashboard" as={Link}>
                <img src={Manage} alt="cart" className="filter-green" /> Manage
              </NavDropdown.Item>
            )}
            <NavDropdown.Item to="/profile" as={Link}>
              <img src={ProfileLogo} alt="cart" className="filter-green" />{" "}
              Profile
            </NavDropdown.Item>
            <NavDropdown.Item to="/orders" as={Link}>
              <img src={ListOrder} alt="cart" className="filter-green" /> Orders
            </NavDropdown.Item>
            <NavDropdown.Item to="/cart" as={Link}>
              <img src={CartLogo} alt="cart" className="filter-green" /> Cart
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleClick}>
              {" "}
              <img src={DoorOpen} alt="cart" className="filter-green" /> Logout
            </NavDropdown.Item>
          </NavDropdown>
        ) : (
          <li className="nav__item">
            <Link to="/login" className="nav__link">
              Login
            </Link>
          </li>
        )}
        <li className="nav__item">
          <Link to="/cart" className="nav__link">
            Cart
          </Link>
        </li>
      </ul>
      <div onClick={navToggle} className={icon}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </Navbar>
  );
};

export default Header;
