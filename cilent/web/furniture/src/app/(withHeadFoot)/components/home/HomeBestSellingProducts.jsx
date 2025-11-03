"use client"
import React, { useEffect, useState } from 'react'
import ProductCart from '@/app/common/ProductCart'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

export default function HomeBestSellingProducts({ bestSellingProductData }) {
 let products = [];
 let imgPath
 if(bestSellingProductData && bestSellingProductData.datas){
  products = bestSellingProductData.datas
  imgPath = bestSellingProductData.imgPath
 }

 console.log(products);
  const spanStyle = {
    padding: '20px',
    background: '#efefef',
    color: '#000000'
  }

  const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    height: '400px'
  }

  return (
    <div className="slide-container">
      <section className='py-[50px]'>
        <div className='max-w-[1320px] mx-auto'>
          <h3 className='py-1 text-2xl font-bold'>Bestselling Products</h3>
          <hr className='my-4 border-0 h-0.5 bg-[#eee]'/>
          <Slide
            slidesToShow={5} 
            slidesToScroll={1}
            autoplay={true}
            duration={3000}
            arrows={true}
            indicators={false}
          >
            {
              products.map((data, index) => (
                <div key={index} className="p-2">
                  <ProductCart data={data} imgPath={imgPath} link={`/product/${data.id}`} />
                </div>
              ))
            }
          </Slide>
        </div>
      </section>
    </div>
  )
}


