import React, { useState, useEffect } from "react";
import "./StairsCalc.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from "axios"
import Select from "../../components/Select/Select";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";


const options: [string, number][] = [
  ["СОСНА", 10850],
  ["ВІЛЬХА", 10850],
  ["ЯСЕН", 15500],
  ["ЯСЕН (ЩІЛІСНА)", 18600],
  ["ДУБ (ЩІЛІСНА)", 24300],
]

const fadeImages = [
  "/assets/photos/stairs/new-stairs-4.jpg",
  "/assets/photos/stairs/IMG_8685.jpg",
  "/assets/photos/stairs/new-stairs-2.jpg",
  "/assets/photos/stairs/new-stairs-5.jpg",
  "/assets/photos/stairs/new-stairs-1.jpg",
  "/assets/photos/stairs/new-stairs-3.jpg",
  "/assets/photos/stairs/IMG_8557.jpg",
];

const fields = [
  {
    start: "ДОВЖИНА МАРШУ",
    end: "M",
    name: "length"
  },
  {
    start: "ШИРИНА МАРШУ",
    end: "M",
    name: "width"
  },
  {
    start: "ПІДЙОМ",
    end: "КВ. М.",
    name: "rise",
    readonly: true
  },
]

const contactFields = [
  {
    label: "ВАШЕ ІМ'Я",
    name: 'name'
  },
  {
    label: "НОМЕР ТЕЛ.",
    name: 'mobile'
  },
  {
    label: "ПОШТА",
    name: 'email'
  },
]

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
    .required('Mobile is required'),
  total: Yup.string(),
  email: Yup.string()
    .required('Email is required'),
});

const PromptMessage: React.FC<{ show: boolean, text: string, type: "success" | "error" }> = ({ show, text, type = 'error' }) => {
  if (!show) {
    return null
  }

  return (
    <span className={`${type}-message`}>{text}</span>
  )
}

const StairsCalc = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch
  } = useForm<{ [key: string]: any }>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: {
      product: 'stairs',
      material: options[0][0],
      price: options[0][1],
      length: null,
      width: null,
      rise: null,
      total: 0
    }
  })
  const [notification, setNotification] = useState<{ message: string, status: boolean } | null>(null)

  const [active, setActive] = useState(0)

  const { rise, length, width, material, total } = watch()

  const price = options[active][1]

  console.log({ rise, length, width, material });


  useEffect(() => {
    setValue('total', (price * length * width))
    setValue('rise', ((length * width)).toFixed(2))

  }, [price, length, width])

  const HandleChangeMaterial = (a) => {
    setActive(a)
    console.log('Material: ', a, ' // ', options[active])
  }


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
              reset()
            })}
          >
            <input {...register('product')} type='hidden' value="stairs" />
            <input {...register("material")} type="hidden" value={options[active][0]} />
            <p className="calc-calc_titles">СИРОВИНА</p>
            <div>
              <Select
                options={options}
                value={active}
                onClick={(activeOption) => { HandleChangeMaterial(activeOption) }} />
            </div>
            <p className="calc-calc_titles">КАЛЬКУЛЯТОР ВАРТОСТІ ТОВАРУ</p>
            {fields.map((field) => {
              return (
                <div className="area" key={field.name}>
                  <label className="area-title_block">
                    <p className="area-title">{field.start}</p>
                  </label>
                  <input
                    {...register(field.name)}
                    type="text"
                    className="area-input"
                    placeholder="_ _ _ _ _"
                    id={field.name}
                    name={field.name}
                    readOnly={field.readonly}
                  />
                  <label className="area-size_block">
                    <p className="area-size">{field.end}</p>
                  </label>
                </div>
              )
            })}
            <PromptMessage
              type='error'
              show={errors.length || errors.width || errors.rise}
              text={"Будь ласка, вкажіть параметри сходів "}
            />
            <label className="total-price">
              <span className="total-price-text">ЗАГ. ВАРТІСТЬ</span>
              <span className="total-price-result">{total.toFixed(2)}<p className="total-price-currency">ГРН</p></span>
            </label>
            <div className="contact-info">
              {contactFields.map((field) => {
                return (
                  <React.Fragment key={field.name}>
                    <div className="contact-info-block">
                      <p className="contact-info-text">
                        {field.label}
                      </p>
                    </div>
                    <div className="contact-info-block">
                      <input type="text" className="contact-info-input" {...register(field.name)} name={field.name} />
                    </div>
                  </React.Fragment>
                )
              })}
            </div>
            <PromptMessage
              type='error'
              show={errors.mobile || errors.name || errors.email}
              text={"Будь ласка, вкажіть дійсні данні "}
            />

            <PromptMessage
              show={!!notification}
              type={notification?.status ? "success" : 'error'}
              text={notification?.message || ""}
            />

            <button className="submit-button">ЗАЛИШИТИ КОНТАКТИ</button>
          </form>
          <div className="slide-container">
            <Fade cssClass="calc-img_stairs_block">
              {
                fadeImages.map((img, inx) => {
                  return (
                    <div className="each-fade" key={inx}>
                      <img src={img} className="calc-img_stairs" alt="stairs-img" />
                    </div>
                  )
                })
              }
            </Fade>
          </div>
        </div>
      </div>
    </section>
  );
};


export default StairsCalc;
