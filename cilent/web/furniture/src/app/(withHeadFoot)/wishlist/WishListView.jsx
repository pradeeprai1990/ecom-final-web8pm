import React from 'react'
import { MdDelete } from "react-icons/md";

export default function WishListView() {
  return (
    <div className='max-w-[1320px] mx-auto py-5'>
      <table className="table-auto border-collapse border border-gray-400 w-full text-left">
        <thead className='bg-gray-100'>
          <tr>
            <th className='border border-gray-400 px-4 py-2'>Delete</th>
            <th className='border border-gray-400 px-4 py-2'>Image</th>
            <th className='border border-gray-400 px-4 py-2'>Product</th>
            <th className='border border-gray-400 px-4 py-2'>Price</th>
            <th className='border border-gray-400 px-4 py-2'>Stock Status</th>
            <th className='border border-gray-400 px-4 py-2'>Add To Cart</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='border border-gray-400 px-4 py-2'><MdDelete className='text-red-700 text-2xl  cursor-pointer' /></td>
            <td className='border border-gray-400 px-4 py-2'><img className='w-[25%]' src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1620666061907Gloria%20Shoe%20Racks_.jpg" alt="" /></td>
            <td className='border border-gray-400 px-4 py-2'>Gloria Shoe Racks</td>
            <td className='border border-gray-400 px-4 py-2'>Rs. 2,900</td>
            <td className='border border-gray-400 px-4 py-2'>Out of Stock</td>
            <td className='border border-gray-400 px-4 py-2'><button className='bg-amber-500 rounded p-2 text-white cursor-pointer'>Out of Stock</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
