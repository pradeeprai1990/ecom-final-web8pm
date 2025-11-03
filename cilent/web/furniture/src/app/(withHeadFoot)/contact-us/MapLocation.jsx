"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoHomeSharp, IoCallSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';

export default function MapLocation() {
    let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL
    let [adminData, setAdminData] = useState({})
    let [btnLoading, setBtnLoading] = useState(false)
    let [formVal, setFormVal] = useState(
        {
            name: "",
            email: "",
            shipping_mobile_no: "",
            mobile: "",
            subject: "",
            message: ""
        }
    )

    let saveContact = (e) => {
        e.preventDefault()
        setBtnLoading(true)
        axios.post(`${apiBaseUrl}user-auth/contact-save`, formVal)
            .then((apiRes) => apiRes.data)
            .then((finalData) => {
                console.log(finalData);
                if (finalData.status == 1) {
                    toast.success(finalData.msg)
                    setFormVal({
                        name: "",
                        email: "",
                        shipping_mobile_no: "",
                        mobile: "",
                        subject: "",
                        message: ""
                    })
                    setBtnLoading(false)
                }
            })

    }

    let getValSetVal = (e) => {
        let obj = { ...formVal }
        let inputName = e.target.name
        let inputValue = e.target.value
        obj[inputName] = inputValue
        setFormVal(obj)
    }

    let getAdminData = () => {
        axios.get(`${apiBaseUrl}user-auth/admin-contact-detail`)
            .then((apiRes) => apiRes.data)
            .then((finalData) => {
                setAdminData(finalData.data);
            })
    }

    useEffect(() => {
        getAdminData()
    }, [])
    return (
        <>
            <div className='max-w-[1320px] mx-auto py-5 h-[700px]'>
                <ToastContainer />
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m24!1m12!1m3!1d29306.380920588854!2d85.2393984!3d23.341229849999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m9!3e6!4m3!3m2!1d23.3604178!2d85.2343344!4m3!3m2!1d23.362151299999997!2d85.2242922!5e0!3m2!1sen!2sin!4v1756116974682!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="border-2 border-gray-300"
                ></iframe>
            </div>
            <div className='max-w-[1320px] mx-auto py-5 grid grid-cols-2 gap-5'>
                <div>
                    <h1 className='font-bold text-2xl'>Contact Us</h1>
                    <hr className='border-1 border-[#eee]' />

                    <h3 className='text-[13px] py-3 flex gap-2'> <IoHomeSharp className='text-[16px]' />
                        <b>
                            Address : Claritas est etiam processus dynamicus
                        </b>
                    </h3>

                    <hr className='border-1 border-[#eee]' />
                    <h3 className='text-[13px] py-3 flex gap-2'> <IoCallSharp className='text-[16px]' /> : <b>{adminData.phone}</b>
                    </h3>

                    <hr className='border-1 border-[#eee]' />
                    <h3 className='text-[13px] py-3 flex gap-2'> <MdEmail className='text-[16px]' /> : <b>{adminData.email}</b>
                    </h3>
                </div>
                <div>
                    <h1 className='font-bold text-2xl mb-3'>Tell us your question</h1>
                    <form onSubmit={saveContact}>
                        <div className="mb-5">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name *</label>
                            <input type="text" onChange={getValSetVal} name="name" value={formVal.name} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email *</label>
                            <input type="text" onChange={getValSetVal} name="email" value={formVal.email} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="shipping_mobile_no" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Shipping Mobile Number *</label>
                            <input type="text" onChange={getValSetVal} name="shipping_mobile_no" value={formVal.shipping_mobile_no} id="shipping_mobile_no" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="mobile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Mobile Number *</label>
                            <input type="text" onChange={getValSetVal} name="mobile" id="mobile" value={formVal.mobile} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject *</label>
                            <input type="text" onChange={getValSetVal} name="subject" value={formVal.subject} id="subject" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Message *</label>
                            <input type="text" onChange={getValSetVal} name="message" value={formVal.message} id="message" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>

                        <div className="mb-5">
                            <button className='bg-amber-500 p-2 rounded text-white cursor-pointer'>
                                <div className='flex gap-3'>
                                    SEND
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
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
