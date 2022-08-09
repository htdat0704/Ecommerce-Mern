import React from "react";
import { useState, useContext } from "react";
import "./header.css";
import logo from "../../../assets/bag-heart.svg";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/auth/AuthContext";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";

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
            <NavDropdown.Item to="/profile" as={Link}>
              Profile
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Orders</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Dashboard</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleClick}>Logout</NavDropdown.Item>
          </NavDropdown>
        ) : (
          <li className="nav__item">
            <Link to="/login" className="nav__link">
              Login
            </Link>
          </li>
        )}
        <li className="nav__item">
          <a href="#d" className="nav__link">
            Portfolio
          </a>
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
