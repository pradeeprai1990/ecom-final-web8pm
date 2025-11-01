import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaPenAlt, FaSearch } from "react-icons/fa";
import { MdFilterAlt, MdFilterAltOff } from "react-icons/md";
import { useNavigate, useParams } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';

export default function ColorAdd() {
  let { id } = useParams();
  let navigate = useNavigate()
  let apiBaseUrl = import.meta.env.VITE_APIBASEURL
  let [formvalue, setFormValue] = useState({
    colorName: "",
    colorCode: "#000000",
    colorOrder: ""
  })
  let colorSave = (e) => {
    e.preventDefault()
    if (id) {
      axios.put(`${apiBaseUrl}color/update/${id}`, formvalue)
        .then((apiRes) => apiRes.data)
        .then((finalData) => {
          let { sataus, msg } = finalData
          if (sataus == 0) {
            toast.error(msg)
          } else {
            toast.success(msg)
          }
          setFormValue({
            colorName: "",
            colorCode: "#000000",
            colorOrder: ""
          })
        })
    } else {
      axios.post(`${apiBaseUrl}color/create`, formvalue)
        .then((apiRes) => apiRes.data)
        .then((finalData) => {
          let { sataus, msg } = finalData
          if (sataus == 0) {
            toast.error(msg)
          } else {
            toast.success(msg)
          }
          setFormValue({
            colorName: "",
            colorCode: "#000000",
            colorOrder: ""
          })
        })
    }
    // setTimeout(() => {
    //   navigate('/color/view')
    // }, 3000)
  }

  let getValueOrSetValue = (e) => {
    let obj = { ...formvalue }
    let inputName = e.target.name
    let inputValue = e.target.value
    obj[inputName] = inputValue
    setFormValue(obj)
  }


  useEffect(() => {
    if (id) {
      axios.get(`${apiBaseUrl}color/detail/${id}`)
        .then((apiRes) => apiRes.data)
        .then((finalData) => {
          setFormValue(finalData.resData);
        })
    } else {
      setFormValue({
        colorName: "",
        colorCode: "#000000",
        colorOrder: ""
      })
    }
  }, [id])


  return (
    <>
      <div className='py-5'>
        <ToastContainer />
        <hr />
        <div className='p-3 text-[15px]'>
          Home / Color/ Add
        </div>
        <hr />
        <div className='grid grid-cols-1 gap-5 pt-5 p-3'>
          <div className={`rounded-xl shadow-xl border-t-1 border-[#eee] p-5 bg-blend-hue`}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold">{id?'Update':'Add'} Color</h2>
            </div>
            <div>
              <form onSubmit={colorSave}>
                <div className="space-y-12">
                  <div className="border-b border-gray-900/10 pb-12">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-4">
                        <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">Color Name</label>
                        <div className="m-2">
                          <input onChange={getValueOrSetValue} value={formvalue.colorName} id="colorName" type="text" name="colorName" autoComplete="given-name" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>

                        <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">Color Picker</label>
                        <div className="m-2">
                          <input onChange={getValueOrSetValue} value={formvalue.colorCode} id="colorCode" type="color" name="colorCode" autoComplete="given-name" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 h-[50px]" />
                        </div>

                        <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">Order</label>
                        <div className="m-2">
                          <input onChange={getValueOrSetValue} value={formvalue.colorOrder} id="colorOrder" type="number" name="colorOrder" autoComplete="given-name" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                <div className="mt-6 flex items-center gap-x-6">
                  {
                    id ?
                      <button type="submit" className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 cursor-pointer">Update Color</button>
                      :
                      <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer">Add Color</button>
                  }

                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}
