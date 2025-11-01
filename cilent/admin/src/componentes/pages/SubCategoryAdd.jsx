import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';

export default function SubCategoryAdd() {
    let { id } = useParams()
    let navigate = useNavigate()


    let [img, setImg] = useState(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS91zs6wAwJLZ_H5DZOZymEpR52i50mL_m9JQ&s`)

    let apiBaseUrl = import.meta.env.VITE_APIBASEURL

    let [catData, setCatData] = useState([])
    let [formValue, setFormValue] = useState({
        categoryId: "",
        subCategoryName: "",
        subCategoryOrder: ""
    })

    let saveSubCat = (e) => {
        e.preventDefault()
        let FormValue = new FormData(e.target)
        if (id) {
            axios.put(`${apiBaseUrl}sub-category/update/${id}`, FormValue)
                .then((apiRes) => apiRes.data)
                .then((finalData) => {
                    if (finalData.status == 1) {
                        toast.success(finalData.msg)
                        setTimeout(() => {
                            navigate("/category/sub-category/view")
                        }, 3000)

                    }
                })
        } else {
            axios.post(`${apiBaseUrl}sub-category/create`, FormValue)
                .then((apiRes) => apiRes.data)
                .then((finalData) => {
                    if (finalData.status == 1) {
                        toast.success(finalData.msg)
                        e.target.reset()
                        setImg(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS91zs6wAwJLZ_H5DZOZymEpR52i50mL_m9JQ&s`)
                    }
                })
        }

    }

    let getCatName = () => {
        axios.get(`${apiBaseUrl}sub-category/category`)
            .then((apiRes) => apiRes.data)
            .then((finalData) => {
                setCatData(finalData.data);
            })
    }

    let getValueOrSetValue = (e) => {
        let obj = { ...formValue }
        let inputName = e.target.name
        let inputValue = e.target.value
        obj[inputName] = inputValue
        setFormValue(obj)
    }

    useEffect(() => {
        getCatName()
    }, [])

    useEffect(() => {
        setFormValue({
            categoryId: '',
            subCategoryName: '',
            subCategoryOrder: ''
        })

        setImg(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS91zs6wAwJLZ_H5DZOZymEpR52i50mL_m9JQ&s`)

        if (id) {
            axios.get(`${apiBaseUrl}sub-category/detail/${id}`)
                .then((apiRes) => apiRes.data)
                .then((finalData) => {
                    console.log(finalData.data);
                    let { categoryId, subCategoryName, subCategoryOrder, subCategoryImg } = finalData.data
                    setFormValue({
                        categoryId,
                        subCategoryName,
                        subCategoryOrder
                    })

                    setImg(finalData.staticPath + subCategoryImg)
                })
        }


    }, [id])

    return (
        <>
            <div className='py-5'>
                <ToastContainer />
                <hr />
                <div className='p-3 text-[15px]'>
                    Home / Sub Category / {id ? 'Edit' : 'Add'}
                </div>
                <hr />
                <div className='grid grid-cols-1 gap-5 pt-5 p-3'>
                    <div className={`rounded-xl shadow-xl border-t-1 border-[#eee] p-5 bg-blend-hue`}>
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-lg font-bold">{id ? 'Edit' : 'Add'} Sub Category</h2>
                        </div>
                        <div>
                            <form onSubmit={saveSubCat}>
                                <div className="space-y-12">
                                    <div className="border-b border-gray-900/10 pb-12">
                                        Sub Category Image
                                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">

                                            {/* Left Side - Image Upload */}
                                            <div className="sm:col-span-1 flex flex-col items-center justify-center border p-4 rounded-md">
                                                <label
                                                    htmlFor="subCategoryImg"
                                                    className="block text-sm font-medium text-gray-900 mb-2"
                                                >
                                                    <img className='cursor-pointer' src={img} alt="" />
                                                </label>
                                                <input
                                                    onChange={(e) => {
                                                        setImg(URL.createObjectURL(e.target.files[0]));

                                                    }}
                                                    id="subCategoryImg"
                                                    type="file"
                                                    name="subCategoryImg"
                                                    accept="image/*"
                                                    className="hidden w-full text-sm text-gray-900 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-600 file:px-3 file:py-2 file:text-white hover:file:bg-indigo-500"
                                                />
                                            </div>

                                            {/* Right Side - Input Fields */}
                                            <div className="sm:col-span-1">
                                                <div className="mb-4">
                                                    <label
                                                        htmlFor="categoryId"
                                                        className="block text-sm font-medium text-gray-900"
                                                    >
                                                        Parent Category Name
                                                    </label>
                                                    <select onChange={getValueOrSetValue} name="categoryId" id="categoryId" className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 
                       text-base text-gray-900 outline-1 outline-gray-300 
                       placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 
                       sm:text-sm">
                                                        <option value="">Select Category</option>
                                                        {
                                                            catData.map((data, index) => {
                                                                return (
                                                                    <option selected={data._id == formValue.categoryId} key={index} value={data._id}>{data.categoryName}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </div>


                                                <div className="mb-4">
                                                    <label
                                                        htmlFor="subCategoryName"
                                                        className="block text-sm font-medium text-gray-900"
                                                    >
                                                        Sub Category Name
                                                    </label>
                                                    <input
                                                        onChange={getValueOrSetValue}
                                                        value={formValue.subCategoryName}
                                                        id="subCategoryName"
                                                        type="text"
                                                        name="subCategoryName"
                                                        autoComplete="off"
                                                        className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 
                       text-base text-gray-900 outline-1 outline-gray-300 
                       placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 
                       sm:text-sm"
                                                    />
                                                </div>

                                                <div>
                                                    <label
                                                        htmlFor="subCategoryOrder"
                                                        className="block text-sm font-medium text-gray-900"
                                                    >
                                                        Order
                                                    </label>
                                                    <input
                                                        onChange={getValueOrSetValue}
                                                        value={formValue.subCategoryOrder}
                                                        id="subCategoryOrder"
                                                        type="number"
                                                        name="subCategoryOrder"
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
                                    <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer">{id ? 'Update' : 'Add'} Sub Category</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
