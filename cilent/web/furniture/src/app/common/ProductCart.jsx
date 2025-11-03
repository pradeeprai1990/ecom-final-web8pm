"use client"
import Link from 'next/link';
import React, { useContext } from 'react'
import { FaHeart } from "react-icons/fa";
import { cartContext } from '../MainContext';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartData } from '../redux/slice/cartSlice';
import axios from 'axios';
import { redirect } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import { TotpSecret } from 'firebase/auth';

export default function ProductCart({ data, imgPath }) {
    //let {cart, setCart} = useContext(cartContext)
    // let cart = useSelector((myStore)=>myStore.myCart.cart)
    // let chkItemInCart = cart.find((item)=>item.id == data.id)
    let apiBaseurl = process.env.NEXT_PUBLIC_APIBASEURL
    let token = useSelector((store) => store.user.token)



    let dispatch = useDispatch()

    let cart = useSelector((store) => store.myCart.cart)




    let chkItemInCart = cart.find((obj) => obj.productId == data._id)//Data single Object
    let addToCart = () => {
        if (!token) {
            alert("Kindly Login First..!")
            return redirect("/login");
        }
        let cartObj = {
            pid: data._id,
            category: data.parentCategory._id,
            title: data.productName,
            img: imgPath + data.productImage,
            qty: 1,
            price: data.salePrice
        }


        axios.post(`${apiBaseurl}cart/add-to-cart`, cartObj, {
            headers: {
                Authorization: `Bearer ${token}`
            }

        })
            .then((apiRes) => apiRes.data)
            .then((finaldata) => {
                console.log(finaldata);
                dispatch(fetchCartData())


            })
        // dispatch(addCart(cartObj))
        //setCart([cartObj,...cart])

    }


    let removeCart = () => {

        if (confirm("Are?")) {
            axios.post(`${apiBaseurl}cart/remove-cart`, { cartId: chkItemInCart._id }, {
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

    // let deleteData = () => {
    //     dispatch(deleteCart({id:data.id}))
    // }

    return (
        <div className='shadow-lg'>
            <Link href={`/product/${data.slug}`}>
                <img src={imgPath + data.productImage} alt="" />
                <h4 className='py-3 text-center'>{data.productName}</h4>
                <h3 className='font-bold text-center py-2'>{data.parentCategory.categoryName
                }</h3>
                <hr className='my-4 border-0 h-0.5 bg-[#eee]' />
                <div className='py-3 text-center'>
                    <span className='line-through'>Rs. {data.actualPrice}</span><span> Rs. {data.salePrice}</span>
                </div>
            </Link>
            <div className='py-3 flex justify-center gap-1'>
                <button className='bg-[#eee] px-2 p-1 cursor-pointer'><FaHeart /></button>
                {
                    chkItemInCart ?
                        <button onClick={removeCart} className='bg-[#e10c0c] px-2 p-1 cursor-pointer text-white'>Remove From Card</button>
                        :
                        <button className='bg-[#eee] px-2 p-1 cursor-pointer' onClick={addToCart}>Add To Card</button>
                }

            </div>
        </div>
    )
}
