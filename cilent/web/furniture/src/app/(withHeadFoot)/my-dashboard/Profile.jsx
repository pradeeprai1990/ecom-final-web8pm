import React from 'react'

export default function Profile() {
    return (
        <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-4">My Profile</h3>
            <div className='border-1 border-[#eee] p-5'>
                <form>
                    <div className="mb-5 flex gap-5">
                        <input type="radio" value={1} name='title' />Mr.
                        <input type="radio" value={2} name='title' />Mrs.
                    </div>
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name *</label>
                        <input type="text" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address *</label>
                        <input type="text" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <div className="mb-5">
                        <button className='bg-amber-500 p-2 rounded text-white'>UPDATE</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
