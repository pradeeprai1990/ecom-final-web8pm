import React, { useContext } from 'react'
import { Link } from 'react-router'
import { VscThreeBars } from "react-icons/vsc";
import { loginContext } from '../../context/MainContext';

export default function Header() {
  let {id,setId} = useContext(loginContext)
  return (
    <>
      <nav className="bg-[#1f2937] text-white">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link className='font-bold text-1xl text-white flex'> <VscThreeBars className='mt-1' /> &nbsp;&nbsp;Dashboard</Link>
          <div className="relative group">
          <div className="flex items-center space-x-2 cursor-pointer">
            <img
              src="https://i.pravatar.cc/40"
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-gray-300"
            />
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div
            className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg hidden group-hover:block"
          >
            <ul className="py-2 text-gray-700">
              <li>
                <Link to={'/profile'} className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
              </li>
              <li>
                <Link className="block px-4 py-2 hover:bg-gray-100" onClick={()=>setId('')}>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
        </div>
      </nav>
    </>
  )
}
