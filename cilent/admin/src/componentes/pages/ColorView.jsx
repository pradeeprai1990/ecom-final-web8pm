import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaPenAlt, FaSearch } from "react-icons/fa";
import { MdFilterAlt, MdFilterAltOff } from "react-icons/md";
import { Link } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import ResponsivePagination from 'react-responsive-pagination';

export default function ColorView() {

  let [searchBox, setSearchBox] = useState(false)
  let [colorData, setColorData] = useState([])
  let [ids, setIds] = useState([])
  let [allCheck, setAllChecked] = useState(false)
  let [currentPage, setCurrentPage] = useState(1);
  let [totalPages, settotalPages] = useState(0)
  let [limit, setLimit] = useState(3)

  let apiBaseUrl = import.meta.env.VITE_APIBASEURL
  let getALLdata = () => {
    axios.get(`${apiBaseUrl}color/view`, {
      params: {
        page: currentPage,
        limit
      }
    })
      .then((apiRes) => apiRes.data)
      .then((finalData) => {
        setColorData(finalData.data);
        console.log(finalData);
        settotalPages(finalData.totPage)
      })
  }

  let getChecked = (e) => {
    if (e.target.checked) {
      if (!ids.includes(e.target.value)) {
        setIds([...ids, e.target.value])
      }
    } else {
      let filterdata = ids.filter((v) => v != e.target.value)
      setIds(filterdata)
    }
  }

  let allChecked = (e) => {
    if (e.target.checked) {
      let finalData = colorData.map((val) => val._id)
      setIds(finalData)
    } else {
      setIds([])
    }
    setAllChecked(!allCheck)
  }

  let colorDelete = () => {
    if (ids.length > 0) {
      axios.post(`${apiBaseUrl}color/multi-delete`, { ids })
        .then((apiRes) => apiRes.data)
        .then((finalData) => {
          toast.success("Deleted Successfully..!")
          getALLdata()
        })
    } else {
      toast.error("Kindly Check atleast One Checkbox..!")
    }
  }

  let colorStatusChange = () => {
    axios.post(`${apiBaseUrl}color/status-update`, { ids })
      .then((apiRes) => apiRes.data)
      .then((finalData) => {
        console.log(finalData);
        if (finalData.status == 1) {
          toast.success(finalData.msg)
        }
        setIds([])
        getALLdata()
      })
  }



  useEffect(() => {
    if (ids.length == colorData.length && ids.length > 0) {
      setAllChecked(true)
    } else {
      setAllChecked(false)
    }
  }, [ids])

  useEffect(() => {
    getALLdata()
  }, [currentPage,limit])



  return (
    <>
      <div className='py-5'>
        <ToastContainer />
        <hr />
        <div className='p-3 text-[15px]'>
          Home / Color/ View
        </div>
        <hr />
        <div className='grid grid-cols-1 gap-5 pt-5 p-3'>
          <div className={`rounded-xl shadow-xl border-t-1 border-[#eee] p-5 bg-blend-hue`}>
            <div className="flex items-center justify-between mb-3">
              <div className='flex gap-2'>
                <h2 className="text-lg font-bold">View Color</h2>
                <select className='border border-bg-[#eee]' onChange={(e)=>setLimit(e.target.value)}>
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
                <button className='bg-green-600 rounded p-2 text-white cursor-pointer' onClick={colorStatusChange}>CHANGE STATUS</button>
                <button className='bg-red-600 rounded p-2 text-white cursor-pointer' onClick={colorDelete}>DELETE</button>
              </span>
            </div>
            <div>
              <table className="table-auto w-full border bg-[#1f2937] text-white pb-5">
                <thead>
                  <tr className='bg-blue-950'>
                    <th className="border px-4 py-2 text-left"> <input checked={allCheck} onChange={allChecked} type="checkbox" /> Color Name</th>
                    <th className="border px-4 py-2 text-left">Code</th>
                    <th className="border px-4 py-2 text-left">Order</th>
                    <th className="border px-4 py-2 text-left">Status</th>
                    <th className="border px-4 py-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    colorData.length > 0 ? (
                      colorData.map((data, index) => {
                        return (
                          <tr className='hover:bg-[#2c3643] cursor-pointer' key={index}>
                            <td className="border px-4 py-2"><input checked={ids.includes(data._id)} onChange={getChecked} type="checkbox" value={data._id} /> {data.colorName}</td>
                            <td className="border px-4 py-2">{data.colorCode}</td>
                            <td className="border px-4 py-2">{data.colorOrder}</td>

                            {
                              data.colorStatus ?
                                <td className="border px-4 py-2"><button className='bg-green-600 rounded p-2'>ACTIVE</button></td>
                                :
                                <td className="border px-4 py-2"><button className='bg-red-600 rounded p-2'>INACTIVE</button></td>
                            }
                            <td className="border px-4 py-2"><button className='bg-blue-600 rounded p-3 cursor-pointer'> <Link to={`/color/edit/${data._id}`}><FaPenAlt /></Link> </button></td>
                          </tr>
                        )
                      })
                    ) : (
                      <tr>
                        <th colSpan={5} className='text-center'>Data not found..!</th>
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
