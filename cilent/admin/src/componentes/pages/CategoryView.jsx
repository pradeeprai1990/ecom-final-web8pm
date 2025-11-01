import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaPenAlt, FaSearch } from "react-icons/fa";
import { MdFilterAlt, MdFilterAltOff } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import ResponsivePagination from 'react-responsive-pagination';
import { Link } from 'react-router';

export default function CategoryView() {
  let [searchBox, setSearchBox] = useState(false)
  let [categoryData, setCategoryData] = useState([])
  let [staticPath, setStaticPath] = useState('')
  let [ids, setIds] = useState([])
  let [allChk, setAllChk] = useState(false)
  let [currentPage, setCurrentPage] = useState(1)
  let [totalPages, setTotalPages] = useState(3)
  let [limit, setLimit] = useState(2)

  let apiBaseUrl = import.meta.env.VITE_APIBASEURL
  let getCategoryData = () => {
    axios.get(`${apiBaseUrl}category/view`, {
      params: {
        page: currentPage,
        limit
      }
    })
      .then((apiRes) => apiRes.data)
      .then((finalData) => {
        setTotalPages(finalData.totPage)
        setCategoryData(finalData.data);
        setStaticPath(finalData.staticPath)
        console.log(finalData);

      })
  }

  let categoryDelete = () => {
    if (ids.length > 0) {
      axios.post(`${apiBaseUrl}category/delete`, { ids })
        .then((apiRes) => apiRes.data)
        .then((finalData) => {
          console.log(finalData);

          if (finalData.status == 1) {
            toast.success(finalData.msg)
          }
          getCategoryData()
        })
    }
  }

  let categoryChangeStatus = () => {
    if (ids.length > 0) {
      axios.post(`${apiBaseUrl}category/change-status`, { ids })
        .then((apiRes) => apiRes.data)
        .then((finalData) => {
          console.log(finalData);
          if (finalData.status == 1) {
            toast.success(finalData.msg)
          }
          setIds([])
          getCategoryData()
        })
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

  let allChecked = (e) => {
    if (e.target.checked) {
      let allIds = categoryData.map((val) => val._id)
      setIds(allIds)

    } else {
      setIds([])

    }
  }

  useEffect(() => {
    if (categoryData.length == ids.length && ids.length > 0) {
      setAllChk(true)
    } else {
      setAllChk(false)
    }
    console.log(ids);
  }, [ids])

  useEffect(() => {
    getCategoryData()
  }, [currentPage, limit])

  return (
    <>
      <div className='py-5'>
        <ToastContainer />
        <hr />
        <div className='p-3 text-[15px]'>
          Home / Category / View
        </div>
        <hr />
        <div className='grid grid-cols-1 gap-5 pt-5 p-3'>
          <div className={`rounded-xl shadow-xl border-t-1 border-[#eee] p-5 bg-blend-hue`}>
            <div className="flex items-center justify-between mb-3">
              <div className='flex gap-3'>
                <h2 className="text-lg font-bold">View Category</h2>
                <select className='border' onChange={(e) => setLimit(e.target.value)}>
                  <option value="">Select Limit</option>
                  <option value="3">2</option>
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
                <button className='bg-green-600 rounded p-2 text-white cursor-pointer' onClick={categoryChangeStatus}>CHANGE STATUS</button>
                <button className='bg-red-600 rounded p-2 text-white cursor-pointer' onClick={categoryDelete}>DELETE</button>
              </span>
            </div>
            <div>
              <table className="table-auto w-full border bg-[#1f2937] text-white pb-5">
                <thead>
                  <tr className='bg-blue-950'>
                    <th className="border px-4 py-2 text-left">
                      <input type="checkbox" checked={allChk} onChange={allChecked} /> Name
                    </th>
                    <th className="border px-4 py-2 text-left">Image</th>
                    <th className="border px-4 py-2 text-left">Order</th>
                    <th className="border px-4 py-2 text-left">Status</th>
                    <th className="border px-4 py-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    categoryData.length > 0
                      ?
                      (
                        categoryData.map((data, index) => {
                          return (
                            <tr className='hover:bg-[#2c3643] cursor-pointer' key={index}>
                              <td className="border px-4 py-2">
                                <input type="checkbox" value={data._id} checked={ids.includes(data._id)} onChange={getChecked} /> {data.categoryName}
                              </td>
                              <td className="border px-4 py-2 w-[15%]"><img src={staticPath + data.categoryImage} alt="" /></td>
                              <td className="border px-4 py-2">{data.categoryOrder}</td>
                              <td className="border px-4 py-2">
                                {
                                  data.categoryStaus
                                    ?
                                    <button className='bg-green-600 rounded p-2'>ACTIVE</button>
                                    :
                                    <button className='bg-red-600 rounded p-2'>INACTIVE</button>
                                }
                              </td>
                              <td className="border px-4 py-2">
                                <Link to={`/category/edit/${data._id}`}>
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
                          <td colSpan={5} className='font-bold text-center'>Data Not Found..!</td>
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
