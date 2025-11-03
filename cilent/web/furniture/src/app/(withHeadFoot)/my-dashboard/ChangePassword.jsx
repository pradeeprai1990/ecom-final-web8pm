import axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';

export default function ChangePassword() {
    let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL
    let token = useSelector((store) => store.user.token)

    let changePwd = (e) => {
        e.preventDefault()
        let obj = {
            cur_password: e.target.cur_password.value,
            new_password: e.target.new_password.value,
            cnf_password: e.target.cnf_password.value,
        }

        axios.post(`${apiBaseUrl}user-auth/change-password`, obj,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((apiRes)=>apiRes.data)
            .then((finalData)=>{
                console.log(finalData);
                if(finalData.status == 0){
                    toast.error(finalData.msg)
                }else{
                    toast.success(finalData.msg)
                    e.target.reset()
                }
            })

    }

    return (
        <div>
            <ToastContainer />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-4">Change Password</h3>
            <div className='border-1 border-[#eee] p-5'>
                <form onSubmit={changePwd}>
                    <div className="mb-5">
                        <label htmlFor="cur_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Current Password</label>
                        <input type="text" name='cur_password' id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="new_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                        <input type="text" name='new_password' id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="cnf_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                        <input type="text" name='cnf_password' id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <div className="mb-5">
                        <button className='bg-amber-500 p-2 rounded text-white cursor-pointer'>UPDATE</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
