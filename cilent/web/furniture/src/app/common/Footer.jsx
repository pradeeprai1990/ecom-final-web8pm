"use client"
import Link from 'next/link'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { counterDec } from '../redux/slice/counterSlice'

export default function Footer() {
 let dispatch = useDispatch()
  return (
    <footer className="bg-white dark:bg-gray-900">
      {/* <button onClick={()=>dispatch(counterDec())} className='p-1 bg-amber-300 cursor-pointer'>MINUS 1</button> */}
      <div className="max-w-[1320px] mx-auto text-[14px] justify-between">
        <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Contact Us</h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-4">
                <a href="#" className=" hover:underline">Address: Claritas est etiam processus dynamicus</a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">Phone: 9234504642</a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">Email: furnitureinfo@gmail.com</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Information</h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-4">
                <a href="#" className="hover:underline">Discord Server</a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">About Us</a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">Contact Us</a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">Frequently Questions</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">My Account</h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-4">
                <Link href={'/my-dashboard'} className="hover:underline">My Dashboard</Link>
              </li>
              <li className="mb-4">
                <Link href={'/wishlist'} className="hover:underline">Wishlist</Link>
              </li>
              <li className="mb-4">
                <Link href={'/cart'} className="hover:underline">Cart</Link>
              </li>
              <li className="mb-4">
                <Link href={'/checkout'} className="hover:underline">Checkout</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Top Rated Products</h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-4">
                <div className='flex gap-2'>
                  <div>
                    <img className='w-25' src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1621171973378Isaac%20Chest%20of%20Drawer_.jpg" alt="" />
                  </div>
                  <div className='py-1 p-2'>
                    Chest Of Drawers
                    <h4 className='font-bold'>Isaac Chest of Drawer</h4>
                    <h4 className='font-bold'><span className='line-through'>Rs. 32,000</span> Rs. 25,000</h4>
                  </div>
                </div>
              </li>
              <hr />
              <br />
              <li className="mb-4">
                <div className='flex gap-2'>
                  <div>
                    <img className='w-25' src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1615277326496Sapien%20Sofa%20Cum%20Bed__.jpg" alt="" />
                  </div>
                  <div className='py-1 p-2'>
                    Chest Of Drawers
                    <h4 className='font-bold'>Isaac Chest of Drawer</h4>
                    <h4 className='font-bold'><span className='line-through'>Rs. 32,000</span> Rs. 25,000</h4>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center border-t-1 border-b-1 py-5 border-[#eee]">
        <ul className="flex space-x-6">
          <li>Home</li>
          <li>Online Store</li>
          <li>Privacy Policy</li>
          <li>Terms of Use</li>
        </ul>
      </div>

      <div className='max-w-[1320px] mx-auto text-[14px] my-5'><center>All Rights Reserved By Furniture | © 2025</center></div>
    </footer>

  )
}
