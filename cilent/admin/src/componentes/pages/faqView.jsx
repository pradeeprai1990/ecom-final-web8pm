import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaPenAlt, FaSearch } from "react-icons/fa";
import { MdFilterAlt, MdFilterAltOff } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router';
import ResponsivePagination from 'react-responsive-pagination';

export default function FaqView() {
  let apiBaseUrl = import.meta.env.VITE_APIBASEURL
  let [searchBox, setSearchBox] = useState(false)
  let [faqData, setFaqData] = useState([])
  let [ids, setIds] = useState([])
  let [allCheck, setAllChecked] = useState(false)
  let [currentPage, setCurrentPage] = useState(1)
  let [totalPages, setTotalPages] = useState(0)
  let [limit, setLimit] = useState(3)

  let getData = () => {
    axios.get(`${apiBaseUrl}faq/view`,{
      params:{
        page:currentPage,
        limit
      }
    })
      .then((apiRes) => apiRes.data)
      .then((finalData) => {
        setFaqData(finalData.data);
        setTotalPages(finalData.totPage);
        
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
      let finalData = faqData.map((val) => val._id)
      setIds(finalData)
    } else {
      setIds([])
    }
    setAllChecked(!allCheck)
  }

  useEffect(() => {
    if (ids.length == faqData.length && ids.length > 0) {
      setAllChecked(true)
    } else {
      setAllChecked(false)
    }
  }, [ids])

  useEffect(() => {
    getData()
  }, [currentPage,limit])


  let faqDelete = () => {
    axios.post(`${apiBaseUrl}faq/multi-delete/`, { ids })
      .then((apiRes) => apiRes.data)
      .then((finalData) => {
        console.log(finalData);
        if (finalData.status == 1) {
          toast.success(finalData.msg)
          getData()
        } else {
          toast.succerroress(finalData.msg)
        }
      })
  }

  let faqChangeStatus = () => {
    axios.post(`${apiBaseUrl}faq/status-update`, { ids })
      .then((apiRes) => apiRes.data)
      .then((finalData) => {
        console.log(finalData);
        if (finalData.status == 1) {
          toast.success(finalData.msg)
          setIds([])
          getData()
        }

      })
  }

  return (
    <>
      <div className='py-5'>
        <ToastContainer />
        <hr />
        <div className='p-3 text-[15px]'>
          Home / Faq / View
        </div>
        <hr />
        <div className='grid grid-cols-1 gap-5 pt-5 p-3'>
          <div className={`rounded-xl shadow-xl border-t-1 border-[#eee] p-5 bg-blend-hue`}>
            <div className="flex items-center justify-between mb-3">
              <div className='flex gap-3'>
                <h2 className="text-lg font-bold">View Question</h2>
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
                <button className='bg-green-600 rounded p-2 text-white cursor-pointer' onClick={faqChangeStatus}>CHANGE STATUS</button>
                <button className='bg-red-600 rounded p-2 text-white cursor-pointer' onClick={faqDelete}>DELETE</button>
              </span>
            </div>
            <div>
              <table className="table-auto w-full border bg-[#1f2937] text-white pb-5">
                <thead>
                  <tr className='bg-blue-950'>
                    <th className="border px-4 py-2 text-left"> <input checked={allCheck} onChange={allChecked} type="checkbox" /> Question</th>
                    <th className="border px-4 py-2 text-left">Answer</th>
                    <th className="border px-4 py-2 text-left">Order</th>
                    <th className="border px-4 py-2 text-left">Status</th>
                    <th className="border px-4 py-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    faqData.length > 0 ?
                      (
                        faqData.map((data, index) => {
                          return (
                            <tr className='hover:bg-[#2c3643] cursor-pointer' key={index}>
                              <td className="border px-4 py-2"><input checked={ids.includes(data._id)} onChange={getChecked} value={data._id} type="checkbox" /> {data.question}</td>
                              <td className="border px-4 py-2"> {data.answer}</td>
                              <td className="border px-4 py-2">{data.order}</td>
                              <td className="border px-4 py-2">
                                {
                                  data.staus
                                    ?
                                    <button className='bg-green-600 rounded p-2'>ACTIVE</button>
                                    :
                                    <button className='bg-red-600 rounded p-2'>INACTIVE</button>
                                }

                              </td>
                              <td className="border px-4 py-2">
                                <Link to={`/faq/edit/${data._id}`}>
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
                          <td colSpan={5} className='text-center'>Data Not Found..!</td>
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
