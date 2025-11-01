import React, { useState } from 'react'
import { FaPenAlt, FaSearch } from "react-icons/fa";
import { MdFilterAlt, MdFilterAltOff } from "react-icons/md";

export default function TestimonialView() {

  let [searchBox, setSearchBox] = useState(false)

  return (
    <>
      <div className='py-5'>
        <hr />
        <div className='p-3 text-[15px]'>
          Home / Testimonial / View
        </div>
        <hr />
        <div className='grid grid-cols-1 gap-5 pt-5 p-3'>
          <div className={`rounded-xl shadow-xl border-t-1 border-[#eee] p-5 bg-blend-hue`}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold">Testimonial</h2>
              <span className="flex gap-1">
                {
                  searchBox ? 
                  <>
                  <input type="text" className='border-1' /><button className="bg-green-600 rounded p-2 text-white"><FaSearch /></button>
                  <button className='bg-blue-600 rounded p-2 text-white  cursor-pointer'><MdFilterAltOff onClick={()=>setSearchBox(false)} /></button>
                  </>
                  :
                  <>
                  <button className='bg-blue-600 rounded p-2 text-white  cursor-pointer'><MdFilterAlt onClick={()=>setSearchBox(true)} /></button>
                  </>
                }
                <button className='bg-green-600 rounded p-2 text-white'>CHANGE STATUS</button>
                <button className='bg-red-600 rounded p-2 text-white'>DELETE</button>
              </span>
            </div>
            <div>
              <table className="table-auto w-full border bg-[#1f2937] text-white pb-5">
                <thead>
                  <tr className='bg-blue-950'>
                    <th className="border px-4 py-2 text-left"> <input type="checkbox" /> Title</th>
                    <th className="border px-4 py-2 text-left">Image</th>
                    <th className="border px-4 py-2 text-left">Discription</th>
                    <th className="border px-4 py-2 text-left">Status</th>
                    <th className="border px-4 py-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className='hover:bg-[#2c3643] cursor-pointer'>
                    <td className="border px-4 py-2"><input type="checkbox" /> Alam</td>
                    <td className="border px-4 py-2">Img</td>
                    <td className="border px-4 py-2">Desc</td>
                    <td className="border px-4 py-2"><button className='bg-green-600 rounded p-2'>ACTIVE</button></td>
                    <td className="border px-4 py-2"><button className='bg-blue-600 rounded p-3'><FaPenAlt /></button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
