import React, { useState } from "react";
import cls from "./Slider.module.css";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import sliderImg from "../../data/slider-img";

const Slider = () => {
  const [slideIdx, setSlideIdx] = useState(0);

  const arrowHandler = (direction) => {
    if (direction === "prev") {
      setSlideIdx(slideIdx > 0 ? slideIdx - 1 : 2);
    } else {
      setSlideIdx(slideIdx < 2 ? slideIdx + 1 : 0);
    }
  };

  return (
    <div className={cls.slider}>
      <div
        direction="prev"
        className={cls.arrow}
        onClick={() => arrowHandler("prev")}
      >
        <ArrowLeftIcon className={cls.arrowIcon} />
      </div>

      <div
        direction="next"
        className={cls.arrow}
        onClick={() => arrowHandler("next")}
      >
        <ArrowRightIcon className={cls.arrowIcon} />
      </div>
      <div
        className={cls.container}
        style={{ transform: `translateX(${-100 * slideIdx}vw)` }}
      >
        {sliderImg.map((item) => {
          return (
            <div
              className={cls.slide}
              key={item.id}
              style={{ backgroundColor: item.bg }}
            >
              <div className={cls.imgContainer}>
                <img src={item.img} alt="" />
              </div>
              <div className={cls.infoContainer}>
                <h1>{item.title}</h1>
                <button
                  onClick={() => window.location.replace("/#products-sec")}
                >
                  SHOP NOW
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Slider;
