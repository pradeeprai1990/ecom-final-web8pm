import ProductCart from '@/app/common/ProductCart'
import React from 'react'

export default function ProductList({ data }) {
    return (
        <>
        <div className='grid grid-cols-3 gap-5'>
            {
                data.map((data, index)=>{
                    return(
                        <ProductCart key={index} data={data}/>    
                    )
                })
            }
        </div>
        </>
    )
}
