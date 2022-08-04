import React from "react";
import { useState } from "react";
import "./header.css";
import logo from "../../../assets/bag-heart.svg";
import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
  const [active, setActive] = useState("nav__menu");
  const [icon, setIcon] = useState("nav__toggler");
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
    <nav className="nav fixed-top">
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
        <li className="nav__item">
          <a href="#d" className="nav__link">
            Portfolio
          </a>
        </li>
        <li className="nav__item">
          <a href="#e" className="nav__link">
            Skills
          </a>
        </li>
        <li className="nav__item">
          <a href="#f" className="nav__link">
            Contact
          </a>
        </li>
      </ul>
      <div onClick={navToggle} className={icon}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
};

export default Header;
