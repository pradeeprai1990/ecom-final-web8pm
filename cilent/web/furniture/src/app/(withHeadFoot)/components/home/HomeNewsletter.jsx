import React from 'react'

export default function HomeNewsletter() {
  return (
    <div className='bg-[#eee] h-[300px]'>
      <div className='max-w-[1320px] mx-auto'>
        <h1 className='text-center font-bold text-3xl pt-[70px]'>Our Newsletter</h1>
        <p className='text-center pt-2'>Get E-mail updates about our latest shop and special offers.</p>
        <div className='pt-5 text-center'><input className='border-1 h-[50px] w-[400px]' type="text" name="" id="" />
        <button className='p-3 mt-5 border-1 bg-amber-400 cursor-pointer'>SUBSCRIBE</button>
        </div>
      </div>
    </div>
  )
}
