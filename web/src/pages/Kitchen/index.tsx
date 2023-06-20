import React, { useState, useEffect } from "react";
import "./KitchenCalc.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import Select from "../../components/Select/Select";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const options: [string, number][] = [
  ["ВІЛЬХА", 12000],
  ["ЯСЕН", 15000],
  ["ДУБ", 18000],
  ["МАСИВ ДЕРЕВА", 22000],
];

const fadeImages = [
  "/assets/photos/kitchens/IMG_8237.jpg",
  "/assets/photos/kitchens/IMG_8295.jpg",
  "/assets/photos/kitchens/IMG_8678.jpg",
];

const KitchenCalc = () => {
  const validationSchema = Yup.object().shape({
    material: Yup.string().required("Material is required"),
    area: Yup.string().required("Area is required"),
    total: Yup.string(),
    name: Yup.string().required("Name is required"),
    mobile: Yup.string()
      .required("Mobile is required"),
    email: Yup.string()
      .required("Email is required"),
  });

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
  const [area, setArea] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setTotalPrice(price * area);
    setValue("total", price * area);
  }, [price, area]);

  const HandleChangeMaterial = (a) => {
    setActive(a);
    setPrice(options[a][1]);
    console.log('Material: ', a, ' // ', options[active])
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
    <section className="wrapper-kitchen">
      <div className="header" />
      <div className="calc-header" />
      <div className="localContainer">
        <div>
          <h2 className="calc-title">КАЛЬКУЛЯТОР КУХОНЬ</h2>
          <p className="calc-text">РОЗРАХУЄМО ВАРТІСТЬ ЗАМОВЛЕННЯ</p>
        </div>
        <div className="calc calc-items">
          <form
            className="calc-calc_block_kitchen"
            onSubmit={handleSubmit((data) => {
              sendEmail(data);
              setTotalPrice(0);
              reset();
            })}
          >
            <input {...register("product")} type="hidden" value="kitchen" />
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
                <p className="area-title">ДОВЖИНА</p>
              </label>
              <input
                {...register("area")}
                type="text"
                className="area-input"
                placeholder="_ _ _ _ _"
                id="area"
                name="area"
                onChange={HandleChangeArea}
              />
              <label className="area-size_block">
                <p className="area-size">ПГ.М.</p>
              </label>
            </div>
            {errors.area && errors.area.type === "required" && (
              <span className="error-message">
                Будь ласка, вкажіть площу кухні <br />
              </span>
            )}
            <label className="total-price">
              <span className="total-price-text">ЗАГ. ВАРТІСТЬ</span>
              <span className="total-price-result">
                {totalPrice.toFixed(2)}
                <p className="total-price-currency">ГРН</p>
              </span>
              <input
                {...register("total")}
                name="total"
                value={totalPrice}
                type="hidden"
                readOnly
              />
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
            <Fade cssClass="calc-img_kitchen_block">
              <div className="each-fade">
                <img src={fadeImages[0]} className="calc-img_kitchen" />
              </div>
              <div className="each-fade">
                <img src={fadeImages[1]} className="calc-img_kitchen" />
              </div>
              <div className="each-fade">
                <img src={fadeImages[2]} className="calc-img_kitchen" />
              </div>
            </Fade>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KitchenCalc;
