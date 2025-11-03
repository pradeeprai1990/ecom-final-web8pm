"use client"
import React, { useEffect, useState } from 'react'
import Dashboard from './Dashboard'
import Order from './Order'
import Address from './Address'
import Profile from './Profile'
import ChangePassword from './ChangePassword'

export default function DashBoardList() {

    let [tab, setTab] = useState('dashboard')

    return (
        <div className='max-w-[1320px] mx-auto py-5'>
            <div className="md:flex">
                <ul className="flex-column space-y space-y-1 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
                    <li>
                        <button onClick={() => setTab('dashboard')} className={`w-[250px] inline-flex items-center px-4 py-3 text-white ${tab == 'dashboard' ? 'bg-amber-400' : 'bg-black'} rounded-lg active dark:bg-blue-600 cursor-pointer`} aria-current="page">
                            My Dashboard
                        </button>
                    </li>
                    <li>
                        <button onClick={() => setTab('order')} className={`w-[250px] inline-flex items-center px-4 py-3 text-white ${tab == 'order' ? 'bg-amber-400' : 'bg-black'} rounded-lg active dark:bg-blue-600 cursor-pointer`}>
                            Orders
                        </button>
                    </li>
                    <li>
                        <button onClick={() => setTab('address')} className={`w-[250px] inline-flex items-center px-4 py-3 text-white ${tab == 'address' ? 'bg-amber-400' : 'bg-black'} rounded-lg active dark:bg-blue-600 cursor-pointer`}>
                            Address
                        </button>
                    </li>
                    <li>
                        <button onClick={() => setTab('myprofile')} className={`w-[250px] inline-flex items-center px-4 py-3 text-white ${tab == 'myprofile' ? 'bg-amber-400' : 'bg-black'} rounded-lg active dark:bg-blue-600 cursor-pointer`}>
                            My Profile
                        </button>
                    </li>
                    <li>
                        <button onClick={() => setTab('changePass')} className={`w-[250px] inline-flex items-center px-4 py-3 text-white ${tab == 'changePass' ? 'bg-amber-400' : 'bg-black'} rounded-lg active dark:bg-blue-600 cursor-pointer`}>
                            Chnage Password
                        </button>
                    </li>
                </ul>
                <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
                    {
                        tab == 'dashboard' ?
                            <Dashboard />
                            : tab == 'order' ?
                            <Order />
                            : tab == 'address' ?
                            <Address />
                            : tab == 'myprofile' ?
                            <Profile />
                            : tab == 'changePass' ?
                            <ChangePassword />
                            :
                            <></>
                    }
                </div>
            </div>
        </div>
    )
}
