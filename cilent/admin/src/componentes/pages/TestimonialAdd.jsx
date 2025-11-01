import React from 'react'

export default function TestimonialAdd() {
    return (
        <>
            <div className='py-5'>
                <hr />
                <div className='p-3 text-[15px]'>
                    Home / Testimonaial / Add
                </div>
                <hr />
                <div className='grid grid-cols-1 gap-5 pt-5 p-3'>
                    <div className={`rounded-xl shadow-xl border-t-1 border-[#eee] p-5 bg-blend-hue`}>
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-lg font-bold">Testimonaial</h2>
                        </div>
                        <div>
                            <form>
                                <div className="space-y-12">
                                    <div className="border-b border-gray-900/10 pb-12">
                                     Choose Image  
                                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                                            
                                            {/* Left Side - Image Upload */}
                                            <div className="sm:col-span-1 flex flex-col items-center justify-center border p-4 rounded-md">
                                                <label
                                                    htmlFor="image"
                                                    className="block text-sm font-medium text-gray-900 mb-2"
                                                >
                                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS91zs6wAwJLZ_H5DZOZymEpR52i50mL_m9JQ&s" alt="" />
                                                </label>
                                                <input
                                                    id="image"
                                                    type="file"
                                                    name="image"
                                                    accept="image/*"
                                                    className="hidden w-full text-sm text-gray-900 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-600 file:px-3 file:py-2 file:text-white hover:file:bg-indigo-500"
                                                />
                                            </div>

                                            {/* Right Side - Input Fields */}
                                            <div className="sm:col-span-1">
                                                <div className="mb-4">
                                                    <label
                                                        htmlFor="name"
                                                        className="block text-sm font-medium text-gray-900"
                                                    >
                                                        Name
                                                    </label>
                                                    <input
                                                        id="name"
                                                        type="text"
                                                        name="name"
                                                        autoComplete="off"
                                                        className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 
                       text-base text-gray-900 outline-1 outline-gray-300 
                       placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 
                       sm:text-sm"
                                                    />
                                                </div>

                                                <div className="mb-4">
                                                    <label
                                                        htmlFor="designation"
                                                        className="block text-sm font-medium text-gray-900"
                                                    >
                                                        Designation
                                                    </label>
                                                    <input
                                                        id="designation"
                                                        type="text"
                                                        name="designation"
                                                        autoComplete="off"
                                                        className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 
                       text-base text-gray-900 outline-1 outline-gray-300 
                       placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 
                       sm:text-sm"
                                                    />
                                                </div>

                                                <div className="mb-4">
                                                    <label
                                                        htmlFor="rating"
                                                        className="block text-sm font-medium text-gray-900"
                                                    >
                                                        Rating
                                                    </label>
                                                    <input
                                                        id="rating"
                                                        type="text"
                                                        name="rating"
                                                        autoComplete="off"
                                                        className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 
                       text-base text-gray-900 outline-1 outline-gray-300 
                       placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 
                       sm:text-sm"
                                                    />
                                                </div>

                                                <div className="mb-4">
                                                    <label
                                                        htmlFor="order"
                                                        className="block text-sm font-medium text-gray-900"
                                                    >
                                                        Order
                                                    </label>
                                                    <input
                                                        id="order"
                                                        type="text"
                                                        name="order"
                                                        autoComplete="off"
                                                        className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 
                       text-base text-gray-900 outline-1 outline-gray-300 
                       placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 
                       sm:text-sm"
                                                    />
                                                </div>

                                                <div className="mb-4">
                                                    <label
                                                        htmlFor="message"
                                                        className="block text-sm font-medium text-gray-900"
                                                    >
                                                        Message
                                                    </label>
                                                    <input
                                                        id="message"
                                                        type="text"
                                                        name="message"
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
                                    <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer">Add Testimonial</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
