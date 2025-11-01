import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaPenAlt, FaSearch } from "react-icons/fa";
import { MdFilterAlt, MdFilterAltOff } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import ResponsivePagination from 'react-responsive-pagination';

export default function SliderView() {

  let [searchBox, setSearchBox] = useState(false)
  let apiBaseUrl = import.meta.env.VITE_APIBASEURL
  let [sliderData, setSliderData] = useState([])
  let [path, setPath] = useState('')
  let [ids, setIds] = useState([])
  let [chkedAll, setChkedAll] = useState(false)
  let [currentPage, setCurrentPage] = useState(1)
  let [totalPages, setTotalPages] = useState(0)
  let [limit, setLimit] = useState(3)

  let getSliderData = () => {
    axios.get(`${apiBaseUrl}slider/view`,{
      params:{
        page:currentPage,
        limit
      }
    })
      .then((apiRes) => apiRes.data)
      .then((finalData) => {
        setSliderData(finalData.data)
        setPath(finalData.staticPath)
        setTotalPages(finalData.totPage)
      })
  }

  let sliderDelete = (e) => {
    if (ids.length > 0) {
      axios.post(`${apiBaseUrl}slider/delete`, { ids })
        .then((apiRes) => apiRes.data)
        .then((finalData) => {
          if (finalData.status == 1) {
            toast.success(finalData.msg)
            setIds([])
            getSliderData()
          }
        })
    } else {
      toast.error("Kindly Choose Atleast One Checkbox")
    }
  }

  let sliderChangeStatus = () => {
    if (ids.length > 0) {
      axios.put(`${apiBaseUrl}slider/change-status`, { ids })
        .then((apiRes) => apiRes.data)
        .then((finalData) => {
          if (finalData.status == 1) {
            toast.success(finalData.msg)
            setIds([])
            getSliderData()
          }
        })
    } else {
      toast.error("Kindly Choose Atleast One Checkbox")
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
      let allIds = sliderData.map((val) => val._id)
      setIds(allIds)
    } else {
      setIds([])
    }
  }

  useEffect(() => {
    if (sliderData.length == ids.length && ids.length > 0) {
      setChkedAll(true)
    } else {
      setChkedAll(false)
    }
    console.log(ids);

  }, [ids])

  useEffect(() => {
    getSliderData()
  }, [currentPage,limit])

  return (
    <>
      <div className='py-5'>
        <ToastContainer />
        <hr />
        <div className='p-3 text-[15px]'>
          Home / Slider / View
        </div>
        <hr />
        <div className='grid grid-cols-1 gap-5 pt-5 p-3'>
          <div className={`rounded-xl shadow-xl border-t-1 border-[#eee] p-5 bg-blend-hue`}>
            <div className="flex items-center justify-between mb-3">
              <div className='flex gap-3'>
                 <h2 className="text-lg font-bold">Slider</h2>
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
                <button className='bg-green-600 rounded p-2 text-white cursor-pointer' onClick={sliderChangeStatus}>CHANGE STATUS</button>
                <button className='bg-red-600 rounded p-2 text-white cursor-pointer' onClick={sliderDelete}>DELETE</button>
              </span>
            </div>
            <div>
              <table className="table-auto w-full border bg-[#1f2937] text-white pb-5">
                <thead>
                  <tr className='bg-blue-950'>
                    <th className="border px-4 py-2 text-left">
                      <input checked={chkedAll} type="checkbox" onChange={chkAll} /> Title
                    </th>
                    <th className="border px-4 py-2 text-left">Image</th>
                    <th className="border px-4 py-2 text-left">Status</th>
                    <th className="border px-4 py-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    sliderData.length > 0 ?
                      (
                        sliderData.map((data, index) => {
                          return (
                            <tr key={index} className='hover:bg-[#2c3643] cursor-pointer'>
                              <td className="border px-4 py-2">
                                <input checked={ids.includes(data._id)} value={data._id} onChange={getChecked} type="checkbox" /> {data.sliderTitle}
                              </td>
                              <td className="border px-4 py-2 w-[15%]"> <img src={path + data.sliderImg} alt="" /></td>
                              <td className="border px-4 py-2">
                                {
                                  data.sliderStatus ?
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
