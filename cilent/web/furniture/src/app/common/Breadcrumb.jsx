import Link from 'next/link'
import React from 'react'

export default function Breadcrumb({ pageName }) {
    return (
        <div className='py-5 bg-green-100'>
            <h1 className='text-center font-bold text-[40px]'>{pageName}</h1>
            <div className='text-center'><Link href={'/'}>Home</Link> {">"} {pageName}</div>
        </div>
    )
}
