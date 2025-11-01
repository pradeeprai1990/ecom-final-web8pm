import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaPenAlt, FaSearch } from "react-icons/fa";
import { MdFilterAlt, MdFilterAltOff } from "react-icons/md";
import { useNavigate, useParams } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';

export default function CountryAdd() {
  let { id } = useParams()
  let apiBaseUrl = import.meta.env.VITE_APIBASEURL
  let navigate = useNavigate()

  let [formValue, setFormValue] = useState({
    countryName: "",
    countryOrder: ""
  })

  let countrySave = (e) => {
    e.preventDefault()
    if(id){
      axios.put(`${apiBaseUrl}country/update/${id}`, formValue)
      .then((apiRes) => apiRes.data)
      .then((finalData) => {
        console.log(finalData)
        if (finalData.status == 1) {
          toast.success(finalData.msg)
          setFormValue({
            countryName: "",
            countryOrder: ""
          })
          setTimeout(() => {
            navigate("/country/view")
          }, 3000)
        } else {
          toast.error(finalData.msg)
        }
      })
    }else{
      axios.post(`${apiBaseUrl}country/create`, formValue)
      .then((apiRes) => apiRes.data)
      .then((finalData) => {
        console.log(finalData)
        if (finalData.status == 1) {
          toast.success(finalData.msg)
          setFormValue({
            countryName: "",
            countryOrder: ""
          })
          // setTimeout(() => {
          //   navigate("/country/view")
          // }, 3000)
        } else {
          toast.error(finalData.msg)
        }
      })
    }
  }

  let getSetValue = (e) => {
    let obj = { ...formValue }
    let inputName = e.target.name
    let inputValue = e.target.value
    obj[inputName] = inputValue
    setFormValue(obj)
  }

  useEffect(() => {
    axios.get(`${apiBaseUrl}country/detail/${id}`)
      .then((apiRes) => apiRes.data)
      .then((finalData) => {
        console.log(finalData.data);
        setFormValue({
          countryName: finalData.data.countryName,
          countryOrder: finalData.data.countryOrder
        })
      })
  }, [id])


  return (
    <>
      <div className='py-5'>
        <ToastContainer />
        <hr />
        <div className='p-3 text-[15px]'>
          Home / Country/ {id ? 'Edit' : 'Add'}
        </div>
        <hr />
        <div className='grid grid-cols-1 gap-5 pt-5 p-3'>
          <div className={`rounded-xl shadow-xl border-t-1 border-[#eee] p-5 bg-blend-hue`}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold">Add Country</h2>
            </div>
            <div>
              <form onSubmit={countrySave}>
                <div className="space-y-12">
                  <div className="border-b border-gray-900/10 pb-12">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-4">
                        <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">Country Name</label>
                        <div className="m-2">
                          <input onChange={getSetValue} value={formValue.countryName} id="countryName" type="text" name="countryName" autoComplete="given-name" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>

                        <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">Order</label>
                        <div className="m-2">
                          <input onChange={getSetValue} value={formValue.countryOrder} id="countryOrder" type="number" name="countryOrder" autoComplete="given-name" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                <div className="mt-6 flex items-center gap-x-6">
                  <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer">{id ? "Update" : "Add"} Country</button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}
