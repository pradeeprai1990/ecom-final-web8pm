import axios from 'axios'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';


export default function WhyChooseUsAdd() {
    let [imgae, setImage] = useState(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS91zs6wAwJLZ_H5DZOZymEpR52i50mL_m9JQ&s`)

    let apiBaseUrl = import.meta.env.VITE_APIBASEURL
    let whyChooseUsSave = (e) => {
        e.preventDefault()
        let formValue = new FormData(e.target)
        axios.post(`${apiBaseUrl}why-choose-us/create`, formValue)
            .then((apiRes) => apiRes.data)
            .then((finalData) => {
                console.log(finalData);
                if (finalData.status == 1) {
                    toast.success(finalData.msg)
                    e.target.reset()
                    setImage(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS91zs6wAwJLZ_H5DZOZymEpR52i50mL_m9JQ&s`)
                }
            })
    }

     return (
        <>
            <div className='py-5'>
                <ToastContainer />
                <hr />
                <div className='p-3 text-[15px]'>
                    Home / Why Choose Us / Add
                </div>
                <hr />
                <div className='grid grid-cols-1 gap-5 pt-5 p-3'>
                    <div className={`rounded-xl shadow-xl border-t-1 border-[#eee] p-5 bg-blend-hue`}>
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-lg font-bold">Add Why Choose Us</h2>
                        </div>
                        <div>
                            <form onSubmit={whyChooseUsSave}>
                                <div className="space-y-12">
                                    <div className="border-b border-gray-900/10 pb-12">
                                     Choose Image  
                                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                                            
                                            {/* Left Side - Image Upload */}
                                            <div className="sm:col-span-1 flex flex-col items-center justify-center border p-4 rounded-md">
                                                <label
                                                    htmlFor="whyChooseUsImg"
                                                    className="block text-sm font-medium text-gray-900 mb-2"
                                                >
                                                    <img className='cursor-pointer' src={imgae} alt="" />
                                                </label>
                                                <input
                                                    onChange={(e)=>{
                                                        setImage(URL.createObjectURL(e.target.files[0]));
                                                    }}
                                                    id="whyChooseUsImg"
                                                    type="file"
                                                    name="img"
                                                    accept="image/*"
                                                    className="hidden w-full text-sm text-gray-900 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-600 file:px-3 file:py-2 file:text-white hover:file:bg-indigo-500"
                                                />
                                            </div>

                                            {/* Right Side - Input Fields */}
                                            <div className="sm:col-span-1">
                                                <div className="mb-4">
                                                    <label
                                                        htmlFor="whyChooseUsTitle"
                                                        className="block text-sm font-medium text-gray-900"
                                                    >
                                                        Title
                                                    </label>
                                                    <input
                                                        id="whyChooseUsTitle"
                                                        type="text"
                                                        name="whyChooseUsTitle"
                                                        autoComplete="off"
                                                        className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 
                       text-base text-gray-900 outline-1 outline-gray-300 
                       placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 
                       sm:text-sm"
                                                    />
                                                </div>

                                                <div className="mb-4">
                                                    <label
                                                        htmlFor="whyChooseUsOrder"
                                                        className="block text-sm font-medium text-gray-900"
                                                    >
                                                        Order
                                                    </label>
                                                    <input
                                                        id="whyChooseUsOrder"
                                                        type="number"
                                                        name="whyChooseUsOrder"
                                                        autoComplete="off"
                                                        className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 
                       text-base text-gray-900 outline-1 outline-gray-300 
                       placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 
                       sm:text-sm"
                                                    />
                                                </div>

                                                <div>
                                                    <label
                                                        htmlFor="whyChooseUsDesc"
                                                        className="block text-sm font-medium text-gray-900"
                                                    >
                                                        Description
                                                    </label>
                                                    <input
                                                        id="whyChooseUsDesc"
                                                        type="text"
                                                        name="whyChooseUsDesc"
                                                        autoComplete="off"
                                                        className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 
                       text-base text-gray-900 outline-1 outline-gray-300 
                       placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 
                       sm:text-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="mt-6 flex items-center gap-x-6">
                                    <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer">Add Why Choose Us</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
