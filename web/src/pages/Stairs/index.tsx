import React, { useState, useEffect } from "react";
import "./StairsCalc.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from "axios"


import item from "../../assets/calc_img/stairs.jpg"

const StairsCalc = () => {

  const validationSchema = Yup.object().shape({
    material: Yup.string()
        .required('Material is required'),
    length: Yup.string()
        .required('Length is required'),
    width: Yup.string()
        .required('Width is required'),
    rise: Yup.string()
        .required('Rise is required'),
    name: Yup.string()
        .required('Name is required'),
    mobile: Yup.string()
        .required('Mobile is required')
        .matches(/^((38)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{10,10}$/, 'Mobile must be valid'),
    total: Yup.string(),
  });
  
const {register, handleSubmit, formState: { errors }, setValue, reset} = useForm({mode: 'onTouched', reValidateMode: 'onChange', resolver: yupResolver(validationSchema)})

const [active, setActive] = useState("item_sosna")
const [price, setPrice] = useState(12000)
const [length, setLength] = useState(0)
const [width, setWidth] = useState(0)
const [rise, setRise] = useState(0)
const [totalPrice, setTotalPrice] = useState(0)

useEffect(() => {
    setTotalPrice(price * length * width * rise)
    setValue('total', price * length * width * rise)
  }, [price, length, width, rise])

const HandleChangeMaterial = (event) => {
  setActive(event.target.id)
  setPrice(event.target.value.split("-")[1])
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
    const res = await axios.post("http://localhost:4000/send_email_stairs", data)
  } catch (error) {
    console.log(error)
  }
};

return (
  <section className="wrapper-stairs">
    <div className="header" />
    <div className="calc-header" />
    <div className="container">
      <div>
        <h2 className="calc-title">КАЛЬКУЛЯТОР СХОДІВ</h2>
        <p className="calc-text">РОЗРАХУЄМО ВАРТІСТЬ ЗАМОВЛЕННЯ</p>
      </div>
      <div className="calc calc-items">
        <form className="calc-calc_block"
          onSubmit={handleSubmit((data) => {
            sendEmail(data)
            setTotalPrice(0)
            reset()
          })}
        >
          <p className="calc-calc_titles">СИРОВИНА</p>
          <div>
            <label className={active === "item_sosna" ? "material material_active" : "material "}>
              <input {...register('material')} type="radio" value="sosna-12000" className="material-radio" id="item_sosna" defaultChecked
                onChange={HandleChangeMaterial}
                name="material"
              />
              <span className="material-name">СОСНА</span>
              <span className="material-price">12000 ГРН/КВ.М</span>
            </label>
            <label className={active === "item_vilha" ? "material material_active" : "material "}>
              <input {...register('material')} type="radio" value="vilha-2000" className="material-radio" id="item_vilha"
                onChange={HandleChangeMaterial}
                name="material"
              />
              <span className="material-name">ВІЛЬХА</span>
              <span className="material-price">2000 ГРН/КВ.М</span>
            </label>
            <label className={active === "item_yasen" ? "material material_active" : "material "}>
              <input {...register('material')} type="radio" value="yasen-3000" className="material-radio" id="item_yasen"
                onChange={HandleChangeMaterial}
                name="material"
              />
              <span className="material-name">ЯСЕН</span>
              <span className="material-price">3000 ГРН/КВ.М</span>
            </label>
            <label className={active === "item_dyb" ? "material material_active" : "material "}>
              <input {...register('material')} type="radio" value="dyb-4000" className="material-radio" id="item_dyb"
                onChange={HandleChangeMaterial}
                name="material"
              />
              <span className="material-name">ДУБ</span>
              <span className="material-price">4000 ГРН/КВ.М</span>
            </label>
            <label className={active === "item_yasen_extra" ? "material material_active" : "material "}>
              <input {...register('material')} type="radio" value="yasen_extra-5000" className="material-radio" id="item_yasen_extra"
                onChange={HandleChangeMaterial}
                name="material"
              />
              <span className="material-name">ЯСЕН (ЩІЛЬНА)</span>
              <span className="material-price">5000 ГРН/КВ.М</span>
            </label>
            <label className={active === "item_dyb_extra" ? "material material_active" : "material "}>
              <input {...register('material')} type="radio" value="dyb_extra-6000" className="material-radio" id="item_dyb_extra"
                onChange={HandleChangeMaterial}
                name="material"
              />
              <span className="material-name">ДУБ (ЩІЛЬНА)</span>
              <span className="material-price">6000 ГРН/КВ.М</span>
            </label>
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
              <p className="area-title">ДОВЖИНА МАРШУ</p>
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
            <input {...register('rise')} type="text" className="area-input" placeholder="_ _ _ _ _" id="rise" name="rise"
              onChange={HandleChangeRise}
            />
            <label className="area-size_block">
              <p className="area-size">М.</p>
            </label>
          </div>
          {
            errors.length || errors.width || errors.rise ?
            <span className="error-message">Будь ласка, вкажіть параметри сходів <br/></span> : <></>
          }
          <label className="total-price">
            <span className="total-price-text">ЗАГ. ВАРТІСТЬ</span>
            <span className="total-price-result">{totalPrice}<p className="total-price-currency">ГРН</p></span>
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
          </div>
          {
            errors.mobile ||
            errors.name ?
            <span className="error-message">Будь ласка, вкажіть дійсні данні <br/></span> : <></>
          }
          <button className="submit-button">ЗАЛИШИТИ КОНТАКТИ</button>
        </form>
        <img src={item} alt="kitchen_img" className="calc-img" />
      </div>
    </div>
  </section>
);
};


export default StairsCalc;
