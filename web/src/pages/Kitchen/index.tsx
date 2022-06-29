import React, { useState, useEffect } from "react";
import "./KitchenCalc.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from "axios"


import item from "../../assets/calc_img/kitchen.jpg"

const KitchenCalc = () => {

  const validationSchema = Yup.object().shape({
    material: Yup.string()
        .required('Material is required'),
    area: Yup.string()
        .required('Area is required'),
    total: Yup.string(),
    name: Yup.string()
        .required('Name is required'),
    mobile: Yup.string()
        .required('Mobile is required')
        .matches(/^((38)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{10,10}$/, 'Mobile must be valid'),
  });
  
const {register, handleSubmit, formState: { errors }, setValue, reset} = useForm({mode: 'onTouched', reValidateMode: 'onChange', resolver: yupResolver(validationSchema)})

const [active, setActive] = useState("item_vilha")
const [price, setPrice] = useState(12000)
const [area, setArea] = useState(0)
const [totalPrice, setTotalPrice] = useState(0)

useEffect(() => {
    setTotalPrice(price * area)
    setValue('total', price * area)
  }, [price, area])

const HandleChangeMaterial = (event) => {
  setActive(event.target.id)
  setPrice(event.target.value.split("-")[1])
}

const HandleChangeArea = (event) => {
  setArea(event.target.value)
  
}


const sendEmail = async (data) => {
  try {
    console.log(data);
    const res = await axios.post("http://localhost:4000/send_email_kitchen", data)
  } catch (error) {
    console.log(error)
  }
};

return (
  <section className="wrapper-kitchen">
    <div className="header" />
    <div className="calc-header" />
    <div className="localContainer">
      <div>
        <h2 className="calc-title">КАЛЬКУЛЯТОР КУХОНЬ</h2>
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
            <label className={active === "item_vilha" ? "material material_active" : "material "}>
              <input {...register('material')} type="radio" value="Вільха-12000" className="material-radio" id="item_vilha" defaultChecked
                onChange={HandleChangeMaterial}
                name="material"
              />
              <span className="material-name">ВІЛЬХА</span>
              <span className="material-price">12000 ГРН/КВ.М</span>
            </label>
            <label className={active === "item_dyb" ? "material material_active" : "material "}>
              <input {...register('material')} type="radio" value="Дуб-12000" className="material-radio" id="item_dyb"
                onChange={HandleChangeMaterial}
                name="material"
              />
              <span className="material-name">ДУБ</span>
              <span className="material-price">12000 ГРН/КВ.М</span>
            </label>
            <label className={active === "item_yasen" ? "material material_active" : "material "}>
              <input {...register('material')} type="radio" value="Ясен-12000" className="material-radio" id="item_yasen"
                onChange={HandleChangeMaterial}
                name="material"
              />
              <span className="material-name">ЯСЕН</span>
              <span className="material-price">12000 ГРН/КВ.М</span>
            </label>
            <label className={active === "item_array" ? "material material_active" : "material "}>
              <input {...register('material')} type="radio" value="Масив_дерева-12000" className="material-radio" id="item_array"
                onChange={HandleChangeMaterial}
                name="material"
              />
              <span className="material-name">МАСИВ ДЕРЕВА</span>
              <span className="material-price">12000 ГРН/КВ.М</span>
            </label>
          </div>
          <p className="calc-calc_titles">КАЛЬКУЛЯТОР ВАРТОСТІ ТОВАРУ</p>
          <div className="area">
            <label className="area-title_block">
              <p className="area-title">ПЛОЩА</p>
            </label>
            <input {...register('area')} type="text" className="area-input" placeholder="_ _ _ _ _" id="area" name="area"
              onChange={HandleChangeArea}
            />
            <label className="area-size_block">
              <p className="area-size">ПГ.М.</p>
            </label>
          </div>
          {errors.area && errors.area.type === "required" && <span className="error-message">Будь ласка, вкажіть площу кухні <br/></span>}
          <label className="total-price">
            <span className="total-price-text">ЗАГ. ВАРТІСТЬ</span>
            <span className="total-price-result">{totalPrice}<p className="total-price-currency">ГРН</p></span>
            <input {...register('total')} name="total" value={totalPrice} type="hidden" readOnly/>
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


export default KitchenCalc;
