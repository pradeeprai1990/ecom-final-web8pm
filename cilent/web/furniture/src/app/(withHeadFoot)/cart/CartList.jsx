"use client"
import { cartContext } from '@/app/MainContext';
import { fetchCartData } from '@/app/redux/slice/cartSlice';
import axios from 'axios';
import React, { useContext, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';

export default function CartList() {
 
    return (
        <CartLIstView />
    )
}

function CartLIstView() {
        let token = useSelector((store) => store.user.token)
    
        let apiBaseurl = process.env.NEXT_PUBLIC_APIBASEURL
      let dispatch = useDispatch()
    let { cart } = useSelector((store) => store.myCart)

    // let changeQty = (pid, qty) => {
    //     let changeMyQty = cart.filter((oldData) => {
    //         if (oldData.id == pid) {
    //             oldData['qty'] = qty
    //         }
    //         return oldData
    //     })

    //     setCart(changeMyQty)
    // }

    let deleteFromCart = (cartid) => {
        if (confirm("Are?")) {
            axios.post(`${apiBaseurl}cart/remove-cart`, { cartId:cartid }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((apiRes) => apiRes.data)
                .then((finaldata) => {
                    console.log(finaldata);
                    dispatch(fetchCartData())


                })
        }
    }

    return (
        <div className='max-w-[1320px] mx-auto py-5'>
            <table className="table-auto border-collapse border border-gray-400 w-full text-left">
                <thead className='bg-gray-100'>
                    <tr>
                        <th className='border border-gray-400 px-4 py-2'>Delete</th>
                        <th className='border border-gray-400 px-4 py-2'>Image</th>
                        <th className='border border-gray-400 px-4 py-2'>Product</th>
                        <th className='border border-gray-400 px-4 py-2'>Price</th>
                        <th className='border border-gray-400 px-4 py-2'>Quantity</th>
                        <th className='border border-gray-400 px-4 py-2'>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cart.map((data, index) => {
                            return (
                                <tr key={index}>
                                    <td className='border border-gray-400 px-4 py-2'><MdDelete className='text-red-700 text-2xl  cursor-pointer' onClick={(e) => deleteFromCart(data._id)} /></td>
                                    <td className='border border-gray-400 px-4 py-2'><img className='w-[25%]' src={data.productImg} alt="" /></td>
                                    <td className='border border-gray-400 px-4 py-2'>{data.title}</td>
                                    <td className='border border-gray-400 px-4 py-2'>{data.productPrice}</td>
                                    <td className='border border-gray-400 px-4 py-2'>Qty <input onChange={(e) => changeQty(data.id, e.target.value)} className='w-[50px] border-1 border-[#eee] p-2' type="number" value={data.productQty} /> </td>
                                    <td className='border border-gray-400 px-4 py-2'>{data.productPrice * data.productQty}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={5}></td>
                        <td><button className='bg-amber-500 p-2 my-5 rounded cursor-pointer text-white'>Update Cart</button></td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}
