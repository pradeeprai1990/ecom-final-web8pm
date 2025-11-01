import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

export default function Profile() {
    let apiBaseUrl = import.meta.env.VITE_APIBASEURL
    let [activeTab, setActiveTab] = useState("tab1");
    let [image, setImage] = useState(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS91zs6wAwJLZ_H5DZOZymEpR52i50mL_m9JQ&s`)
    let [profileData, setProfileData] = useState(
        {
            "name": "",
            "email": "",
            "phone": ""
        }
    )

    let getValOrSetVal = (e) => {
        let obj = { ...profileData }
        let inputName = e.target.name
        let inputValue = e.target.value
        obj[inputName] = inputValue
        setProfileData(obj)
    }

    let saveProfile = (e) => {
        e.preventDefault()
        let formValue = new FormData(e.target)
        axios.post(`${apiBaseUrl}admin-auth/create`, formValue)
            .then((apiRes) => apiRes.data)
            .then((finalData) => {
                console.log(finalData);
                if(finalData.status == 1){
                    toast.success(finalData.msg)
                }
            })
    }

    let getAdminProfile = () => {
        axios.get(`${apiBaseUrl}admin-auth/view`)
            .then((apiRes) => apiRes.data)
            .then((finalData) => {
                console.log(finalData.data);
                setProfileData({
                    "name": finalData.data[0].name,
                    "email": finalData.data[0].email,
                    "phone": finalData.data[0].phone
                })
                setImage(finalData.staticPath+finalData.data[0].profileImg)
            })
    }

    useEffect(() => {
        getAdminProfile()
    }, [])

    return (
        <div>
            <div className='py-5'>
                <ToastContainer />
                <hr />
                <div className='p-3 text-[15px]'>
                    Home / Profile
                </div>
                <hr />
                <div className="mt-10 ml-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-10">
                    <div className="sm:col-span-8 border-b border-gray-300">
                        <button
                            type='button'
                            onClick={() => setActiveTab("tab1")}
                            className={`cursor-pointer flex-1 text-center py-2 px-4 font-medium border-b-2 ${activeTab === "tab1"
                                ? "text-blue-600 border-blue-600"
                                : "text-gray-600 border-transparent hover:text-blue-600 hover:border-blue-600"
                                }`}
                        >
                            Profile
                        </button>

                        <button
                            type='button'
                            onClick={() => setActiveTab("tab2")}
                            className={`cursor-pointer flex-1 text-center py-2 px-4 font-medium border-b-2 ${activeTab === "tab2"
                                ? "text-blue-600 border-blue-600"
                                : "text-gray-600 border-transparent hover:text-blue-600 hover:border-blue-600"
                                }`}
                        >
                            Change Password
                        </button>

                        <div>
                            <div className="p-6 bg-gray-50 rounded-b-xl shadow-sm text-gray-700">
                                {
                                    activeTab === "tab1" &&
                                    <>
                                        <form onSubmit={saveProfile}>
                                            <div className='flex gap-5'>
                                                <div className="sm:col-span-1 flex flex-col items-center justify-center border p-4 rounded-md">
                                                    <label
                                                        htmlFor="image"
                                                        className="block text-sm font-medium text-gray-900 mb-2"
                                                    >
                                                        <img className='w-[100%] h-[100%] cursor-pointer' src={image} alt="" />
                                                    </label>

                                                    <input
                                                        onChange={(e) => {
                                                            setImage(URL.createObjectURL(e.target.files[0]))
                                                        }}
                                                        id="image"
                                                        type="file"
                                                        name="profileImg"
                                                        accept="image/*"
                                                        className="hidden w-full text-sm text-gray-900 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-600 file:px-3 file:py-2 file:text-white hover:file:bg-indigo-500"
                                                    />
                                                </div>

                                                <div className='w-full'>
                                                    <label className="block font-semibold mb-2">Name</label>
                                                    <input
                                                        onChange={getValOrSetVal}
                                                        value={profileData.name}
                                                        type="text"
                                                        className="w-full border border-gray-300 rounded-md p-2"
                                                        placeholder="Name"
                                                        name="name"
                                                    />

                                                    <label className="block font-semibold mb-2">Email</label>
                                                    <input
                                                        onChange={getValOrSetVal}
                                                        value={profileData.email}
                                                        type="email"
                                                        className="w-full border border-gray-300 rounded-md p-2"
                                                        placeholder="Email"
                                                        name="email"
                                                    />

                                                    <label className="block font-semibold mb-2">Phone</label>
                                                    <input
                                                        onChange={getValOrSetVal}
                                                        value={profileData.phone}
                                                        type="number"
                                                        className="w-full border border-gray-300 rounded-md p-2"
                                                        placeholder="phone"
                                                        name="phone"
                                                    />
                                                </div>
                                            </div>

                                            <div className="mt-6 flex items-center gap-x-6">
                                                <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer">Submit</button>
                                            </div>
                                        </form>
                                    </>
                                }

                                {
                                    activeTab === "tab2" &&
                                    <div>
                                        <label className="block font-semibold mb-2">Current Password</label>
                                        <input
                                            type="password"
                                            className="w-full border border-gray-300 rounded-md p-2"
                                            placeholder="Current Password"
                                            name="current_password"
                                        />

                                        <label className="block font-semibold mb-2">New Password</label>
                                        <input
                                            type="password"
                                            className="w-full border border-gray-300 rounded-md p-2"
                                            placeholder="New Password"
                                            name="new_password"
                                        />

                                        <label className="block font-semibold mb-2">Confirm Password</label>
                                        <input
                                            type="password"
                                            className="w-full border border-gray-300 rounded-md p-2"
                                            placeholder="Confirm Password"
                                            name="confirm_password"
                                        />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
