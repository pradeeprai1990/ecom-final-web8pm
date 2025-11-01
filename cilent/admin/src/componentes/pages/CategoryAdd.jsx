import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';

export default function CategoryAdd() {
   let navigate = useNavigate();
    
    let { id } = useParams();
    let [formVal, setFormVal] = useState(
        {
            categoryName: "",
            categoryOrder: ""
        }
    )

    let [image, setImage] = useState(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS91zs6wAwJLZ_H5DZOZymEpR52i50mL_m9JQ&s`)
    let apiBaseUrl = import.meta.env.VITE_APIBASEURL
    let categorySave = (e) => {
        e.preventDefault()
        let formValue = new FormData(e.target)
        if (id) {
            axios.put(`${apiBaseUrl}category/update/${id}`, formValue)
                .then((apiRes) => apiRes.data)
                .then((finalData) => {
                    if (finalData.status == 1) {
                        toast.success(finalData.msg)
                        setTimeout(()=>{
                            navigate("/category/view")    
                        },3000)
                    }

                })
        } else {
            axios.post(`${apiBaseUrl}category/create`, formValue)
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
    }

    let getValOrSetVal = (e) => {
        let obj = { ...formVal }
        let inputName = e.target.name
        let inputValue = e.target.value
        obj[inputName] = inputValue
        setFormVal(obj)
    }

    useEffect(() => {
        setFormVal({
            categoryName: "",
            categoryOrder: ""
        })
        setImage(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS91zs6wAwJLZ_H5DZOZymEpR52i50mL_m9JQ&s`)
        if (id) {
            axios.get(`${apiBaseUrl}category/detail/${id}`)
                .then((apiRes) => apiRes.data)
                .then((finalData) => {
                    let { categoryName, categoryOrder, categoryImage } = finalData.data
                    setFormVal({
                        categoryName,
                        categoryOrder
                    })
                    setImage(finalData.staticPath + categoryImage);
                })
        }
    }, [id])

    return (
        <>
            <div className='py-5'>
                <ToastContainer />
                <hr />
                <div className='p-3 text-[15px]'>
                    Home / Category / {id ? 'Edit' : 'Add'}
                </div>
                <hr />
                <div className='grid grid-cols-1 gap-5 pt-5 p-3'>
                    <div className={`rounded-xl shadow-xl border-t-1 border-[#eee] p-5 bg-blend-hue`}>
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-lg font-bold">{id ? 'Edit' : 'Add'} Category</h2>
                        </div>
                        <div>
                            <form onSubmit={categorySave}>
                                <div className="space-y-12">
                                    <div className="border-b border-gray-900/10 pb-12">
                                        Category Image
                                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">

                                            {/* Left Side - Image Upload */}
                                            <div className="sm:col-span-1 flex flex-col items-center justify-center border p-4 rounded-md">
                                                <label
                                                    htmlFor="image"
                                                    className="block text-sm font-medium text-gray-900 mb-2"
                                                >
                                                    <img className='w-[100%] h-[100%] cursor-pointer' src={image} alt="" />
                                                </label>

                                                <input
                                                    onChange={(e) => {
                                                        setImage(URL.createObjectURL(e.target.files[0]))
                                                    }}
                                                    id="image"
                                                    type="file"
                                                    name="categoryImage"
                                                    accept="image/*"
                                                    className="hidden w-full text-sm text-gray-900 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-600 file:px-3 file:py-2 file:text-white hover:file:bg-indigo-500"
                                                />
                                            </div>

                                            {/* Right Side - Input Fields */}
                                            <div className="sm:col-span-1">
                                                <div className="mb-4">
                                                    <label
                                                        htmlFor="category"
                                                        className="block text-sm font-medium text-gray-900"
                                                    >
                                                        Category Name
                                                    </label>
                                                    <input
                                                        onChange={getValOrSetVal}
                                                        value={formVal.categoryName}
                                                        id="category"
                                                        type="text"
                                                        name="categoryName"
                                                        autoComplete="off"
                                                        className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 
                       text-base text-gray-900 outline-1 outline-gray-300 
                       placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 
                       sm:text-sm"
                                                    />
                                                </div>

                                                <div>
                                                    <label
                                                        htmlFor="order"
                                                        className="block text-sm font-medium text-gray-900"
                                                    >
                                                        Order
                                                    </label>
                                                    <input
                                                        onChange={getValOrSetVal}
                                                        value={formVal.categoryOrder}
                                                        id="order"
                                                        type="number"
                                                        name="categoryOrder"
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
                                    <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer">{id ? 'Update' : 'Add'} Category</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
