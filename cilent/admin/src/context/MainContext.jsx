import React, { createContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
export let loginContext = createContext()
export default function MainContext({ children }) {
    let [id, setId] = useState(Cookies.get("ID") ?? '')
    useEffect(() => {
        Cookies.set("ID", id)
    }, [id])

    let obj = { id, setId }

    return (
        <loginContext.Provider value={obj}>
            {children}
        </loginContext.Provider>
    )
}
