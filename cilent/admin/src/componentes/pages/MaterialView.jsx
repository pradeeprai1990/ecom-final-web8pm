import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router';
import { FaPenAlt, FaSearch } from "react-icons/fa";
import { MdFilterAlt, MdFilterAltOff } from "react-icons/md";
import { toast, ToastContainer } from 'react-toastify';
import ResponsivePagination from 'react-responsive-pagination';

export default function MeterialView() {
  let apiBaseUrl = import.meta.env.VITE_APIBASEURL
  let [searchBox, setSearchBox] = useState(false)
  let [materialData, setMaterialData] = useState([])
  let [ids, setIds] = useState([])
  let [allCheck, setAllChecked] = useState(false)
  let [currentPage, setCurrentPage] = useState(1)
  let [totalPages, setTotalPages] = useState(1)
  let [limit, setLimit] = useState(3)

  let getMaterialData = () => {
    axios.get(`${apiBaseUrl}material/view`, {
      params: {
        page: currentPage,
        limit
      }
    })
      .then((apiRes) => apiRes.data)
      .then((finalData) => {
        console.log(finalData);
        setTotalPages(finalData.totPage)
        setMaterialData(finalData.data);
      })
  }

  let materialChangeStatus = () => {
    axios.post(`${apiBaseUrl}material/status-update`, { ids })
      .then((apiRes) => apiRes.data)
      .then((finalData) => {
        console.log(finalData);
        if (finalData.status == 1) {
          toast.success(finalData.msg)
          getMaterialData()
          setIds([])
        }
      })
  }

  let getChecked = (e) => {
    if (e.target.checked) {
      if (!ids.includes(e.target.value)) {
        setIds([...ids, e.target.value])
      }
    } else {
      let filterData = ids.filter((v) => v != e.target.value)
      setIds(filterData)
    }
  }

  let allChecked = (e) => {
    if (e.target.checked) {
      let finalData = materialData.map((val) => val._id)
      setIds(finalData)
    } else {
      setIds([])
    }
    setAllChecked(!allCheck)
  }

  useEffect(() => {
    if (ids.length == materialData.length && ids.length > 0) {
      setAllChecked(true)
    } else {
      setAllChecked(false)
    }

  }, [ids])

  let materialDelete = () => {
    if (ids.length > 0) {
      axios.post(`${apiBaseUrl}material/multi-delete`, { ids })
        .then((apiRes) => apiRes.data)
        .then((finalData) => {
          console.log(finalData);
          toast.success(finalData.msg)
          getMaterialData()
        })
    } else {
      toast.error(finalData.msg)
    }
  }

  useEffect(() => {
    getMaterialData()
  }, [currentPage,limit])

  return (
    <>
      <div className='py-5'>
        <ToastContainer />
        <hr />
        <div className='p-3 text-[15px]'>
          Home / Materia / View
        </div>
        <hr />
        <div className='grid grid-cols-1 gap-5 pt-5 p-3'>
          <div className={`rounded-xl shadow-xl border-t-1 border-[#eee] p-5 bg-blend-hue`}>
            <div className="flex items-center justify-between mb-3">
              <div className='flex gap-3'>
                <h2 className="text-lg font-bold">View Material</h2>
                <select className='border border-bg-[#eee]' onChange={(e)=>setLimit(e.currentTarget.value)}>
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
                <button className='bg-green-600 rounded p-2 text-white cursor-pointer' onClick={materialChangeStatus}>CHANGE STATUS</button>
                <button className='bg-red-600 rounded p-2 text-white cursor-pointer' onClick={materialDelete}>DELETE</button>
              </span>
            </div>
            <div>
              <table className="table-auto w-full border bg-[#1f2937] text-white pb-5">
                <thead>
                  <tr className='bg-blue-950'>
                    <th className="border px-4 py-2 text-left"> <input checked={allCheck} onChange={allChecked} type="checkbox" /> Material Name</th>
                    <th className="border px-4 py-2 text-left">Order</th>
                    <th className="border px-4 py-2 text-left">Status</th>
                    <th className="border px-4 py-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    materialData.length > 0 ?
                      (
                        materialData.map((data, index) => {
                          return (
                            <tr key={index} className='hover:bg-[#2c3643] cursor-pointer'>
                              <td className="border px-4 py-2"><input checked={ids.includes(data._id)} onChange={getChecked} value={data._id} type="checkbox" /> {data.materialName}</td>
                              <td className="border px-4 py-2">{data.materialOrder}</td>
                              <td className="border px-4 py-2">
                                {
                                  data.materialStatus
                                    ?
                                    <button className='bg-green-600 rounded p-2'>Active</button>
                                    :
                                    <button className='bg-red-600 rounded p-2'>Inactive</button>
                                }
                              </td>
                              <td className="border px-4 py-2">
                                <Link to={`/material/edit/${data._id}`}>
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
                          <td colSpan={4} className='text-center'>Data Not Found..!</td>
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
