import React, { useState, useEffect } from "react";
import "./DoorsCalc.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import Select from "../../components/Select/Select";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

let options: [string, number][] = [
  ["ВІЛЬХА", 6945],
  ["СОСНА", 6945],
  ["ЯСЕН", 8334],
  ["ДУБ", 10186],
];

const fadeImages = [
  "/assets/photos/doors/IMG_8266.jpg",
  "/assets/photos/doors/IMG_8269.jpg",
  "/assets/photos/doors/IMG_8318.jpg"
];

const validationSchema = Yup.object().shape({
  material: Yup.string().required("Material is required"),
  length: Yup.string().required("Length is required"),
  width: Yup.string().required("Width is required"),
  area: Yup.string(),
  name: Yup.string().required("Name is required"),
  mobile: Yup.string()
    .required("Mobile is required"),
  total: Yup.string(),
  email: Yup.string()
    .required("Email is required"),
});

const DoorsCalc = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
    resolver: yupResolver(validationSchema),
  });
  const [notification, setNotification] = useState<{ message: string, status: boolean } | null>(null)

  const [active, setActive] = useState(0);
  const [price, setPrice] = useState(options[0][1]);
  const [length, setLength] = useState(0);
  const [width, setWidth] = useState(0);
  const [area, setArea] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setTotalPrice((price * length * width) / 10000);
    setValue("area", ((length * width) / 10000).toFixed(2));
    setValue("total", (price * length * width) / 10000);
  }, [length, width, price]);

  const HandleChangeMaterial = (a) => {
    setActive(a);
    setPrice(options[a][1]);
  };
  console.log(options[active])

  const HandleChangeLength = (event) => {
    setLength(event.target.value);
  };
  const HandleChangeWidth = (event) => {
    setWidth(event.target.value);
  };
  const HandleChangeArea = (event) => {
    setArea(event.target.value);
  };

  const sendEmail = async (data) => {
    try {
      console.log(data);
      const res = await axios.post("https://ecomebli.com.ua/api/mailer.php", data)

      const notification = res.data.status ? {
        message: "Ваш запит в обробці",
        status: true
      } : {
        message: "Сталася помилка при відправці",
        status: false
      }

      setNotification(notification)
    } catch (error) {
      setNotification({
        message: "Сталася помилка при відправці, повторіть пізніше",
        status: false
      })
      console.log(error)
    }
  };
  return (
    <section className="wrapper-doors">
      <div className="header" />
      <div className="calc-header" />
      <div className="localContainer">
        <div>
          <h2 className="calc-title">КАЛЬКУЛЯТОР ДВЕРЕЙ</h2>
          <p className="calc-text">РОЗРАХУЄМО ВАРТІСТЬ ЗАМОВЛЕННЯ</p>
        </div>
        <div className="calc calc-items">
          <form
            className="calc-calc_block_door"
            onSubmit={handleSubmit((data) => {
              sendEmail(data);
              setTotalPrice(0);
              reset();
            })}
          >
            <input {...register("product")} type="hidden" value="doors" />
            <input {...register("material")} type="hidden" value={options[active][0]} />
            <p className="calc-calc_titles">СИРОВИНА</p>
            <div>
              <Select
                options={options}
                value={active}
                onClick={(a) => {
                  HandleChangeMaterial(a);
                }}
              />
            </div>
            <p className="calc-calc_titles">КАЛЬКУЛЯТОР ВАРТОСТІ ТОВАРУ</p>
            <div className="area">
              <label className="area-title_block">
                <p className="area-title">ВИСОТА</p>
              </label>
              <input
                {...register("length")}
                type="text"
                className="area-input"
                placeholder="_ _ _ _ _"
                id="length"
                name="length"
                onChange={HandleChangeLength}
              />
              <label className="area-size_block">
                <p className="area-size">СМ.</p>
              </label>
            </div>
            <div className="area">
              <label className="area-title_block">
                <p className="area-title">ШИРИНА</p>
              </label>
              <input
                {...register("width")}
                type="text"
                className="area-input"
                placeholder="_ _ _ _ _"
                id="width"
                name="width"
                onChange={HandleChangeWidth}
              />
              <label className="area-size_block">
                <p className="area-size">СМ.</p>
              </label>
            </div>
            <div className="area">
              <label className="area-title_block">
                <p className="area-title">ПЛОЩА</p>
              </label>
              <input
                {...register("area")}
                type="text"
                className="area-input"
                placeholder="_ _ _ _ _"
                id="area"
                name="area"
                readOnly
                onChange={HandleChangeArea}
              />
              <label className="area-size_block">
                <p className="area-size">КВ. М.</p>
              </label>
            </div>
            {errors.length || errors.width || errors.area ? (
              <span className="error-message">
                Будь ласка, вкажіть параметри дверей <br />
              </span>
            ) : (
              <></>
            )}
            <label className="total-price">
              <span className="total-price-text">ЗАГ. ВАРТІСТЬ</span>
              <span className="total-price-result">
                {totalPrice.toFixed(2)}
                <p className="total-price-currency">ГРН</p>
              </span>
            </label>
            <div className="contact-info">
              <div className="contact-info-block">
                <p className="contact-info-text">ВАШЕ ІМ'Я</p>
              </div>
              <div className="contact-info-block">
                <input
                  type="text"
                  className="contact-info-input"
                  {...register("name")}
                  name="name"
                />
              </div>
              <div className="contact-info-block">
                <p className="contact-info-text">НОМЕР ТЕЛ.</p>
              </div>
              <div className="contact-info-block">
                <input
                  type="text"
                  className="contact-info-input"
                  {...register("mobile")}
                  name="mobile"
                />
              </div>
              <div className="contact-info-block">
                <p className="contact-info-text">ПОШТА</p>
              </div>
              <div className="contact-info-block">
                <input
                  type="text"
                  className="contact-info-input"
                  {...register("email")}
                  name="email"
                />
              </div>
            </div>
            {errors.mobile || errors.name || errors.email ? (
              <span className="error-message">
                Будь ласка, вкажіть дійсні данні <br />
              </span>
            ) : (
              <></>
            )}
            {
              notification ?
                <span className={notification.status ? "success-message" : "error-message"}>{notification.message}<br /></span> : <></>
            }
            <button className="submit-button">ЗАЛИШИТИ КОНТАКТИ</button>
          </form>
          <div className="slide-container">
            <Fade cssClass=" calc-img_door_block">
              {fadeImages.map((img, inx) => {
                return (
                  <div className="each-fade" key={inx}>
                    <img src={img} className="calc-img_door" alt="doors_img" />
                  </div>
                )
              })}
            </Fade>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoorsCalc;
