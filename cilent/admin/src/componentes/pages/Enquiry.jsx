import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaPenAlt, FaSearch } from "react-icons/fa";
import { MdFilterAlt, MdFilterAltOff } from "react-icons/md";
import ResponsivePagination from 'react-responsive-pagination';

export default function Enquiry() {
  let apiBaseUrl = import.meta.env.VITE_APIBASEURL
  let [searchBox, setSearchBox] = useState(false)
  let [contactUsData, setContactUsData] = useState([])
  let [ids, setIds] = useState([])
  let [allChked, setAllChked] = useState(false)
  let [currentPage, setCurrentPage] = useState(1)
  let [totalPages, setTotalPages] = useState(0)
  let [limit, setLimit] = useState(4)
  let getContactUsData = () => {
    axios.get(`${apiBaseUrl}user/user-contact`, {
      params: {
        page: currentPage,
        limit
      }
    })
      .then((apiRes) => apiRes.data)
      .then((finalData) => {
        setContactUsData(finalData.data);
        setTotalPages(finalData.totPage)
      })
  }

  let getChecked = (e) => {
    if (e.target.checked) {
      if (!ids.includes(e.target.value)) {
        setIds([...ids, e.target.value])
      }
    } else {
      let filterData = ids.filter((id) => id != e.target.value)
      setIds(filterData)
    }
  }

  let allChk = (e) => {
    if (e.target.checked) {
      let allIds = contactUsData.map((val) => val._id)
      setIds(allIds)
    } else {
      setIds([])
    }
  }

  useEffect(() => {
    if (ids.length == contactUsData.length && ids.length > 0) {
      setAllChked(true)
    } else {
      setAllChked(false)
    }
    console.log(ids);
  }, [ids])

  useEffect(() => {
    getContactUsData()
  }, [currentPage,limit])

  return (
    <>
      <div className='py-5'>
        <hr />
        <div className='p-3 text-[15px]'>
          Home / Enquiry / View
        </div>
        <hr />
        <div className='grid grid-cols-1 gap-5 pt-5 p-3'>
          <div className={`rounded-xl shadow-xl border-t-1 border-[#eee] p-5 bg-blend-hue`}>
            <div className="flex items-center justify-between mb-3">
              <div className='flex gap-5'>
                <h2 className="text-lg font-bold">Contact Enquiry Management</h2>
                <select className='border' onChange={(e)=>setLimit(e.target.value)}>
                  <option value="">Select Limit</option>
                  <option value="4">4</option>
                  <option value="8">8</option>
                  <option value="12">12</option>
                  <option value="16">16</option>
                  <option value="20">20</option>
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
                <button className='bg-green-600 rounded p-2 text-white cursor-pointer'>CHANGE STATUS</button>
                <button className='bg-red-600 rounded p-2 text-white'>DELETE</button>
              </span>
            </div>
            <div>
              <table className="table-auto w-full border bg-[#1f2937] text-white pb-5">
                <thead>
                  <tr className='bg-blue-950'>
                    <th className="border px-4 py-2 text-left">
                      <input type="checkbox" onChange={allChk} checked={allChked} /> User Info.
                    </th>
                    <th className="border px-4 py-2 text-left">Subject</th>
                    <th className="border px-4 py-2 text-left">Message</th>
                    <th className="border px-4 py-2 text-left">Mobile</th>
                    <th className="border px-4 py-2 text-left">Email</th>
                    <th className="border px-4 py-2 text-left">Status</th>
                    <th className="border px-4 py-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    contactUsData.length > 0
                      ?
                      (
                        contactUsData.map((data, index) => {
                          return (
                            <tr key={index} className='hover:bg-[#2c3643] cursor-pointer'>
                              <td className="border px-4 py-2">
                                <input checked={ids.includes(data._id)} onChange={getChecked} value={data._id} type="checkbox" /> {data.name}
                              </td>
                              <td className="border px-4 py-2">{data.subject}</td>
                              <td className="border px-4 py-2">{data.message}</td>
                              <td className="border px-4 py-2">{data.mobile}</td>
                              <td className="border px-4 py-2">{data.email}</td>
                              <td className="border px-4 py-2"><button className='bg-green-600 rounded p-2'>ACTIVE</button></td>
                              <td className="border px-4 py-2"><button className='bg-blue-600 rounded p-3'><FaPenAlt /></button></td>
                            </tr>
                          )
                        })

                      )
                      :
                      (
                        <tr className='hover:bg-[#2c3643] cursor-pointer'>
                          <td colSpan={7} className="font-bold text-center">Data Not Found..!</td>
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
