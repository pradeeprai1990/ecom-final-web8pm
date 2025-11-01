import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaPenAlt, FaSearch } from "react-icons/fa";
import { MdFilterAlt, MdFilterAltOff } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import ResponsivePagination from 'react-responsive-pagination';

export default function WhyChooseUsView() {

  let [searchBox, setSearchBox] = useState(false)
  let [whyChooseUsData, setWhyChooseUsData] = useState([])
  let [staticPath, setStaticPath] = useState('')
  let [ids, setIds] = useState([])
  let [checkAll, setCheckAll] = useState(false)
  let [currentPage, setCurrentPage] = useState(1)
  let [totalPages, setTotalPages] = useState(0)
  let [limit, setLimit] = useState(3)


  let apiBaseUrl = import.meta.env.VITE_APIBASEURL
  let getWhyChooseUsData = () => {
    axios.get(`${apiBaseUrl}why-choose-us/view`,{
      params:{
        page:currentPage,
        limit
      }
    })
      .then((apiRes) => apiRes.data)
      .then((finalData) => {
        //console.log(finalData.data);
        setWhyChooseUsData(finalData.data);
        setStaticPath(finalData.staticPath)
        setTotalPages(finalData.totPage)
      })
  }

  let whyChooseUsDelete = () => {
    if (ids.length > 0) {
      axios.post(`${apiBaseUrl}why-choose-us/delete`, { ids })
        .then((apiRes) => apiRes.data)
        .then((finalData) => {
          if (finalData.status == 1) {
            toast.success(finalData.msg)
            setIds([])
            getWhyChooseUsData()
          }
        })
    } else {
      toast.error('Kindly Choose atleast one checkbox')
    }
  }

  let whyChooseUsChangeStatus = () => {
    if (ids.length > 0) {
      axios.put(`${apiBaseUrl}why-choose-us/change-status`, { ids })
        .then((apiRes) => apiRes.data)
        .then((finalData) => {
          if (finalData.status == 1) {
            toast.success(finalData.msg)
            setIds([])
            getWhyChooseUsData()
          }
        })
    } else {
      toast.error('Kindly Choose atleast one checkbox')
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
      let allIds = whyChooseUsData.map((val) => val._id)
      setIds(allIds)
    } else {
      setIds([])
    }
  }

  useEffect(() => {
    if (whyChooseUsData.length == ids.length && ids.length > 0) {
      setCheckAll(true)
    } else {
      setCheckAll(false)
    }
    console.log(ids);
  }, [ids])

  useEffect(() => {
    getWhyChooseUsData()
  }, [currentPage,limit])

  return (
    <>
      <div className='py-5'>
        <ToastContainer />
        <hr />
        <div className='p-3 text-[15px]'>
          Home / Why Choose us / View
        </div>
        <hr />
        <div className='grid grid-cols-1 gap-5 pt-5 p-3'>
          <div className={`rounded-xl shadow-xl border-t-1 border-[#eee] p-5 bg-blend-hue`}>
            <div className="flex items-center justify-between mb-3">
              <div className='flex gap-3'>
                <h2 className="text-lg font-bold">View Why Choose Us</h2>
                <select className='border' onChange={(e)=>setLimit(e.target.value)}>
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
                <button className='bg-green-600 rounded p-2 text-white cursor-pointer' onClick={whyChooseUsChangeStatus}>CHANGE STATUS</button>
                <button className='bg-red-600 rounded p-2 text-white cursor-pointer' onClick={whyChooseUsDelete}>DELETE</button>
              </span>
            </div>
            <div>
              <table className="table-auto w-full border bg-[#1f2937] text-white pb-5">
                <thead>
                  <tr className='bg-blue-950'>
                    <th className="border px-4 py-2 text-left">
                      <input checked={checkAll} onChange={chkAll} type="checkbox" /> Title
                    </th>
                    <th className="border px-4 py-2 text-left">Image</th>
                    <th className="border px-4 py-2 text-left">Discription</th>
                    <th className="border px-4 py-2 text-left">Order</th>
                    <th className="border px-4 py-2 text-left">Status</th>
                    <th className="border px-4 py-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    whyChooseUsData.length ?
                      (
                        whyChooseUsData.map((data, index) => {
                          return (
                            <tr key={index} className='hover:bg-[#2c3643] cursor-pointer'>
                              <td className="border px-4 py-2">
                                <input value={data._id} checked={ids.includes(data._id)} onChange={getChecked} type="checkbox" /> {data.whyChooseUsTitle}
                              </td>
                              <td className="border px-4 py-2"><img className='w-[50%]' src={staticPath + data.whyChooseUsImg} alt="" /></td>
                              <td className="border px-4 py-2">{data.whyChooseUsDesc}</td>
                              <td className="border px-4 py-2">{data.whyChooseUsOrder}</td>
                              <td className="border px-4 py-2">
                                {
                                  data.whyChooseUsStatus ?
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
