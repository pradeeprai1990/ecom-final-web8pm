"use client"
import { productApi } from '@/api-services/HomeServices'
import ProductCart from '@/app/common/ProductCart'
import React, { useState } from 'react'

export default function HomeProducts({ productData, categoryData }) {
  let [products, setProducts] = useState(productData.data)
  let [imgPath, setImgPath] = useState(productData.imgPath)
  let [category, setCategory] = useState(categoryData)

  let handleChnage = async (category) => {
    let data = await productApi(category)
    setProducts(data.data)
  }

  return (
    <>
      <div className="relative flex items-center justify-center">
        <div className="absolute w-full border-t border-gray-200"></div>
        <div className="relative z-10 bg-white flex">
          {
            category.map((data, index) => {
              return (
                <button key={index} onClick={() => handleChnage(data._id)} className={`px-6 py-2 border  font-semibold`}>
                  {data.categoryName}
                </button>
              )
            })
          }

        </div>
      </div>

      <section className='py-[50px]'>
        <div className='max-w-[1320px] mx-auto grid grid-cols-4 gap-5'>
          {
            products.map((data, index) => {
              return (
                <ProductCart key={index} imgPath={imgPath} data={data} link={`/product/${data.id}`} />
              )
            }
            )
          }
        </div>
      </section>
    </>
  )
}
