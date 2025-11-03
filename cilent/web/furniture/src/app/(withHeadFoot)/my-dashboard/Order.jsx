"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function Order() {
    let apiBaseurl = process.env.NEXT_PUBLIC_APIBASEURL
    let token = useSelector((store) => store.user.token)
    let getOrderData = () => {
        axios.post(`${apiBaseurl}cart/cart-data`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }

        })
            .then((apiRes) => apiRes.data)
            .then((finalData) => {
                console.log(finalData);
            })
    }

    useEffect(() => {
        getOrderData()
    }, [])

    return (
        <div>
            <h1 className='font-bold text-[20px]'>Order</h1>

            <table className="table-auto border-collapse border border-gray-400 w-full text-left">
                <thead className='bg-gray-100'>
                    <tr>
                        <th className='border border-gray-400 px-4 py-2'>Order</th>
                        <th className='border border-gray-400 px-4 py-2'>Date</th>
                        <th className='border border-gray-400 px-4 py-2'>Status</th>
                        <th className='border border-gray-400 px-4 py-2'>Total</th>
                        <th className='border border-gray-400 px-4 py-2'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='border border-gray-400 px-4 py-2'>1</td>
                        <td className='border border-gray-400 px-4 py-2'>May 10, 2025</td>
                        <td className='border border-gray-400 px-4 py-2'>Completed</td>
                        <td className='border border-gray-400 px-4 py-2'>Rs. 100 for 1 item</td>
                        <td className='border border-gray-400 px-4 py-2'>view</td>
                    </tr>
                    <tr>
                        <td className='border border-gray-400 px-4 py-2'>2</td>
                        <td className='border border-gray-400 px-4 py-2'>May 10, 2025</td>
                        <td className='border border-gray-400 px-4 py-2'>Completed</td>
                        <td className='border border-gray-400 px-4 py-2'>Rs. 100 for 1 item</td>
                        <td className='border border-gray-400 px-4 py-2'>view</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
