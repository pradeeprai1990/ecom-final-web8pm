import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { toast, ToastContainer } from 'react-toastify'

export default function SubSubCategoryAdd() {
    let { id } = useParams()
    let [image, setImage] = useState(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS91zs6wAwJLZ_H5DZOZymEpR52i50mL_m9JQ&s`)
    let navigate = useNavigate()

    let [parentCatData, setParentCatData] = useState([])
    let [subCatData, setSubCatData] = useState([])
    let [formVal, setFormVal] = useState({
        parentCatId: "",
        subCatId: "",
        subSubCatName: "",
        subSubCatOrder: ""

    })

    let apiBaseUrl = import.meta.env.VITE_APIBASEURL

    let subSubCatSave = (e) => {
        e.preventDefault()
        let formValue = new FormData(e.target)
        if (id) {
            axios.put(`${apiBaseUrl}sub-sub-category/update/${id}`, formValue)
                .then((apiRes) => apiRes.data)
                .then((finalData) => {
                    if (finalData.status == 1) {
                        toast.success(finalData.msg)
                        setTimeout(()=>{
                            navigate("/category/sub-sub-category/view")    
                        },3000)
                    }

                })
        } else {
            axios.post(`${apiBaseUrl}sub-sub-category/create`, formValue)
                .then((apiRes) => apiRes.data)
                .then((finalData) => {
                    if (finalData.status == 1) {
                        toast.success(finalData.msg)
                        e.target.reset()
                        setImage(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS91zs6wAwJLZ_H5DZOZymEpR52i50mL_m9JQ&s`)
                    }

                })
        }

    }

    let getParentCat = () => {
        axios.get(`${apiBaseUrl}sub-sub-category/parent-category`)
            .then((apiRes) => apiRes.data)
            .then((finalData) => {
                setParentCatData(finalData.data);

            })
    }

    let getSubCat = (pid) => {
        axios.get(`${apiBaseUrl}sub-sub-category/sub-category/${pid}`)
            .then((apiRes) => apiRes.data)
            .then((finalData) => {
                setSubCatData(finalData.data);
            })
    }

    let getValSetVal = (e) => {
        let obj = { ...formVal }
        let inputName = e.target.name
        let inputValue = e.target.value
        obj[inputName] = inputValue
        setFormVal(obj)
    }

    useEffect(() => {
        getParentCat()
    }, [])

    useEffect(() => {
        if (id) {
            axios.get(`${apiBaseUrl}sub-sub-category/detail/${id}`)
                .then((apiRes) => apiRes.data)
                .then((finalData) => {
                    console.log(finalData.data);
                    let { subSubCatImg, parentCatId, subCatId, subSubCatName, subSubCatOrder } = finalData.data
                    let pcid = parentCatId._id
                    let subCid = subCatId._id
                    setSubCatData([subCatId])
                    setImage(finalData.staticPath + subSubCatImg)
                    setFormVal({
                        subSubCatName,
                        subSubCatOrder,
                        parentCatId: pcid,
                        subCatId: subCid
                    })
                })
        }
    }, [id])

    return (
        <>
            <div className='py-5'>
                <ToastContainer />
                <hr />
                <div className='p-3 text-[15px]'>
                    Home / Sub Sub Category / {id ? 'Edit' : 'Add'}
                </div>
                <hr />
                <div className='grid grid-cols-1 gap-5 pt-5 p-3'>
                    <div className={`rounded-xl shadow-xl border-t-1 border-[#eee] p-5 bg-blend-hue`}>
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-lg font-bold">{id ? 'Edit' : 'Add'} Sub Sub Category</h2>
                        </div>
                        <div>
                            <form onSubmit={subSubCatSave}>
                                <div className="space-y-12">
                                    <div className="border-b border-gray-900/10 pb-12">
                                        Sub Sub Category Image
                                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">

                                            {/* Left Side - Image Upload */}
                                            <div className="sm:col-span-1 flex flex-col items-center justify-center border p-4 rounded-md">
                                                <label
                                                    htmlFor="subSubCatImg"
                                                    className="block text-sm font-medium text-gray-900 mb-2"
                                                >
                                                    <img className='cursor-pointer' src={image} alt="" />
                                                </label>
                                                <input
                                                    onChange={(e) => {
                                                        setImage(URL.createObjectURL(e.target.files[0]));

                                                    }}
                                                    id="subSubCatImg"
                                                    type="file"
                                                    name="subSubCatImg"
                                                    accept="image/*"
                                                    className="hidden w-full text-sm text-gray-900 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-600 file:px-3 file:py-2 file:text-white hover:file:bg-indigo-500"
                                                />
                                            </div>

                                            {/* Right Side - Input Fields */}
                                            <div className="sm:col-span-1">
                                                <div className="mb-4">
                                                    <label
                                                        htmlFor="parentCatId"
                                                        className="block text-sm font-medium text-gray-900"
                                                    >
                                                        Parent Category Name
                                                    </label>
                                                    <select onChange={(e) => getSubCat(e.target.value)} name="parentCatId" id="parentCatId" className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 
                       text-base text-gray-900 outline-1 outline-gray-300 
                       placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 
                       sm:text-sm">
                                                        <option value="">Select Parent Category</option>
                                                        {
                                                            parentCatData.map((data, index) => {
                                                                return (
                                                                    <option selected={formVal.parentCatId == data._id} key={index} value={data._id}>{data.categoryName}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </div>

                                                <div className="mb-4">
                                                    <label
                                                        htmlFor="subCatId"
                                                        className="block text-sm font-medium text-gray-900"
                                                    >
                                                        Sub Category Name
                                                    </label>
                                                    <select name="subCatId" id="subCatId" className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 
                       text-base text-gray-900 outline-1 outline-gray-300 
                       placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 
                       sm:text-sm">
                                                        <option value="">Select Sub Category</option>
                                                        {
                                                            subCatData.map((data, index) => {
                                                                return (
                                                                    <option selected={formVal.subCatId == data._id} key={index} value={data._id}>{data.subCategoryName}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </div>


                                                <div className="mb-4">
                                                    <label
                                                        htmlFor="subSubCatName"
                                                        className="block text-sm font-medium text-gray-900"
                                                    >
                                                        Sub Sub Category Name
                                                    </label>
                                                    <input
                                                        onChange={getValSetVal}
                                                        value={formVal.subSubCatName}
                                                        id="subSubCatName"
                                                        type="text"
                                                        name="subSubCatName"
                                                        autoComplete="off"
                                                        className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 
                       text-base text-gray-900 outline-1 outline-gray-300 
                       placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 
                       sm:text-sm"
                                                    />
                                                </div>

                                                <div>
                                                    <label
                                                        htmlFor="subSubCatOrder"
                                                        className="block text-sm font-medium text-gray-900"
                                                    >
                                                        Order
                                                    </label>
                                                    <input
                                                        onChange={getValSetVal}
                                                        value={formVal.subSubCatOrder}
                                                        id="subSubCatOrder"
                                                        type="number"
                                                        name="subSubCatOrder"
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
                                    <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer">{id ? 'Update' : 'Add'} Sub Sub Category</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
