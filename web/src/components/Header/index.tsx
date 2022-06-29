import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import "./Header.scss";

const logoSvg = (
  <svg
    width="76"
    height="76"
    viewBox="0 0 76 76"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="38.3039"
      cy="37.6972"
      r="36.1335"
      stroke="#C9AD98"
      strokeWidth="3"
    />
    <path
      d="M44.4066 51.7377L26.0502 25.1526L14.7832 47.9398M31.746 51.7377L49.2795 25.1526L60.5466 47.9398"
      stroke="#C9AD98"
      strokeWidth="3"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="bevel"
    />
  </svg>
);

const Header = () => {
  const [active, setActive] = useState(false);
  const toggleMenu = () => setActive((active) => !active);
  return (
    <header>
      <h1 className="logo">
        <Link to="/">{logoSvg}</Link>
      </h1>

      <nav>
        <Link to="/">головна</Link>
        <Link to="works">роботи</Link>
        <Link to="catalog">каталог</Link>
        <Link to="contacts">контакти</Link>
      </nav>
      <div className={active ? "menu active" : "menu"}>
        <div className="burger_btn" onClick={toggleMenu}>
          <span />
        </div>
        <nav className={active ? "mobMenu active" : "mobMenu"}>
          <Link onClick={toggleMenu} to="/" >головна</Link>
          <Link onClick={toggleMenu} to="works" >роботи</Link>
          <Link onClick={toggleMenu} to="catalog" >каталог</Link>
          <Link onClick={toggleMenu} to="contacts" >контакти</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
