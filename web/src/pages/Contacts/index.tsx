import React from "react";
import "./Contacts.scss";
import { Link } from "react-router-dom";
import instagramIcon from "../../assets/contacts/instagram.png";
import facebookIcon from "../../assets/contacts/facebook.png";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from "axios"


const Contacts = () => {

  const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Name is required'),
    mobile: Yup.string()
        .matches(/^((38)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{10,10}$/, 'Mobile must be valid'),
    email: Yup.string()
          .required('Email is required')
          .matches(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/, 'E-mail must be valid'),
  });
  
  const {register, handleSubmit, formState: { errors }, setValue, reset} = useForm({mode: 'onTouched', reValidateMode: 'onChange', resolver: yupResolver(validationSchema)})
  
  const sendEmail = async (data) => {
    try {
      console.log(data);
      const res = await axios.post("https://test.teymax.com/api/mailer.php", data)
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <section className="wrapperContacts">
      <div className="apperContainer"></div>
      <div className="container">

        <p className="text title">контакти </p>
        <div className="gridBlock">
          <form className="contact-form"
          onSubmit={handleSubmit((data) => {
            sendEmail(data)
            reset()
          })}
          >
            <input {...register('product')} type='hidden' value="contact"/>
            <div className="contact-info-page">
              <div className="contact-info-page-block">
                <p className="contact-info-page-text">
                  ВАШЕ ІМ'Я*
                </p>
              </div>
              <div className="contact-info-page-block">
                <input type="text" className="contact-info-page-input" {...register('name')} name="name"/>
              </div>
              <div className="contact-info-page-block">
                <p className="contact-info-page-text">
                  НОМЕР ТЕЛ.
                </p>
              </div>
              <div className="contact-info-page-block">
                <input type="text" className="contact-info-page-input" {...register('mobile')} name="mobile"/>
              </div>
              <div className="contact-info-page-block">
                <p className="contact-info-page-text">
                  ПОШТА*
                </p>
              </div>
              <div className="contact-info-page-block">
                <input type="text" className="contact-info-page-input" {...register('email')} name="email"/>
              </div>
            </div>
            <div className="gridMessages">
              <button className="submit-button-contacts">ЗАЛИШИТИ КОНТАКТИ</button>
              <div>
                <p className="description">*ОБОВ'ЯЗКОВО ДО ЗАПОВНЕННЯ</p>
                {
                  errors.mobile ||
                  errors.name ?
                  <span className="error-message-contacts">Будь ласка, вкажіть дійсні данні <br/></span> : <></>
                }
              </div>
            </div>
          </form>
          <div>
            <p className="text email">hodakivskigmaks586@gmail.com</p>
            <p className="text tel">+38 (093) 182 62 35</p>
            <p className="text tel">+38 (098) 755 41 78</p>
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
        </div>
      </div>
    </section>
  );
};

export default Contacts;
