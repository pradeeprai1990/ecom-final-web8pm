import React, { useContext, useEffect } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import { Outlet, useNavigate } from 'react-router'
import Footer from './Footer'
import { loginContext } from '../../context/MainContext'
import axios from 'axios'

export default function Layout() {
    let apiBaseUrl = import.meta.env.VITE_APIBASEURL
    let navigate = useNavigate()
    let { id, setId } = useContext(loginContext)
    useEffect(() => {
        if (id == '' || id == null || id == undefined) {
            navigate('/')
        } else {
            axios.get(`${apiBaseUrl}admin-auth/check-id/${id}`)
                .then((apiRes) => apiRes.data)
                .then((finalData) => {
                    if (finalData.status == 0) {
                         setId('')
                    } 
                })
        }
    }, [id])
    return (
        <>
            <section className='grid grid-cols-[17%_auto]'>
                <aside>
                    <Sidebar />
                </aside>
                <div>
                    <Header />
                    <Outlet />
                    <Footer />
                </div>
            </section>
        </>
    )
}
