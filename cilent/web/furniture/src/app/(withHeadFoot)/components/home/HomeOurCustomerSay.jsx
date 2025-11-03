"use client"
import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaUserTie } from "react-icons/fa";

export default function HomeOurCustomerSay() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <section className='overflow-hidden h-[450px]'>
      <Slider {...settings}>
        <div>
          <center>
            <h1 className='text-2xl font-bold pt-[100px]'>What Our Custumers Say ?</h1>
            <div className='max-w-[1320px] mx-auto py-8'>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, ratione est reprehenderit excepturi corrupti dolorem magnam totam doloremque itaque ullam distinctio maiores tempore voluptatem atque eligendi quo saepe aperiam velit.</p>
            </div>
            <FaUserTie className='text-8xl pt-[10px] rounded-2xl p-2 border-1'/>
            <b>Kathy Young</b>
            <p>CEO of SunPark</p>
          </center>
        </div>
        
        <div>
          <center>
            <h1 className='text-2xl font-bold pt-[100px]'>What Our Custumers Say ?</h1>
            <div className='max-w-[1320px] mx-auto py-8'>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, ratione est reprehenderit excepturi corrupti dolorem magnam totam doloremque itaque ullam distinctio maiores tempore voluptatem atque eligendi quo saepe aperiam velit.</p>
            </div>
            <FaUserTie className='text-8xl pt-[10px] rounded-2xl p-2 border-1'/>
            <b>Kathy Young</b>
            <p>CEO of SunPark</p>
          </center>
        </div>

        <div>
          <center>
            <h1 className='text-2xl font-bold pt-[100px]'>What Our Custumers Say ?</h1>
            <div className='max-w-[1320px] mx-auto py-8'>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, ratione est reprehenderit excepturi corrupti dolorem magnam totam doloremque itaque ullam distinctio maiores tempore voluptatem atque eligendi quo saepe aperiam velit.</p>
            </div>
            <FaUserTie className='text-8xl pt-[10px] rounded-2xl p-2 border-1'/>
            <b>Kathy Young</b>
            <p>CEO of SunPark</p>
          </center>
        </div>
      </Slider>
    </section>
  )
}
