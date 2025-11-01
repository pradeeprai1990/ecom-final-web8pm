import axios from 'axios'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

export default function SliderAdd() {
    let [image, setImage] = useState(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS91zs6wAwJLZ_H5DZOZymEpR52i50mL_m9JQ&s`)
    let apiBaseUrl = import.meta.env.VITE_APIBASEURL
    let sliderSave = (e) => {
        e.preventDefault()
        let formValue = new FormData(e.target)
        axios.post(`${apiBaseUrl}slider/create`, formValue)
            .then((apiRes) => apiRes.data)
            .then((finalData) => {
                console.log(finalData);
                if(finalData.status == 1){
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
                    Home / Slider / Add
                </div>
                <hr />
                <div className='grid grid-cols-1 gap-5 pt-5 p-3'>
                    <div className={`rounded-xl shadow-xl border-t-1 border-[#eee] p-5 bg-blend-hue`}>
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-lg font-bold">Slider</h2>
                        </div>
                        <div>
                            <form onSubmit={sliderSave}>
                                <div className="space-y-12">
                                    <div className="border-b border-gray-900/10 pb-12">
                                        Choose Image
                                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">

                                            {/* Left Side - Image Upload */}
                                            <div className="sm:col-span-1 flex flex-col items-center justify-center border p-4 rounded-md">
                                                <label
                                                    htmlFor="sliderImg"
                                                    className="block text-sm font-medium text-gray-900 mb-2"
                                                >
                                                    <img src={image} alt="" className='cursor-pointer' />
                                                </label>
                                                <input
                                                    onChange={(e) => {
                                                        setImage(URL.createObjectURL(e.target.files[0]));

                                                    }}
                                                    id="sliderImg"
                                                    type="file"
                                                    name="sliderImg"
                                                    accept="image/*"
                                                    className="hidden w-full text-sm text-gray-900 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-600 file:px-3 file:py-2 file:text-white hover:file:bg-indigo-500"
                                                />
                                            </div>

                                            {/* Right Side - Input Fields */}
                                            <div className="sm:col-span-1">
                                                <div className="mb-4">
                                                    <label
                                                        htmlFor="sliderTitle"
                                                        className="block text-sm font-medium text-gray-900"
                                                    >
                                                        Title
                                                    </label>
                                                    <input
                                                        id="sliderTitle"
                                                        type="text"
                                                        name="sliderTitle"
                                                        autoComplete="off"
                                                        className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 
                       text-base text-gray-900 outline-1 outline-gray-300 
                       placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 
                       sm:text-sm"
                                                    />
                                                </div>

                                                <div className="mb-4">
                                                    <label
                                                        htmlFor="sliderOrder"
                                                        className="block text-sm font-medium text-gray-900"
                                                    >
                                                        Order
                                                    </label>
                                                    <input
                                                        id="sliderOrder"
                                                        type="number"
                                                        name="sliderOrder"
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
                                    <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer">Add Slider</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
