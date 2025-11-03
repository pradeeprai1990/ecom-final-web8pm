"use client"
import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HomeBanner({ bannerData }) {
  let [sliderData, setSliderData] = useState(bannerData.data)
  let [sliderImg, setsliderImg] = useState(bannerData.imgPath)

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <section className="overflow-hidden slider-one">
      <Slider {...settings}>
        {
          sliderData.map((data, index) => {
            return (
              <div>
                <img src={sliderImg+data.sliderImg} alt="" />
              </div>
            )
          })
        }
      </Slider>
    </section>
  )
}
