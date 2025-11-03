import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';

export default function Address() {
    let token = useSelector((store) => store.user.token)
    let userId = useSelector((store) => store.user.user.id)
    let apiBAseUrl = process.env.NEXT_PUBLIC_APIBASEURL
    let [billingFormVal, setBillingFormVal] = useState({
        billingName: "",
        billingEmail: "",
        billingMobNo: "",
        billingAddress: "",
        country: "",
        state: "",
        city: "",
    })

    let [shippingFormVal, setShippingFormVal] = useState({
        shippingName: "",
        shippingEmail: "",
        shippingMobNo: "",
        shippingAddress: "",
        shippingCountry: "",
        shippingState: "",
        shippingCity: ""
    })

    let getValAndSetValBilling = (e) => {
        let obj = { ...billingFormVal }
        let inputName = e.target.name
        let inputVal = e.target.value
        obj[inputName] = inputVal
        setBillingFormVal(obj)
    }

    let getValAndSetValShipping = (e) => {
        let obj = { ...shippingFormVal }
        let inputName = e.target.name
        let inputVal = e.target.value
        obj[inputName] = inputVal
        setShippingFormVal(obj)
    }

    let saveBillingAddress = (e) => {
        e.preventDefault()
        axios.post(`${apiBAseUrl}user-auth/save-Profile-billing`, billingFormVal, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((resApi) => resApi.data)
            .then((finalData) => {
                console.log(finalData);
                if (finalData.status == 1) {
                    toast.success(finalData.msg)
                }
            })
    }

    let saveShippingAddress = (e) => {
        e.preventDefault()
        axios.post(`${apiBAseUrl}user-auth/save-Profile-shipping`, shippingFormVal, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((resApi) => resApi.data)
            .then((finalData) => {
                console.log(finalData);
                if (finalData.status == 1) {
                    toast.success(finalData.msg)
                }
            })
    }

    useEffect(() => {
        if (userId) {
            axios.post(`${apiBAseUrl}user-auth/profile-view`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((apiRes) => apiRes.data)
                .then((finalData) => {
                    let { billingAddrerss, shippingAddress } = finalData.data;
                    setBillingFormVal(billingAddrerss)
                    setShippingFormVal(shippingAddress)
                })
        }

    }, [userId])



    return (
        <div>
            <ToastContainer />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Address</h3>
            <p>The following addresses will be used on the checkout page by default.</p>
            <div className='grid grid-cols-2 gap-5'>
                <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-4">Billing Address</h3>
                    <div className='border-1 border-[#eee] p-5'>
                        <form onSubmit={saveBillingAddress}>
                            <div className="mb-5">
                                <label htmlFor="billingName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Billing Name *</label>
                                <input onChange={getValAndSetValBilling} value={billingFormVal.billingName} type="text" id="billingName" name='billingName' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="billingEmail" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Billing Email *</label>
                                <input onChange={getValAndSetValBilling} value={billingFormVal.billingEmail} type="text" id="billingEmail" name='billingEmail' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="billingMobNo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Billing Mobile Number *</label>
                                <input onChange={getValAndSetValBilling} value={billingFormVal.billingMobNo} type="text" id="billingMobNo" name='billingMobNo' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="billingAddress" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Billing Address *</label>
                                <input onChange={getValAndSetValBilling} value={billingFormVal.billingAddress} type="text" id="billingAddress" name='billingAddress' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country *</label>
                                <input onChange={getValAndSetValBilling} value={billingFormVal.country} type="text" id="country" name='country' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">State *</label>
                                <input onChange={getValAndSetValBilling} value={billingFormVal.state} type="text" id="state" name='state' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City *</label>
                                <input onChange={getValAndSetValBilling} value={billingFormVal.city} type="text" id="city" name='city' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div className="mb-5">
                                <button className='bg-amber-500 p-2 rounded text-white cursor-pointer'>UPDATE</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-4">Shipping Address</h3>
                    <div className='border-1 border-[#eee] p-5'>
                        <form onSubmit={saveShippingAddress}>
                            <div className="mb-5">
                                <label htmlFor="shippingName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Shipping Name *</label>
                                <input onChange={getValAndSetValShipping} value={shippingFormVal.shippingName} type="text" id="shippingName" name='shippingName' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="shippingEmail" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Shipping Email *</label>
                                <input onChange={getValAndSetValShipping} value={shippingFormVal.shippingEmail} type="text" id="shippingEmail" name='shippingEmail' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="shippingMobNo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Shipping Mobile Number *</label>
                                <input onChange={getValAndSetValShipping} value={shippingFormVal.shippingMobNo} type="text" id="shippingMobNo" name='shippingMobNo' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="shippingAddress" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Shipping Address *</label>
                                <input onChange={getValAndSetValShipping} value={shippingFormVal.shippingAddress} type="text" id="shippingAddress" name='shippingAddress' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="shippingCountry" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country *</label>
                                <input onChange={getValAndSetValShipping} value={shippingFormVal.shippingCountry} type="text" id="shippingCountry" name='shippingCountry' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="shippingState" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">State *</label>
                                <input onChange={getValAndSetValShipping} value={shippingFormVal.shippingState} type="text" id="shippingState" name='shippingState' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="shippingCity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City *</label>
                                <input onChange={getValAndSetValShipping} value={shippingFormVal.shippingCity} type="text" id="shippingCity" name='shippingCity' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div className="mb-5">
                                <button className='bg-amber-500 p-2 rounded text-white cursor-pointer'>UPDATE</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
