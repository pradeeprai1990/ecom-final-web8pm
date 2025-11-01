import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { MdFilterAlt, MdFilterAltOff } from "react-icons/md";
import { FaPenAlt, FaSearch } from "react-icons/fa";
import axios from 'axios';
import ResponsivePagination from 'react-responsive-pagination';

export default function ProductView() {
    let apiBaseUrl = import.meta.env.VITE_APIBASEURL
    let [searchBox, setSearchBox] = useState(false)
    let [productData, setProductData] = useState([])
    let [ids, setIds] = useState([])
    let [allChk, setAllChk] = useState(false)
    let [currentPage, setCurrentPage] = useState(1)
    let [totalPages, setTotalPages] = useState(1)
    let [limit, setLimit] = useState(50)

    let getProductData = () => {
        axios.get(`${apiBaseUrl}product/view`,{
            params:{
                page:currentPage,
                limit
            }
        })
            .then((apiRes) => apiRes.data)
            .then((finalData) => {
                setProductData(finalData.data);
                setTotalPages(finalData.totalPage)
            })
    }

    let getChecked = (e) => {
        if (e.target.checked) {
            if (!ids.includes(e.target.value)) {
                setIds([...ids, e.target.value])
            }
        } else {
            let filterData = ids.filter((val) => val != e.target.value)
            setIds(filterData)
        }
    }

    let allChecked = (e) => {
        if (e.target.checked) {
            let allData = productData.map((val) => val._id)
            setIds(allData)
        } else {
            setIds([])
        }
    }

    let deleteProduct = () => {
        if (ids.length > 0) {
            axios.post(`${apiBaseUrl}product/delete`, { ids })
                .then((apiRes) => apiRes.data)
                .then((finalData) => {
                    if (finalData.status == 1) {
                        toast.success(finalData.msg)
                        getProductData()
                        setIds([])
                    }
                })
        }
    }

    let changeStatus = () => {
        if (ids.length > 0) {
            axios.put(`${apiBaseUrl}product/change-status`, { ids })
                .then((apiRes) => apiRes.data)
                .then((finalData) => {
                    if (finalData.status == 1) {
                        toast.success(finalData.msg)
                        getProductData()
                        setIds([])
                    }
                })
        }
    }

    useEffect(() => {
        if (ids.length == productData.length && ids.length > 0) {
            setAllChk(true)
        } else {
            setAllChk(false)
        }
        console.log(ids);
    }, [ids])

    useEffect(() => {
        getProductData()
    }, [currentPage,limit])

    return (
        <>
            <div className='py-5'>
                <ToastContainer />
                <hr />
                <div className='p-3 text-[15px]'>
                    Home / Product / View
                </div>
                <hr />
                <div className='grid grid-cols-1 gap-5 pt-5 p-3'>
                    <div className={`rounded-xl shadow-xl border-t-1 border-[#eee] p-5 bg-blend-hue`}>
                        <div className="flex items-center justify-between mb-3">
                            <div className='flex gap-3'>
                                <h2 className="text-lg font-bold">Product</h2>
                                <select className='border' onChange={(e)=>setLimit(e.target.value)}>
                                    <option value="">Select Limit</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </select>
                            </div>

                            <span className="flex gap-1">
                                {
                                    searchBox ?
                                        <>
                                            <input type="text" className='border-1' /><button className="bg-green-600 rounded p-2 text-white"><FaSearch /></button>
                                            <button className='bg-blue-600 rounded p-2 text-white  cursor-pointer'><MdFilterAltOff onClick={() => setSearchBox(false)} /></button>
                                        </>
                                        :
                                        <>
                                            <button className='bg-blue-600 rounded p-2 text-white  cursor-pointer'><MdFilterAlt onClick={() => setSearchBox(true)} /></button>
                                        </>
                                }
                                <button className='bg-green-600 rounded p-2 text-white cursor-pointer' onClick={changeStatus}>CHANGE STATUS</button>
                                <button className='bg-red-600 rounded p-2 text-white cursor-pointer' onClick={deleteProduct}>DELETE</button>
                            </span>
                        </div>
                        <div>
                            <table className="table-auto w-full border bg-[#1f2937] text-white pb-5">
                                <thead>
                                    <tr className='bg-blue-950'>
                                        <th className="border px-4 py-2 text-left">
                                            <input checked={allChk} type="checkbox" onChange={allChecked} /> Product Name
                                        </th>
                                        <th className="border px-4 py-2 text-left">Parent Cat</th>
                                        <th className="border px-4 py-2 text-left">Sub Cat</th>
                                        <th className="border px-4 py-2 text-left">Sub Sub Cat</th>
                                        <th className="border px-4 py-2 text-left">Status</th>
                                        <th className="border px-4 py-2 text-left">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        productData.length > 0 ?
                                            (
                                                productData.map((data, index) => {
                                                    return (
                                                        <tr key={index} className='hover:bg-[#2c3643] cursor-pointer'>
                                                            <td className="border px-4 py-2 w-[15%]">
                                                                <input checked={ids.includes(data._id)} type='checkbox' onChange={getChecked} value={data._id} />  {data.productName}
                                                            </td>
                                                            <td className="border px-4 py-2 w-[15%]">{data.parentCategory.categoryName}</td>
                                                            <td className="border px-4 py-2 w-[15%]">{data.subCategory.subCategoryName}</td>
                                                            <td className="border px-4 py-2 w-[15%]">{data.subSubCategory.subSubCatName}</td>
                                                            <td className="border px-4 py-2">
                                                                {
                                                                    data.status ?
                                                                        <button className='bg-green-600 rounded p-2'>ACTIVE</button>
                                                                        :
                                                                        <button className='bg-red-600 rounded p-2'>INACTIVE</button>
                                                                }

                                                            </td>
                                                            <td className="border px-4 py-2"><button className='bg-blue-600 rounded p-3'><FaPenAlt /></button></td>
                                                        </tr>
                                                    )
                                                })

                                            )
                                            :
                                            (
                                                <tr>
                                                    <td className='text-center font-bold' colSpan={6}>Data Not Found..!</td>
                                                </tr>
                                            )
                                    }

                                </tbody>
                            </table>
                            <div className='my-5'>
                                <ResponsivePagination
                                    current={currentPage}
                                    total={totalPages}
                                    onPageChange={setCurrentPage}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
