"use client"
import ProductCart from '@/app/common/ProductCart';
import React, { useState } from 'react'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

export default function ProductDetailView({ singleProduct, productApis }) {

  let [multiImg, setMultiImg] = useState(singleProduct.thumbnail)

  let { images } = singleProduct
  return (
    <>
      <div className='max-w-[1320px] mx-auto grid grid-cols-[45%_auto] my-5 gap-8'>
        <div className='border-1 border-[#ccc]'>
          <img width={'100%'} src={multiImg} alt="" />
          <div className='flex gap-3 justify-center mb-2'>
            {
              images?.map((src, index) => {
                return (
                  <img width={"25%"} onClick={() => setMultiImg(src)} className='border-1 border-[#ccc]' src={src} key={index} alt="" />
                )
              })
            }
          </div>
        </div>

        <div>
          <h1 className='font-bold text-3xl'>{singleProduct.title}</h1>
          <h3 className='mt-5'><span className='line-through '>RS. 7,000</span>  &nbsp;<span>RS. {singleProduct.price}</span></h3>
          <p className='mt-8'>{singleProduct.description}</p>
          <hr className='mt-2 border-[#eee]' />
          <button className='mt-10 bg-amber-500 p-3 w-[300px] rounded text-white cursor-pointer'>Add To Cart</button>

          <ul className='space-y-3 mt-8'>
            <li><b>Code:</b> jod3333</li>
            <li><b>Dimension:</b> 72L * 32H * 30W</li>
            <li><b>Estimate Delivery Days:</b> "30-35" Days</li>
            <li><b>Category:</b> Side and End Tables</li>
            <li><b>Color:</b> Black Finish</li>
            <li><b>Material:</b> JackFruit</li>
          </ul>
        </div>
      </div>

      <div className='max-w-[1320px] mx-auto mt-10'>
        <h1 className='font-bold text-3xl mt-5'>Description</h1>
        <hr className='border-[#eee] mt-5' />
      </div>

      <section className='py-[50px]'>
        <div className='max-w-[1320px] mx-auto'>
          <h3 className='py-1 text-2xl font-bold'>Related products</h3>
          <hr className='my-4 border-0 h-0.5 bg-[#eee]' />
          <Slide
            slidesToShow={5}
            slidesToScroll={1}
            autoplay={true}
            duration={3000}
            arrows={true}
            indicators={false}
          >
            {
              productApis?.map((data, index) => (
                <div key={index} className="p-2">
                  <ProductCart data={data} link={`${data.id}`} />
                </div>
              ))
            }
          </Slide>
        </div>
      </section>

      <section className='py-[50px]'>
        <div className='max-w-[1320px] mx-auto'>
          <h3 className='py-1 text-2xl font-bold'>Upsell products</h3>
          <hr className='my-4 border-0 h-0.5 bg-[#eee]' />
          <Slide
            slidesToShow={5}
            slidesToScroll={1}
            autoplay={true}
            duration={3000}
            arrows={true}
            indicators={false}
          >
            {
              productApis.map((data, index) => (
                <div key={index} className="p-2">
                  <ProductCart data={data} link={`${data.id}`} />
                </div>
              ))
            }
          </Slide>
        </div>
      </section>
    </>
  )
}
