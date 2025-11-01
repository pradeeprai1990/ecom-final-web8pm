import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaPenAlt, FaSearch } from "react-icons/fa";
import { MdFilterAlt, MdFilterAltOff } from "react-icons/md";
import { toast, ToastContainer } from 'react-toastify';
import ResponsivePagination from 'react-responsive-pagination';
import { Link } from 'react-router';

export default function SubSubCategoryView() {

  let apiBaseUrl = import.meta.env.VITE_APIBASEURL
  let [searchBox, setSearchBox] = useState(false)
  let [subSubCatData, setSubSubData] = useState([])
  let [path, setPath] = useState('')
  let [ids, setIds] = useState([])
  let [allChcked, setAllChecked] = useState(false)
  let [currentPage, setCurrentPage] = useState(1)
  let [totalPages, setTotalPages] = useState(0)
  let [limit, setLimit] = useState(3)


  let getSubSubCatData = () => {
    axios.get(`${apiBaseUrl}sub-sub-category/view`, {
      params: {
        page: currentPage,
        limit
      }
    })
      .then((apiRes) => apiRes.data)
      .then((finalData) => {
        setPath(finalData.staticPath)
        setSubSubData(finalData.data)
        setTotalPages(finalData.totPage)
      })
  }

  let subSubCatDelete = () => {
    if (ids.length > 0) {
      axios.post(`${apiBaseUrl}sub-sub-category/delete`, { ids })
        .then((apiRes) => apiRes.data)
        .then((finalData) => {
          if (finalData.status == 1) {
            toast.success(finalData.msg)
            setIds([])
            getSubSubCatData()
          }
        })
    } else {
      toast.error("Kindly Checked Atleate one checkbox")
    }
  }

  let subSubCatChangeStatus = () => {
    if (ids.length > 0) {
      axios.post(`${apiBaseUrl}sub-sub-category/change-status`, { ids })
        .then((apiRes) => apiRes.data)
        .then((finalData) => {
          if (finalData.status == 1) {
            toast.success(finalData.msg)
            setIds([])
            getSubSubCatData()
          }
        })
    } else {
      toast.error("Kindly Checked Atleate one checkbox")
    }
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

  let chkAll = (e) => {
    if (e.target.checked) {
      let allIds = subSubCatData.map((val) => val._id)
      setIds(allIds)
    } else {
      setIds([])
    }
  }

  useEffect(() => {
    if (ids.length == subSubCatData.length && ids.length > 0) {
      setAllChecked(true)
    } else {
      setAllChecked(false)
    }
    console.log(ids);
  }, [ids])

  useEffect(() => {
    getSubSubCatData()
  }, [currentPage, limit])

  return (
    <>
      <div className='py-5'>
        <ToastContainer />
        <hr />
        <div className='p-3 text-[15px]'>
          Home / Sub Sub Category / View
        </div>
        <hr />
        <div className='grid grid-cols-1 gap-5 pt-5 p-3'>
          <div className={`rounded-xl shadow-xl border-t-1 border-[#eee] p-5 bg-blend-hue`}>
            <div className="flex items-center justify-between mb-3">
              <div className='flex gap-3'>
                <h2 className="text-lg font-bold">Sub Sub Category</h2>
                <select className='border' onChange={(e) => setLimit(e.target.value)}>
                  <option value="">Select Limit</option>
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
                <button className='bg-green-600 rounded p-2 text-white cursor-pointer' onClick={subSubCatChangeStatus}>CHANGE STATUS</button>
                <button className='bg-red-600 rounded p-2 text-white cursor-pointer' onClick={subSubCatDelete}>DELETE</button>
              </span>
            </div>
            <div>
              <table className="table-auto w-full border bg-[#1f2937] text-white pb-5">
                <thead>
                  <tr className='bg-blue-950'>
                    <th className="border px-4 py-2 text-left">
                      <input onChange={chkAll} checked={allChcked} type="checkbox" /> Parent Category Name
                    </th>
                    <th className="border px-4 py-2 text-left">Sub Category Name</th>
                    <th className="border px-4 py-2 text-left">Sub Sub Category Name</th>
                    <th className="border px-4 py-2 text-left">Image</th>
                    <th className="border px-4 py-2 text-left">Order</th>
                    <th className="border px-4 py-2 text-left">Status</th>
                    <th className="border px-4 py-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    subSubCatData.length > 0 ?
                      (
                        subSubCatData.map((data, index) => {
                          return (
                            <tr key={index} className='hover:bg-[#2c3643] cursor-pointer'>
                              <td className="border px-4 py-2">
                                <input type="checkbox" checked={ids.includes(data._id)} value={data._id} onChange={getChecked} />
                                &nbsp;{data.parentCatId.categoryName}
                              </td>
                              <td className="border px-4 py-2"> {data.subCatId.subCategoryName}</td>
                              <td className="border px-4 py-2"> {data.subSubCatName}</td>
                              <td className="border px-4 py-2">
                                <img src={path + data.subSubCatImg} className='w-[22%]' alt="" />
                              </td>
                              <td className="border px-4 py-2">{data.subSubCatOrder}</td>
                              <td className="border px-4 py-2">
                                {
                                  data.subSubCatStatus ?
                                    <button className='bg-green-600 rounded p-2'>ACTIVE</button>
                                    :
                                    <button className='bg-red-600 rounded p-2'>INACTIVE</button>
                                }

                              </td>
                              <td className="border px-4 py-2">
                                <Link to={`/category/sub-sub-category/edit/${data._id}`}>
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
                          <td colSpan={7} className='text-center font-bold'>Data Not Found..!</td>
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
