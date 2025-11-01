import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaPenAlt, FaSearch } from "react-icons/fa";
import { MdFilterAlt, MdFilterAltOff } from "react-icons/md";
import { Link } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import ResponsivePagination from 'react-responsive-pagination';

export default function SubCategoryView() {

  let [searchBox, setSearchBox] = useState(false)
  let [path, setPath] = useState('')
  let [subCatData, setSubCatData] = useState([])
  let [ids, setIds] = useState([])
  let [allChk, setAllChk] = useState(false)
  let [currentPage, setCurrentPage] = useState(1)
  let [totalPages, setTotalPages] = useState(1)
  let [limit, setLimit] = useState(3)

  let apiBaseUrl = import.meta.env.VITE_APIBASEURL

  let getSubCatData = () => {
    axios.get(`${apiBaseUrl}sub-category/view`,{
      params:{
        page:currentPage,
        limit
      }
    })
      .then((apiRes) => apiRes.data)
      .then((finalData) => {
        setPath(finalData.staticPath)
        setSubCatData(finalData.data);
        setTotalPages(finalData.totPage)
      })
  }

  let subCatDelete = () => {
    if (ids.length > 0) {
      axios.post(`${apiBaseUrl}sub-category/delete`, { ids })
        .then((apiRes) => apiRes.data)
        .then((finalData) => {
          if (finalData.status == 1) {
            toast.success(finalData.msg)
            getSubCatData()
          }
        })
    } else {
      toast.error("Kindly Check Alteast one checkbox")
    }
  }

  let subCatChangeStatus = () => {
    if (ids.length > 0) {
      axios.post(`${apiBaseUrl}sub-category/change-status`, { ids })
        .then((apiRes) => apiRes.data)
        .then((finalData) => {
          if (finalData.status == 1) {
            toast.success(finalData.msg)
            getSubCatData()
          }
        })
    } else {
      toast.error("Kindly Check Alteast one checkbox")
    }
  }

  let getChecked = (e) => {
    if (e.target.checked) {
      if (!ids.includes(e.target.value)) {
        setIds([...ids, e.target.value])
      }
    } else {
      let filtarData = ids.filter((val) => val != e.target.value)
      setIds(filtarData)
    }
  }

  let getAllChk = (e) => {
    if (e.target.checked) {
      let allData = subCatData.map((val) => val._id)
      setIds(allData)
    } else {
      setIds([])
    }
  }

  useEffect(() => {
    if (ids.length == subCatData.length && ids.length > 0) {
      setAllChk(true)
    } else {
      setAllChk(false)
    }
    console.log(ids);
  }, [ids])

  useEffect(() => {
    getSubCatData()
  }, [currentPage,limit])

  return (
    <>
      <div className='py-5'>
        <ToastContainer />
        <hr />
        <div className='p-3 text-[15px]'>
          Home / Sub Category / View
        </div>
        <hr />
        <div className='grid grid-cols-1 gap-5 pt-5 p-3'>
          <div className={`rounded-xl shadow-xl border-t-1 border-[#eee] p-5 bg-blend-hue`}>
            <div className="flex items-center justify-between mb-3">
              <div className='flex gap-3'>
                <h2 className="text-lg font-bold">View Sub Category</h2>
                <select className='border' onChange={(e)=>setLimit(e.target.value)}>
                  <option value="">Select limit</option>
                  <option value="3">3</option>
                  <option value="6">6</option>
                  <option value="9">9</option>
                  <option value="12">12</option>
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
                <button className='bg-green-600 rounded p-2 text-white cursor-pointer' onClick={subCatChangeStatus}>CHANGE STATUS</button>
                <button className='bg-red-600 rounded p-2 text-white cursor-pointer' onClick={subCatDelete}>DELETE</button>
              </span>
            </div>
            <div>
              <table className="table-auto w-full border bg-[#1f2937] text-white pb-5">
                <thead>
                  <tr className='bg-blue-950'>
                    <th className="border px-4 py-2 text-left">
                      <input checked={allChk} onChange={getAllChk} type="checkbox" />Parent Category Name
                    </th>
                    <th className="border px-4 py-2 text-left">Sub Category Name</th>
                    <th className="border px-4 py-2 text-left">Image</th>
                    <th className="border px-4 py-2 text-left">Order</th>
                    <th className="border px-4 py-2 text-left">Status</th>
                    <th className="border px-4 py-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    subCatData.length > 0 ?
                      (
                        subCatData.map((data, index) => {
                          return (
                            <tr key={index} className='hover:bg-[#2c3643] cursor-pointer'>
                              <td className="border px-4 py-2">
                                <input onChange={getChecked} checked={ids.includes(data._id)} value={data._id} type="checkbox" /> {data.categoryId.categoryName}
                              </td>
                              <td className="border px-4 py-2"> {data.subCategoryName}</td>
                              <td className="border px-4 py-2">
                                <img className='w-[15%]' src={path + data.subCategoryImg} alt="" />
                              </td>
                              <td className="border px-4 py-2">{data.subCategoryOrder}</td>
                              <td className="border px-4 py-2">
                                {
                                  data.subCategoryStatus ?
                                    <button className='bg-green-600 rounded p-2'>ACTIVE</button>
                                    :
                                    <button className='bg-red-600 rounded p-2'>INACTIVE</button>
                                }

                              </td>
                              <td className="border px-4 py-2">
                                <Link to={`/category/sub-category/edit/${data._id}`}>
                                  <button className='bg-blue-600 rounded p-3 cursor-pointer'><FaPenAlt /></button>
                                </Link>
                              </td>
                            </tr>
                          )
                        })
                      )
                      :
                      (
                        <tr>
                          <td colSpan={6} className='font-bold text-center'>Data Not Found..!</td>
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
