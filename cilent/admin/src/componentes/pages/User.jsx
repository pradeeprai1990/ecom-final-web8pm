import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaPenAlt, FaSearch } from "react-icons/fa";
import { MdFilterAlt, MdFilterAltOff } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';

export default function User() {
  let apiBaseUrl = import.meta.env.VITE_APIBASEURL
  let [searchBox, setSearchBox] = useState(false)
  let [userData, setUserData] = useState([])
  let [ids, setIds] = useState([])
  let [allChkd, setAllChked] = useState(false)

  let getUserData = () => {
    axios.get(`${apiBaseUrl}user/view`)
      .then((apiRes) => apiRes.data)
      .then((finalData) => {
        setUserData(finalData.data);
      })
  }

  let changeStatus = () => {
    if(ids.length > 0){
    axios.put(`${apiBaseUrl}user/change-status`, {ids})
    .then((apiRes)=>apiRes.data)
    .then((finalData)=>{
      console.log(finalData);
      if(finalData.status == 1){
        toast.success(finalData.msg)
        setIds([])
      }
      getUserData()
    })
  }else{
    toast.error("Kindly Check Atleast on checkbox")
  }
  }

  let getCheked = (e) => {
    if (e.target.checked) {
      if (!ids.includes(e.target.value)) {
        setIds([...ids, e.target.value])
      }
    } else {
      let filterData = ids.filter((val) => val != e.target.value)
      setIds(filterData)
    }
  }

  let getAllChked = (e) => {
    if (e.target.checked) {
      let allData = userData.map((val) => val._id)
      setIds(allData)
    } else {
      setIds([])
    }
  }

  useEffect(() => {
    if (userData.length == ids.length && ids.length > 0) {
      setAllChked(true)
    } else {
      setAllChked(false)
    }
    console.log(ids);
  }, [ids])


  useEffect(() => {
    getUserData()
  }, [])

  return (
    <>
      <div className='py-5'>
        <ToastContainer />
        <hr />
        <div className='p-3 text-[15px]'>
          Home / User / View
        </div>
        <hr />
        <div className='grid grid-cols-1 gap-5 pt-5 p-3'>
          <div className={`rounded-xl shadow-xl border-t-1 border-[#eee] p-5 bg-blend-hue`}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold">View User</h2>
              <span className="flex gap-1">
                {
                  searchBox ?
                    <>
                      <input type="text" className='border-1' /><button className="bg-green-600 rounded p-2 text-white"><FaSearch /></button>
                      <button className='bg-blue-600 rounded p-2 text-white cursor-pointer'><MdFilterAltOff onClick={() => setSearchBox(false)} /></button>
                    </>
                    :
                    <>
                      <button className='bg-blue-600 rounded p-2 text-white cursor-pointer'><MdFilterAlt onClick={() => setSearchBox(true)} /></button>
                    </>
                }
                <button className='bg-green-600 rounded p-2 text-white cursor-pointer' onClick={changeStatus}>CHANGE STATUS</button>
                <button className='bg-red-600 rounded p-2 text-white'>DELETE</button>
              </span>
            </div>
            <div>
              <table className="table-auto w-full border bg-[#1f2937] text-white pb-5">
                <thead>
                  <tr className='bg-blue-950'>
                    <th className="border px-4 py-2 text-left">
                      <input checked={allChkd} onChange={getAllChked} type="checkbox" /> Name
                    </th>
                    <th className="border px-4 py-2 text-left">Email</th>
                    <th className="border px-4 py-2 text-left">Mobile</th>
                    <th className="border px-4 py-2 text-left">Status</th>
                    <th className="border px-4 py-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    userData.length > 0 ?
                      (
                        userData.map((data, index) => {
                          return (
                            <tr key={index} className='hover:bg-[#2c3643] cursor-pointer'>
                              <td className="border px-4 py-2">
                                <input checked={ids.includes(data._id)} onChange={getCheked} value={data._id} type="checkbox" /> {data.userName}
                              </td>
                              <td className="border px-4 py-2">{data.userEmail}</td>
                              <td className="border px-4 py-2">{data.userPhone}</td>
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
                        <tr className='hover:bg-[#2c3643] cursor-pointer'>
                          <td className="font-bold text-center" colSpan={5}>Data Not Found..!</td>
                        </tr>
                      )
                  }

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
