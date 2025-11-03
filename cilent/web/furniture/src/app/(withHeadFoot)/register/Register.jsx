"use client"

import axios from 'axios';
import { redirect } from "next/navigation";
import Link from 'next/link'
import React, { useState } from 'react'
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';

export default function Register() {
    let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL

    let [form, setForm] = useState(true)
    let [otpForm, setOtpForm] = useState(false)
    let [btnLoading, setBtnLoading] = useState(false)
    let [regFormData, setRegFormData] = useState(
        {
            userName: "",
            userEmail: "",
            userPhone: "",
            userPassword: "",
            otp: ""
        }
    )

    let getValOrSetVal = (e) => {
        let obj = { ...regFormData }
        let inputName = e.target.name
        let inputValue = e.target.value
        obj[inputName] = inputValue
        setRegFormData(obj)
    }

    let saveRegistartion = (e) => {
        setBtnLoading(true)
        e.preventDefault()
        axios.post(`${apiBaseUrl}user-auth/send-otp`, regFormData)
            .then((apiRes) => apiRes.data)
            .then((finalData) => {
                console.log(finalData);
                setOtpForm(true)
                setForm(false)
            })

    }

    let userCreste = (e) => {
        e.preventDefault()
        axios.post(`${apiBaseUrl}user-auth/create`, regFormData)
            .then((apiRes) => apiRes.data)
            .then((finalData) => {
                console.log(finalData);
                if(finalData.status == 0){
                    toast.error(finalData.msg)
                }else{
                    redirect('/login')
                }
            })
    }

    return (
        <div>
            <ToastContainer />
            <div className='bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center min-h-screen'>
                <div className="bg-white shadow-lg rounded-lg p-8 max-w-xs md:max-w-md w-full">
                    <div id="login-form">
                        <h2 className="text-xl md:text-2xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
                        <center>
                            <img className='w-[200px] py-2' src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/company-profile/logo/cccfbdab-3bec-439f-88b9-5694698cd302-1670132652.png" alt="" />
                        </center>
                        {
                            form &&
                            <form onSubmit={saveRegistartion}>
                                <input onChange={getValOrSetVal} value={regFormData.userName} name='userName' type="text" placeholder="Name" className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" required />


                                <input onChange={getValOrSetVal} value={regFormData.userEmail} name='userEmail' type="email" placeholder="Email" className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" required />


                                <input onChange={getValOrSetVal} value={regFormData.userPhone} name='userPhone' type="number" placeholder="Phone" className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" required />


                                <input onChange={getValOrSetVal} value={regFormData.userPassword} name='userPassword' type="password" placeholder="Password" className="w-full mb-6 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" required />

                                <button type="submit" className="w-full bg-purple-500 text-white py-2 md:py-3 rounded-lg font-semibold hover:bg-purple-600 transition duration-200 cursor-pointer">
                                    <div className='flex gap-3 justify-center'>
                                        <div> Sign Up</div>
                                        {
                                            btnLoading &&
                                            <div>
                                                <svg className="w-4 h-4 my-1 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                    <circle className="text-black opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                                                </svg>
                                            </div>
                                        }

                                    </div>


                                </button>
                                <div className='my-2 flex gap-1 justify-center'>
                                    <button className='bg-red-600 text-white p-1 rounded cursor-pointer'>
                                        <FaGoogle />
                                    </button>
                                    <button className='bg-blue-600 text-white p-1 rounded cursor-pointer'>
                                        <FaFacebook />
                                    </button>
                                    <button className='bg-black text-white p-1 rounded cursor-pointer'>
                                        <FaGithub />
                                    </button>
                                </div>

                                <p className="text-center text-gray-600 mt-6">
                                    Don’t have an account? <Link href={'/login'} className="text-purple-500 hover:underline">Log In</Link>
                                </p>
                            </form>
                        }

                        {
                            otpForm &&
                            <form onSubmit={userCreste}>
                                <input onChange={getValOrSetVal} value={regFormData.otp} name='otp' type="number" placeholder="Enter OTP" className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" required />

                                <button type="submit" className="w-full bg-green-500 text-white py-2 md:py-3 rounded-lg font-semibold hover:bg-purple-600 transition duration-200 cursor-pointer">Verify OTP</button>

                                <p className="text-center text-gray-600 mt-6">
                                    Don’t have an account? <Link href={'/login'} className="text-purple-500 hover:underline cursor-pointer">Log In</Link>
                                </p>
                            </form>

                        }

                    </div>
                </div>
            </div>
        </div>
    )
}
