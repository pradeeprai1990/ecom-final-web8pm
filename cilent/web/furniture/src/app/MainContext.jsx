"use client"
import React, { createContext, useEffect, useState } from 'react'

export let cartContext = createContext()

export default function MainContext({ children }) {

    let [cart, setCart] = useState([])

    let obj = {
        cart,
        setCart
    }

    useEffect(()=>{
        let saveCart = localStorage.getItem("MONSTACART")
        if(saveCart){
            setCart(JSON.parse(saveCart))
        }
    },[])

    useEffect(()=>{
        localStorage.setItem("MONSTACART",JSON.stringify(cart))
    },[cart])

    return (
        <cartContext.Provider value={obj}>
            {children}
        </cartContext.Provider>
    )
}
