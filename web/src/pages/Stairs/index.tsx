import React, { useState, useEffect } from "react";
import "./StairsCalc.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from "axios"
import Select from "../../components/Select/Select";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";


const options:[string, number][] = [
  ["СОСНА", 10850],
  ["ВІЛЬХА", 10850],
  ["ЯСЕН", 15500],
  ["ЯСЕН (ЩІЛІСНА)", 18600],
  ["ДУБ (ЩІЛІСНА)", 24300],
]

const fadeImages = [
  "/assets/photos/stairs/IMG_8556.jpg",
  "/assets/photos/stairs/IMG_8634.jpg",
  "/assets/photos/stairs/IMG_8685.jpg"
];

const StairsCalc = () => {

  const validationSchema = Yup.object().shape({
    material: Yup.string()
        .required('Material is required'),
    length: Yup.string()
        .required('Length is required'),
    width: Yup.string()
        .required('Width is required'),
    rise: Yup.string(),
    name: Yup.string()
        .required('Name is required'),
    mobile: Yup.string()
        .required('Mobile is required')
        .matches(/^((38)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{10,10}$/, 'Mobile must be valid'),
    total: Yup.string(),
    email: Yup.string()
          .required('Email is required')
          .matches(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/, 'E-mail must be valid'),
  });
  
const {register, handleSubmit, formState: { errors }, setValue, reset} = useForm({mode: 'onTouched', reValidateMode: 'onChange', resolver: yupResolver(validationSchema)})

const [active, setActive] = useState(0)
const [price, setPrice] = useState(options[0][1])
const [length, setLength] = useState(0)
const [width, setWidth] = useState(0)
const [rise, setRise] = useState(0)
const [totalPrice, setTotalPrice] = useState(0)

useEffect(() => {
  setTotalPrice(price * length * width / 10000)
  setValue('total', (price * length * width / 10000))
  setValue('rise', ((length * width) / 10000).toFixed(2))
  }, [price, length, width])

const HandleChangeMaterial = (a) => {
  setActive(a)
  setPrice(options[a][1])
}

const HandleChangeLength = (event) => {
  setLength(event.target.value)
}
const HandleChangeWidth = (event) => {
  setWidth(event.target.value)
}
const HandleChangeRise = (event) => {
  setRise(event.target.value)
}

const sendEmail = async (data) => {
  try {
    console.log(data);
    const res = await axios.post("https://test.teymax.com/api/mailer.php", data)
  } catch (error) {
    console.log(error)
  }
};

return (
  <section className="wrapper-stairs">
    <div className="header" />
    <div className="calc-header" />
    <div className="localContainer">
      <div>
        <h2 className="calc-title">КАЛЬКУЛЯТОР СХОДІВ</h2>
        <p className="calc-text">РОЗРАХУЄМО ВАРТІСТЬ ЗАМОВЛЕННЯ</p>
      </div>
      <div className="calc calc-items">
        <form className="calc-calc_block_stairs"
          onSubmit={handleSubmit((data) => {
            sendEmail(data)
            setTotalPrice(0)
            reset()
          })}
        >
          <input {...register('product')} type='hidden' value="stairs"/>
          <p className="calc-calc_titles">СИРОВИНА</p>
          <div>
          <Select options={
              options
            } 
            value={
              active
            } 
            onClick={(a) => {HandleChangeMaterial(a)}}/>
          </div>
          <p className="calc-calc_titles">КАЛЬКУЛЯТОР ВАРТОСТІ ТОВАРУ</p>
          <div className="area">
            <label className="area-title_block">
              <p className="area-title">ДОВЖИНА МАРШУ</p>
            </label>
            <input {...register('length')} type="text" className="area-input" placeholder="_ _ _ _ _" id="length" name="length"
              onChange={HandleChangeLength}
            />
            <label className="area-size_block">
              <p className="area-size">СМ.</p>
            </label>
          </div>
          <div className="area">
            <label className="area-title_block">
              <p className="area-title">ШИРИНА МАРШУ</p>
            </label>
            <input {...register('width')} type="text" className="area-input" placeholder="_ _ _ _ _" id="width" name="width"
              onChange={HandleChangeWidth}
            />
            <label className="area-size_block">
              <p className="area-size">СМ.</p>
            </label>
          </div>
          <div className="area">
            <label className="area-title_block">
              <p className="area-title">ПІДЙОМ</p>
            </label>
            <input {...register('rise')} type="text" className="area-input" placeholder="_ _ _ _ _" id="rise" name="rise" readOnly
              onChange={HandleChangeRise}
            />
            <label className="area-size_block">
              <p className="area-size">КВ. М.</p>
            </label>
          </div>
          {
            errors.length || errors.width || errors.rise ?
            <span className="error-message">Будь ласка, вкажіть параметри сходів <br/></span> : <></>
          }
          <label className="total-price">
            <span className="total-price-text">ЗАГ. ВАРТІСТЬ</span>
            <span className="total-price-result">{totalPrice.toFixed(2)}<p className="total-price-currency">ГРН</p></span>
          </label>
          <div className="contact-info">
            <div className="contact-info-block">
              <p className="contact-info-text">
                ВАШЕ ІМ'Я
              </p>
            </div>
            <div className="contact-info-block">
              <input type="text" className="contact-info-input" {...register('name')} name="name"/>
            </div>
            <div className="contact-info-block">
              <p className="contact-info-text">
                НОМЕР ТЕЛ.
              </p>
            </div>
            <div className="contact-info-block">
              <input type="text" className="contact-info-input" {...register('mobile')} name="mobile"/>
            </div>
            <div className="contact-info-block">
              <p className="contact-info-text">
                ПОШТА
              </p>
            </div>
            <div className="contact-info-block">
              <input type="text" className="contact-info-input" {...register('email')} name="email"/>
            </div>
          </div>
          {
            errors.mobile ||
            errors.name ||
            errors.email ?
            <span className="error-message">Будь ласка, вкажіть дійсні данні <br/></span> : <></>
          }
          <button className="submit-button">ЗАЛИШИТИ КОНТАКТИ</button>
        </form>
        <div className="slide-container">
            <Fade cssClass="calc-img_stairs_block">
              <div className="each-fade">
                <img src={fadeImages[0]} className="calc-img_stairs" />
              </div>
              <div className="each-fade">
                <img src={fadeImages[1]} className="calc-img_stairs" />
              </div>
              <div className="each-fade">
                <img src={fadeImages[2]} className="calc-img_stairs" />
              </div>
            </Fade>
          </div>
      </div>
    </div>
  </section>
);
};


export default StairsCalc;
