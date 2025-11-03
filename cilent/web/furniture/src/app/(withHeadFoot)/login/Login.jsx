"use client"
import { userData } from '@/app/redux/slice/userSlice';
import axios from 'axios'
import Link from 'next/link'
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { FaGoogle } from "react-icons/fa6";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { app } from '@/app/fireBaseConfig';

export default function Login() {
    let loginUser = useSelector((store) => store.user.user)
    let dispatch = useDispatch()
    let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL
    let [formVal, setFormVal] = useState(
        {
            "userEmail": "",
            "userPassword": ""
        }
    )

    let getValSetVal = (e) => {
        let obj = { ...formVal }
        let inputName = e.target.name
        let inputValue = e.target.value
        obj[inputName] = inputValue
        setFormVal(obj)
    }

    let login = (e) => {
        e.preventDefault()
        axios.post(`${apiBaseUrl}user-auth/login`, formVal)
            .then((apiRes) => apiRes.data)
            .then((finalData) => {
                console.log(finalData);
                if (finalData.status == 0) {
                    toast.error(finalData.msg)
                }
                if (finalData.status == 1) {
                    let userObj = {
                        id: finalData.user._id,
                        username: finalData.user.userName
                    }
                    console.log(userObj);
                    dispatch(userData({user:userObj,token:finalData.token}))
                }

            })
    }

    useEffect(() => {
        if (loginUser) {
            redirect('/my-dashboard')
        }
    }, [loginUser])

    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);

    let googleLogin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user
                let obj = {
                    userEmail:user.email,
                    userName:user.displayName,
                    userPhone:"",
                    userPassword:""
                }

                axios.post(`${apiBaseUrl}user-auth/google-login`, obj)
                .then((apiRes)=>apiRes.data)
                .then((finalData)=>{
                    console.log(finalData);
                    let {_id,userName} = (finalData.data);
                     let userObj = {
                        id:_id,
                        username: userName
                    }
                    dispatch(userData({user:userObj,token:finalData.token}))
                })

            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
            });
    }

    return (
        <div className='bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center min-h-screen'>
            <ToastContainer />
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-xs md:max-w-md w-full">
                <div id="login-form">
                    <h2 className="text-xl md:text-2xl font-bold text-center text-gray-800 mb-6">Log In</h2>
                    <center>
                        <img className='w-[200px] py-2' src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/company-profile/logo/cccfbdab-3bec-439f-88b9-5694698cd302-1670132652.png" alt="" />
                    </center>

                    <form onSubmit={login}>
                        <input type="email" onChange={getValSetVal} value={formVal.userEmail} name='userEmail' placeholder="Email" className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" required />
                        <input type="password" onChange={getValSetVal} value={formVal.userPassword} name='userPassword' placeholder="Password" className="w-full mb-6 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" required />
                        <button type="submit" className="w-full bg-purple-500 text-white py-2 md:py-3 rounded-lg font-semibold hover:bg-purple-600 transition duration-200 cursor-pointer">Log In</button>

                        <div className='my-2 flex gap-1 justify-center'>
                            <button type='button' onClick={googleLogin} className='bg-red-600 text-white p-1 rounded cursor-pointer'>
                                <FaGoogle />
                            </button>
                        </div>

                        <p className="text-center text-gray-600 mt-6">
                            Don’t have an account? <Link href={'/register'} className="text-purple-500 hover:underline">Sign Up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}
