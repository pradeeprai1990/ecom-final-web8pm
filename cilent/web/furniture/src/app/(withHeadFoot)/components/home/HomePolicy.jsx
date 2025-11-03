import React from 'react'
import { BiWorld } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa6";

export default function HomePolicy() {
  return (
    <div className='h-[250px] bg-[#eee]'>
      <div className='max-w-[1320px] mx-auto grid grid-cols-3'>
        <div className='py-[70px]'>
          <center>
            <BiWorld className='text-5xl border-1 rounded-3xl p-1' />
            <h3 className='font-bold text-2xl mt-3'>Free Shipping</h3>
            <p className='mt-2'>Free shipping on all order</p>
          </center>
        </div>

        <div className='py-[70px]'>
          <center>
            <FaCheck className='text-5xl border-1 rounded-3xl p-1' />
            <h3 className='font-bold text-2xl mt-3'>Money Return</h3>
            <p className='mt-2'>Back guarantee under 7 days</p>
          </center>
        </div>

         <div className='py-[70px]'>
          <center>
            <FaRegClock className='text-5xl border-1 rounded-3xl p-1' />
            <h3 className='font-bold text-2xl mt-3'>Online Support</h3>
            <p className='mt-2'>Support online 24 hours a day</p>
          </center>
        </div>
      </div>
    </div>
  )
}
