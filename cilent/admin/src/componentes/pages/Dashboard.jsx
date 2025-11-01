import React from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";

export default function() {
  return (
    <>
      <div className='py-5'>
        <hr />
        <div className='p-3 text-[15px]'>
          Home / Dashboard
        </div>
        <hr />
        <div className='grid grid-cols-3 gap-5 pt-5 p-3'>
          <DashboardBox bg="bg-blue-700" text="26K (-12.4% ↓) Users"/>
          <DashboardBox bg="bg-blue-400" text="$6,200 (40.9% ↑) Product"/>
          <DashboardBox bg="bg-orange-400" text="2.49% (84.7% ↑) Category"/>
          <DashboardBox bg="bg-red-500" text="44K (-23.6% ↓) Orders"/>
        </div>
      </div>
    </>
  )
}

function DashboardBox({bg, text}){
  console.log(bg)
  return(
    <div className={`text-white text-[18px] p-5 font-bold shadow-lg h-[190px] rounded flex justify-between ${bg}`}>{text} <span><BsThreeDotsVertical /></span> </div>
  )
}
