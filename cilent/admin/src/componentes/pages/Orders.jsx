import React, { useState } from 'react'
import { FaPenAlt, FaSearch } from "react-icons/fa";
import { MdFilterAlt, MdFilterAltOff } from "react-icons/md";

export default function Orders() {

  let [searchBox, setSearchBox] = useState(false)

  return (
    <>
      <div className='py-5'>
        <hr />
        <div className='p-3 text-[15px]'>
          Home / Orders
        </div>
        <hr />
        <div className='grid grid-cols-1 gap-5 pt-5 p-3'>
          <div className={`rounded-xl shadow-xl border-t-1 border-[#eee] p-5 bg-blend-hue`}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold">View Why Choose Us</h2>
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
                    <th className="border px-4 py-2 text-left"> <input type="checkbox" /> Delete</th>
                    <th className="border px-4 py-2 text-left">Sl No.</th>
                    <th className="border px-4 py-2 text-left">Order Id</th>
                    <th className="border px-4 py-2 text-left">Name</th>
                    <th className="border px-4 py-2 text-left">Quantity</th>
                    <th className="border px-4 py-2 text-left">Price</th>
                    <th className="border px-4 py-2 text-left">Date</th>
                    <th className="border px-4 py-2 text-left">Status</th>
                    <th className="border px-4 py-2 text-left">View</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className='hover:bg-[#2c3643] cursor-pointer'>
                    <td className="border px-4 py-2"><input type="checkbox" /></td>
                    <td className="border px-4 py-2">1</td>
                    <td className="border px-4 py-2">Order Id</td>
                    <td className="border px-4 py-2">Name</td>
                    <td className="border px-4 py-2">Quantity</td>
                    <td className="border px-4 py-2">Price</td>
                    <td className="border px-4 py-2">Date</td>
                    <td className="border px-4 py-2">Status</td>
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
