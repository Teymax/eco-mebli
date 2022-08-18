import "./Galery.scss";
import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import imagesJson from "../Works/imagesJson.json";
import Slider from "./Slider";
const Galery = () => {
  const location = useLocation();
  const [indexForSlider, setIndexForSlider] = useState(0);
  const [active, setActive] = useState(false);
  const data = location.state;
  const sliderShower = (index) => {
    setIndexForSlider(index);
    setActive(true);
  };

  const {title} = useParams()
  let res;
  switch (title) {
    case "bath":
      res = imagesJson.bath;
      break;
    case "doors":
      res = imagesJson.doors;
      break;
    case "armchairs":
      res = imagesJson.armchairs;
      break;
    case "kitchens":
      res = imagesJson.kitchens;
      break;
    case "stairs":
      res = imagesJson.stairs;
      break;
    case "light":
      res = imagesJson.light;
      break;
    case "shelves":
      res = imagesJson.shelves;
      break;
    case "bedroom":
      res = imagesJson.bedroom;
      break;
    case "tables":
      res = imagesJson.tables;
      break;
    case "cabinets":
      res = imagesJson.cabinets;
      break;
  }
  return (
    <section>
      {console.log(res)}
      <div className="backgroundImg">
        <div className="backgroundImg-offer">
          <h2 className="backgroundImg-offer-text">{data.title}</h2>
          <span className="backgroundImg-offer_bottom">
            <p>для розрахування вартості</p>
            <Link to="/">
              <p className="backgroundImg-offer_button">натисніть сюди</p>
            </Link>
          </span>
        </div>
      </div>
      <div className="container" style={{ height: "100%" }}>
        {res.length > 3 && (
          <div className="offers offers-top">
            {res.map(
              (image, index) =>
                index <= res.length - 4 && (
                  <div
                    key={index}
                    className="offers-item"
                    style={{
                      backgroundImage: `url(${image.image})`,
                    }}
                    onClick={() => sliderShower(index)}
                  ></div>
                )
            )}
          </div>
        )}
        <div className="offers offers-bottom">
          {res.map(
            (image, index) =>
              index > res.length - 4 && (
                <div
                  key={index}
                  className="offers-item"
                  style={{
                    backgroundImage: `url(${image.image})`,
                  }}
                  onClick={() => sliderShower(index)}
                ></div>
              )
          )}
        </div>
      </div>
      <Slider
        startIndex={indexForSlider}
        setIndexForSlider={setIndexForSlider}
        active={active}
        setActive={setActive}
        title={data.title}
      >
        {res.map((imag, index) => (
          <div className="slide" key={index}>
            <div style={{ backgroundImage: `url(${imag.image})` }}></div>
          </div>
        ))}
      </Slider>
    </section>
  );
};
export default Galery;
