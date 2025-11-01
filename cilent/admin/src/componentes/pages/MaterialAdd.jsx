import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaPenAlt, FaSearch } from "react-icons/fa";
import { MdFilterAlt, MdFilterAltOff } from "react-icons/md";
import { useNavigate, useParams } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';

export default function MaterialAdd() {
  let { id } = useParams()
  let navigate = useNavigate()
  let apiBaseUrl = import.meta.env.VITE_APIBASEURL
  let [formValue, setFormValue] = useState({
    materialName: "",
    materialOrder: ""
  })

  let materialSave = (e) => {
    e.preventDefault()
    if (id) {
      axios.put(`${apiBaseUrl}material/update/${id}`, formValue)
      .then((apiRes) => apiRes.data)
      .then((finalData) => {
        setFormValue({
          materialName: "",
          materialOrder: ""
        })
        if (finalData.status == 1) {
          toast.success(finalData.msg)
        } else {
          toast.error(finalData.msg)
        }

        setTimeout(() => {
          navigate('/material/view')
        }, 3000)

      })
    } else {
      axios.post(`${apiBaseUrl}material/create`, formValue)
        .then((apiRes) => apiRes.data)
        .then((finalData) => {
          setFormValue({
            materialName: "",
            materialOrder: ""
          })
          if (finalData.status == 1) {
            toast.success(finalData.msg)
          } else {
            toast.error(finalData.msg)
          }

          // setTimeout(() => {
          //   navigate('/material/view')
          // }, 3000)

        })
    }
  }

  let getValueSetValue = (e) => {
    let obj = { ...formValue }
    let inputName = e.target.name
    let inputValue = e.target.value
    obj[inputName] = inputValue
    setFormValue(obj)
  }

  useEffect(() => {
    if (id) {
      axios.get(`${apiBaseUrl}material/detail/${id}`)
        .then((apiRes) => apiRes.data)
        .then((finalData) => {
          console.log(finalData.data);
          setFormValue({
            materialName: finalData.data.materialName,
            materialOrder: finalData.data.materialOrder
          })

        })
    } else {
      setFormValue({
        materialName: "",
        materialOrder: ""
      })
    }

  }, [id])

  return (
    <>
      <div className='py-5'>

        <hr />
        <div className='p-3 text-[15px]'>
          Home / Materia / {id ? "Edit" : "Add"}
        </div>
        <hr />
        <div className='grid grid-cols-1 gap-5 pt-5 p-3'>
          <ToastContainer />
          <div className={`rounded-xl shadow-xl border-t-1 border-[#eee] p-5 bg-blend-hue`}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold">Add Material</h2>
            </div>
            <div>
              <form onSubmit={materialSave}>
                <div className="space-y-12">
                  <div className="border-b border-gray-900/10 pb-12">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-4">
                        <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">Material Name</label>
                        <div className="m-2">
                          <input id="materialName" onChange={getValueSetValue} value={formValue.materialName} type="text" name="materialName" autoComplete="given-name" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>

                        <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">Order</label>
                        <div className="m-2">
                          <input id="materialOrder" onChange={getValueSetValue} value={formValue.materialOrder} type="number" name="materialOrder" autoComplete="given-name" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                <div className="mt-6 flex items-center gap-x-6">
                  <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer">{id ? "Update" : "Add"} Materia</button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}
