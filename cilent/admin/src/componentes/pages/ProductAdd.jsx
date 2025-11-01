import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { productTypes } from '../data/data';
import { yesNo } from '../data/data';

export default function ProductAdd() {
    let apiBaseUrl = import.meta.env.VITE_APIBASEURL
    let [parentCatData, setParentCatData] = useState([])
    let [subCatData, setSubCatData] = useState([])
    let [subSubCatData, setSubSubCatData] = useState([])
    let [materialData, setMaterialData] = useState([])
    let [colorData, setColorData] = useState([])
    let [productImage, setProductImage] = useState(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS91zs6wAwJLZ_H5DZOZymEpR52i50mL_m9JQ&s`)
    let [backImage, setBackImage] = useState(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS91zs6wAwJLZ_H5DZOZymEpR52i50mL_m9JQ&s`)
    let [gallaryImage, setGallaryImage] = useState(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS91zs6wAwJLZ_H5DZOZymEpR52i50mL_m9JQ&s`)


    let productSave = (e) => {
        e.preventDefault()
        let formValue = new FormData(e.target)        
        axios.post(`${apiBaseUrl}product/create`, formValue)
            .then((apiRes) => apiRes.data)
            .then((finalData) => {
               if(finalData.status == 1){
                toast(finalData.msg)
                setProductImage(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS91zs6wAwJLZ_H5DZOZymEpR52i50mL_m9JQ&s`)
                setBackImage(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS91zs6wAwJLZ_H5DZOZymEpR52i50mL_m9JQ&s`)
                setGallaryImage(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS91zs6wAwJLZ_H5DZOZymEpR52i50mL_m9JQ&s`)
                e.target.reset()
               }
            })
    }

    let getSubCat = (pCatId) => {
        axios.get(`${apiBaseUrl}product/sub-category/${pCatId}`)
            .then((apiRes) => apiRes.data)
            .then((finalData) => {
                setSubCatData(finalData.data)
            })
    }

    let getSubSubCat = (subCatid) => {
        axios.get(`${apiBaseUrl}product/sub-sub-category/${subCatid}`)
            .then((apiRes) => apiRes.data)
            .then((finalData) => {
                setSubSubCatData(finalData.data);
            })
    }

    useEffect(() => {
        axios.get(`${apiBaseUrl}product/parent-category`)
            .then((apiRes) => apiRes.data)
            .then((finalData) => {
                setParentCatData(finalData.data);
            })

        axios.get(`${apiBaseUrl}product/material`)
            .then((apiRes) => apiRes.data)
            .then((finalData) => {
                setMaterialData(finalData.data);

            })

        axios.get(`${apiBaseUrl}product/color`)
            .then((apiRes) => apiRes.data)
            .then((finalData) => {
                setColorData(finalData.data);
            })
    }, [])

    return (
        <div className='py-5'>
            <ToastContainer />

            <hr />
            <div className='p-3 text-[15px]'>
                Home / Product / Add
            </div>
            <hr />
            <div className='grid grid-cols-1 gap-5 pt-5 p-3'>
                <div className={`rounded-xl shadow-xl border-t-1 border-[#eee] p-5 bg-blend-hue`}>
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-lg font-bold">Add Product</h2>
                    </div>
                    <div>
                        <form onSubmit={productSave}>
                            <div className="p-6 bg-white rounded-lg shadow-md">
                                <div className="grid grid-cols-12 gap-6">

                                    <div className="col-span-4 space-y-6">

                                        <div>
                                            <label className="block font-semibold mb-2">Product Image</label>

                                            <label
                                                htmlFor="productImage"
                                                className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md h-48 cursor-pointer"
                                            >
                                                <img className='w-[100%] h-[100%] cursor-pointer' src={productImage} alt="" />
                                                <input
                                                    onChange={(e) => {
                                                        setProductImage(URL.createObjectURL((e.target.files[0])))

                                                    }}
                                                    id="productImage"
                                                    type="file"
                                                    className="hidden"
                                                    name="productImage"
                                                />
                                            </label>
                                        </div>



                                        <div>
                                            <label className="block font-semibold mb-2">Back Image</label>
                                            <label
                                                htmlFor="backImage"
                                                className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md h-48 cursor-pointer"
                                            >
                                                <img className='w-[100%] h-[100%] cursor-pointer' src={backImage} alt="" />
                                                <input
                                                    name="backImage"
                                                    onChange={(e) => {
                                                        setBackImage(URL.createObjectURL((e.target.files[0])))

                                                    }}
                                                    id="backImage"
                                                    type="file"
                                                    className="hidden"
                                                />
                                            </label>
                                        </div>


                                        <div>
                                            <label className="block font-semibold mb-2">Gallery Image</label>
                                            <label
                                                htmlFor="gallaryImage"
                                                className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md h-48 cursor-pointer"
                                            >
                                                <img className='w-[100%] h-[100%] cursor-pointer' src={gallaryImage} alt="" />
                                                <input
                                                    onChange={(e) => {
                                                        setGallaryImage(URL.createObjectURL((e.target.files[0])))

                                                    }}
                                                    multiple
                                                    name="gallaryImage"
                                                    id="gallaryImage"
                                                    type="file"
                                                    className="hidden"
                                                />
                                            </label>
                                        </div>
                                    </div>


                                    <div className="col-span-8 grid grid-cols-2 gap-4">

                                        <div>
                                            <label className="block font-semibold mb-2">Product Name</label>
                                            <input
                                                name="productName"
                                                type="text"
                                                className="w-full border border-gray-300 rounded-md p-2"
                                                placeholder="Product Name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-semibold mb-2">Parent Category</label>
                                            <select name='parentCategory' onChange={(e) => getSubCat(e.target.value)} className="w-full border border-gray-300 rounded-md p-2">
                                                <option value="">Select Parent Category</option>
                                                {
                                                    parentCatData.map((data, index) => {
                                                        return (
                                                            <option key={index} value={data._id}>{data.categoryName}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>


                                        <div>
                                            <label className="block font-semibold mb-2">Sub Category</label>
                                            <select name='subCategory' onChange={(e) => getSubSubCat(e.target.value)} className="w-full border border-gray-300 rounded-md p-2">
                                                <option value="">Select Sub Category</option>
                                                {
                                                    subCatData.map((data, index) => {
                                                        return (
                                                            <option key={index} value={data._id}>{data.subCategoryName}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block font-semibold mb-2">Sub Sub Category</label>
                                            <select name='subSubCategory' className="w-full border border-gray-300 rounded-md p-2">
                                                <option value="">Select Sub Sub Category</option>
                                                {
                                                    subSubCatData.map((data, index) => {
                                                        return (
                                                            <option key={index} value={data._id}>{data.subSubCatName}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>


                                        <div>
                                            <label className="block font-semibold mb-2">Material</label>
                                            <select name='material[]' multiple className="w-full border border-gray-300 rounded-md p-2">
                                                <option value="">Select Material</option>
                                                {
                                                    materialData.map((data, index) => {
                                                        return (
                                                            <option key={index} value={data._id}>{data.materialName}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block font-semibold mb-2">Color</label>
                                            <select name='color[]' multiple className="w-full border border-gray-300 rounded-md p-2">
                                                <option value="">Select Color</option>
                                                {
                                                    colorData.map((data, index) => {
                                                        return (
                                                            <option key={index} value={data._id}>{data.colorName}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>


                                        <div>
                                            <label className="block font-semibold mb-2">Product Type</label>
                                            <select name='productType' className="w-full border border-gray-300 rounded-md p-2">
                                                <option value="">Select Product Type</option>
                                                {
                                                    productTypes.map((data, index) => {
                                                        return (
                                                            <option key={index} value={data._id}>{data.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block font-semibold mb-2">Is Best Selling</label>
                                            <select name='bestSelling' className="w-full border border-gray-300 rounded-md p-2">
                                                <option value="">Select Is Best Selling</option>
                                                {
                                                    yesNo.map((data, index) => {
                                                        return (
                                                            <option key={index} value={data._id}>{data.type}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>


                                        <div>
                                            <label className="block font-semibold mb-2">Is Top Rated</label>
                                            <select name='topRated' className="w-full border border-gray-300 rounded-md p-2">
                                                <option value="">Select Is Top Rated</option>
                                                {
                                                    yesNo.map((data, index) => {
                                                        return (
                                                            <option key={index} value={data._id}>{data.type}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block font-semibold mb-2">Is Upsell</label>
                                            <select name='upsell' className="w-full border border-gray-300 rounded-md p-2">
                                                <option value="">Select Upsell</option>
                                                {
                                                    yesNo.map((data, index) => {
                                                        return (
                                                            <option key={index} value={data._id}>{data.type}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>


                                        <div>
                                            <label className="block font-semibold mb-2">Actual Price</label>
                                            <input
                                                type="number"
                                                className="w-full border border-gray-300 rounded-md p-2"
                                                placeholder="Actual Price"
                                                name="actualPrice"
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-semibold mb-2">Sale Price</label>
                                            <input
                                                type="number"
                                                className="w-full border border-gray-300 rounded-md p-2"
                                                placeholder="Sale Price"
                                                name="salePrice"
                                            />
                                        </div>


                                        <div>
                                            <label className="block font-semibold mb-2">Total In Stocks</label>
                                            <input
                                                type="number"
                                                className="w-full border border-gray-300 rounded-md p-2"
                                                placeholder="Total In Stocks"
                                                name="totStock"
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-semibold mb-2">Order</label>
                                            <input
                                                type="number"
                                                className="w-full border border-gray-300 rounded-md p-2"
                                                placeholder="Order"
                                                name="order"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div className="mt-6 flex items-center gap-x-6">
                                <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer">Add Product</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}
