import axios from 'axios'
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import { loginContext } from '../../context/MainContext';

export default function Login() {
  let { id, setId } = useContext(loginContext)
  let apiBaseUrl = import.meta.env.VITE_APIBASEURL
  let navigate = useNavigate()
  let login = (e) => {
    e.preventDefault()
    let formValue = new FormData(e.target)
    axios.post(`${apiBaseUrl}admin-auth/login`, formValue)
      .then((apiRes) => apiRes.data)
      .then((finalData) => {
        if (finalData.status == 0) {
          toast.error(finalData.msg)
          e.target.reset()
        } else {
          console.log(finalData);
          setId(finalData.chkCredential._id);
        }
      })
  }

  useEffect(() => {
    if (id) {
      navigate("/dashboard")
    }
  }, [id])

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <ToastContainer />
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex justify-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="w-[60%]" src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/company-profile/logo/cccfbdab-3bec-439f-88b9-5694698cd302-1670132652.png" alt="logo" />
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form onSubmit={login} className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                </div>
                <button type="submit" className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 cursor-pointer">Sign in</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
