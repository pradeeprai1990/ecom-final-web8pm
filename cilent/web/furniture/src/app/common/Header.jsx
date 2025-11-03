"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { FaHeart,FaShoppingCart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { counterInc } from '../redux/slice/counterSlice';
import { logout } from '../redux/slice/userSlice';
import { redirect } from 'next/navigation';
import { fetchCartData } from '../redux/slice/cartSlice';

export default function Header() {
  let loginUser = useSelector((store)=>store.user.user)
  let [menu, setMenu] = useState(0)
  let [cartDiv, setCartDiv] = useState(false)

  let dispatch = useDispatch()
  
  useEffect(()=>{
    dispatch(fetchCartData())
  },[dispatch])

  let logOutUser = () => {
    dispatch(logout())
    redirect("/login")
  }

  
  let {cart,error,loading} = useSelector((myStore)=>myStore.myCart)
  
  
  
  
  return (
    <>
      <header>

        <div className={`fixed top-0 right-0 h-full w-85 bg-white shadow-lg z-50 ${cartDiv?'':'hidden'}`}>
          <div className='flex justify-between'>
            <h2 className="p-4 font-bold py-7"><FaShoppingCart className='text-[20px]' /></h2>
            <h2 className="p-4 font-bold"><span className='text-[30px] cursor-pointer' onClick={()=>setCartDiv(false)}>&times;</span></h2>
          </div>
          <hr className='border border-[#eee]' />
        </div>


        <div className='border-b-1 border-[#eee] py-2'>
          <div className='max-w-[1320px] mx-auto text-[14px] flex justify-between'>
            <div>
              Contact us 24/7 : +91-9234504642 / furnitureinfo@gmail.com
              {/* &nbsp;{count}&nbsp;<button onClick={()=>dispatch(counterInc())} className='p-1 bg-amber-300 cursor-pointer'>ADD 1</button> */}
            </div>
            {
              loginUser ?
               <div><span className='cursor-pointer' onClick={logOutUser}>Logout</span> &nbsp;{loginUser.username}</div>
              :
               <div><Link href={'/login'}>Login</Link> &nbsp; <Link href={'/register'}>Register</Link></div>
            }
           
          </div>
        </div>
        <div className='border-b-1 border-[#eee] p-3'>
          <div className='max-w-[1320px] mx-auto text-[13px] flex justify-between'>
            <div className='logo'>
              <Link href={'/'}>
                <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/company-profile/logo/cccfbdab-3bec-439f-88b9-5694698cd302-1670132652.png" alt="" />
              </Link>
            </div>
            <div className='gap-3 flex justify-center'>
              <input type="text" className='border border-[#eee] w-[280px]' />
              <div className='border border-[#eee] p-2'><FaHeart className='text-[20px]' /></div>

              <div className='flex justify-between gap-3 cursor-pointer' onClick={()=>setCartDiv(true)}>
                <div className='flex items-center border border-[#eee] p-2 gap-2'>
                  <FaCartShopping className='text-[20px]' /><div className='font-bold'>{cart.length}</div>
                  <div className='font-bold flex items-center gap-2 text-[13px]'>Rs.0.00 <span className='text-[15px]'><IoIosArrowDown /></span></div>
                </div>
              </div>
            </div>
          </div>
        </div>



        <nav className="bg-white border-gray-200 dark:bg-gray-900">
          <div className="flex flex-wrap items-center justify-center max-w-screen-xl mx-auto p-4">
            <div className="flex items-center md:order-2 space-x-1 md:space-x-2 rtl:space-x-reverse">
              <button data-collapse-toggle="mega-menu" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mega-menu" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                </svg>
              </button>
            </div>
            <div id="mega-menu" className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
              <ul className="flex flex-col mt-4 font-medium md:flex-row md:mt-0 md:space-x-8 rtl:space-x-reverse">
                <li>
                  <Link href={'/login'} className="block py-2 px-3 text-blue-600 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-blue-500 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700" aria-current="page">Home</Link>
                </li>
                <li>
                  <button onMouseOver={() => setMenu(1)} onMouseLeave={() => setMenu(0)} id="mega-menu-dropdown-button" data-dropdown-toggle="mega-menu-dropdown" className="flex items-center justify-between w-full py-2 px-3 font-medium text-gray-900 border-b border-gray-100 md:w-auto hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700 transition-transform">
                    Living <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                  </button>
                  <div onMouseOver={() => setMenu(1)} onMouseLeave={() => setMenu(0)} id="mega-menu-dropdown" className={`absolute z-10 ${menu == 1 ? '' : 'hidden'} grid w-auto grid-cols-2 text-sm bg-white border border-gray-100 rounded-lg shadow-md dark:border-gray-700 md:grid-cols-3 dark:bg-gray-700`}>
                    <div className="p-4 pb-0 text-gray-900 md:pb-4 dark:text-white">
                      <ul className="space-y-4" aria-labelledby="mega-menu-dropdown-button">
                        <li>
                          <Link href={'/product/126'} className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 font-bold">
                            Tables
                          </Link>
                        </li>
                        <li>
                          <Link href={'/product/126'} className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                            Side And End Tables
                          </Link>
                        </li>
                        <li>
                          <Link href={'/product/126'} className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                            Nest of Tables
                          </Link>
                        </li>
                        <li>
                          <Link href={'/product/126'} className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                            Coffee Table Sets
                          </Link>
                        </li>
                        <li>
                          <Link href={'/product/126'} className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                            Coffee Table
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="p-4 pb-0 text-gray-900 md:pb-4 dark:text-white">
                      <ul className="space-y-4">
                        <li>
                          <Link href={'/product/126'} className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 font-bold">
                            Living Storage
                          </Link>
                        </li>
                        <li>
                          <Link href={'/product/126'} className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                            Prayer Units
                          </Link>
                        </li>
                        <li>
                          <Link href={'/product/126'} className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                            Display unit
                          </Link>
                        </li>
                        <li>
                          <Link href={'/product/126'} className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                            Shoe Rack
                          </Link>
                        </li>
                        <li>
                          <Link href={'/product/126'} className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                            Chest of Drawers
                          </Link>
                        </li>
                        <li>
                          <Link href={'/product/126'} className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                            Cabinets and sideboard
                          </Link>
                        </li>
                        <li>
                          <Link href={'/product/126'} className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                            Book Shelves
                          </Link>
                        </li>
                        <li>
                          <Link href={'/product/126'} className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                            Tv Units
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="p-4">
                      <ul className="space-y-4">
                        <li>
                          <Link href={'/product/126'} className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 font-bold">
                            Mirror
                          </Link>
                        </li>
                        <li>
                          <Link href={'/product/126'} className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                            Wooden Mirror
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>

                <li>
                  <button onMouseOver={() => setMenu(2)} onMouseLeave={() => setMenu(0)} id="mega-menu-dropdown-button" data-dropdown-toggle="mega-menu-dropdown" className="flex items-center justify-between w-full py-2 px-3 font-medium text-gray-900 border-b border-gray-100 md:w-auto hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700">
                    Sofa <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                  </button>
                  <div onMouseOver={() => setMenu(2)} onMouseLeave={() => setMenu(0)} id="mega-menu-dropdown" className={`absolute z-10 ${menu == 2 ? '' : 'hidden'} grid w-auto grid-cols-2 text-sm bg-white border border-gray-100 rounded-lg shadow-md dark:border-gray-700 md:grid-cols-3 dark:bg-gray-700`}>
                    <div className="p-4 pb-0 text-gray-900 md:pb-4 dark:text-white">
                      <ul className="space-y-4" aria-labelledby="mega-menu-dropdown-button">
                        <li>
                          <Link href={'/product/126'} className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 font-bold">
                            Sofa Cum Bed
                          </Link>
                        </li>
                        <li>
                          <Link href={'/product/126'} className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                            Wooden Sofa Cum Bed
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="p-4 pb-0 text-gray-900 md:pb-4 dark:text-white">
                      <ul className="space-y-4">
                        <li>
                          <Link href={'/product/126'} className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 font-bold">
                            Sofa Sets
                          </Link>
                        </li>
                        <li>
                          <Link href={'/product/126'} className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                            L Shape Sofa
                          </Link>
                        </li>
                        <li>
                          <Link href={'/product/126'} className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                            1 Seater Sofa
                          </Link>
                        </li>
                        <li>
                          <Link href={'/product/126'} className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                            2 Seater Sofa
                          </Link>
                        </li>
                        <li>
                          <Link href={'/product/126'} className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                            3 Seater Sofa
                          </Link>
                        </li>
                        <li>
                          <Link href={'/product/126'} className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                            Wooden Sofa Sets
                          </Link>
                        </li>
                        <li>
                          <Link href={'/product/126'} className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                            Normal
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="p-4">
                      <ul className="space-y-4">
                        <li>
                          <Link href={'/product/126'} className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 font-bold">
                            Swing Jhula
                          </Link>
                        </li>
                        <li>
                          <Link href={'/product/126'} className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                            Wooden Jhula
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>

                <li>
                  <button onMouseOver={() => setMenu(3)} onMouseLeave={() => setMenu(0)} id="mega-menu-dropdown-button" data-dropdown-toggle="mega-menu-dropdown" className="flex items-center justify-between w-full py-2 px-3 font-medium text-gray-900 border-b border-gray-100 md:w-auto hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700">
                    Pages <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                  </button>
                  <div onMouseOver={() => setMenu(3)} onMouseLeave={() => setMenu(0)} id="mega-menu-dropdown" className={`absolute z-10 ${menu == 3 ? '' : 'hidden'} grid w-auto grid-cols-2 text-sm bg-white border border-gray-100 rounded-lg shadow-md dark:border-gray-700 md:grid-cols-3 dark:bg-gray-700`}>
                    <div className="p-4 pb-0 text-gray-900 md:pb-4 dark:text-white">
                      <ul className="space-y-4" aria-labelledby="mega-menu-dropdown-button">
                        <li>
                          <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                            About Us
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                            Cart
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                            Checkout
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                            Frequently Questions
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>

                <li>
                  <a href="#" className="block py-2 px-3 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700">Team</a>
                </li>
                <li>
                  <Link href={'/contact-us'} className="block py-2 px-3 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700">Contact</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}
