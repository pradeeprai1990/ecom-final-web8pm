import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaPenAlt, FaSearch } from "react-icons/fa";
import { MdFilterAlt, MdFilterAltOff } from "react-icons/md";
import { useNavigate, useParams } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';

export default function FaqAdd() {
  let navigate = useNavigate()
  let { id } = useParams()
  let apiBaseUrl = import.meta.env.VITE_APIBASEURL
  let [formValue, setFormValue] = useState(
    {
      question: "",
      answer: "",
      order: ""
    }
  )

  let faqSave = (e) => {
    e.preventDefault()
    if (id) {
      axios.put(`${apiBaseUrl}faq/update/${id}`, formValue)
        .then((apiRes) => apiRes.data)
        .then((finalData) => {
          console.log(finalData);
          if (finalData.status == 1) {
            toast.success(finalData.msg)
            setFormValue({
              question: "",
              answer: "",
              order: ""
            })
          }
          setTimeout(()=>{
            navigate('/faq/view')
          },3000)
        })
    } else {
      axios.post(`${apiBaseUrl}faq/create`, formValue)
        .then((apiRes) => apiRes.data)
        .then((finalData) => {
          console.log(finalData);
          if (finalData.status == 1) {
            toast.success(finalData.msg)
            setFormValue({
              question: "",
              answer: "",
              order: ""
            })
          }
        })
    }
  }

  useEffect(() => {
    if (id) {
      axios.get(`${apiBaseUrl}faq/detail/${id}`)
        .then((apiRes) => apiRes.data)
        .then((finalData) => {
          console.log(finalData);
          setFormValue({
            question: finalData.data.question,
            answer: finalData.data.answer,
            order: finalData.data.order
          })
        })
    } else {
      setFormValue({
        question: "",
        answer: "",
        order: ""
      })
    }
  }, [id])

  let setGetValue = (e) => {
    let obj = { ...formValue }
    let inputName = e.target.name
    let inputValue = e.target.value
    obj[inputName] = inputValue
    setFormValue(obj)
  }

  return (
    <>
      <div className='py-5'>
        <ToastContainer />
        <hr />
        <div className='p-3 text-[15px]'>
          Home / Faq / {id ? "Edit" : "Add"}
        </div>
        <hr />
        <div className='grid grid-cols-1 gap-5 pt-5 p-3'>
          <div className={`rounded-xl shadow-xl border-t-1 border-[#eee] p-5 bg-blend-hue`}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold">Add Faq</h2>
            </div>
            <div>
              <form onSubmit={faqSave}>
                <div className="space-y-12">
                  <div className="border-b border-gray-900/10 pb-12">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-4">
                        <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">Question</label>
                        <div className="m-2">
                          <input onChange={setGetValue} value={formValue.question} id="question" type="text" name="question" autoComplete="given-name" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>

                        <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">Answer</label>
                        <div className="m-2">
                          <input onChange={setGetValue} value={formValue.answer} id="answer" type="text" name="answer" autoComplete="given-name" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>

                        <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">Order</label>
                        <div className="m-2">
                          <input onChange={setGetValue} value={formValue.order} id="order" type="number" name="order" autoComplete="given-name" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                <div className="mt-6 flex items-center gap-x-6">
                  <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer">{id ? "Update" : "Add"} Faq</button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}
