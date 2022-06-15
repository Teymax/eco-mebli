import React from "react";
import "./Contacts.scss";
import { Link } from "react-router-dom";
import instagramIcon from "../../assets/contacts/instagram.png";
import facebookIcon from "../../assets/contacts/facebook.png";
const Contacts = () => {
  return (
    <section>
      <div className="apperContainer"></div>
      <div className="container">
        <p className="text title">контакти </p>
        <p className="text email">hodakivskigmaks586@gmail</p>
        <p className="text tel">(Номер телефону)</p>
        <div className="media">
          <p className="text media-title">соціальні мережі</p>
          <div className="icons">
            <a href="https://www.facebook.com/people/Максім-Ходаківський/100010979947511/">
              <img src={facebookIcon} className="icon"></img>
            </a>
            <a href="https://www.instagram.com/eco_mebli/">
              <img src={instagramIcon} className="icon"></img>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
