import React from 'react'
import Breadcrumb from '@/app/common/Breadcrumb'
import ProductFilter from './ProductFilter'
import ProductList from './ProductList'
import { productApi } from '@/api-services/ProductServices'


export default async function Products() {

    let productApiData = await productApi()
    let pageName = 'Product Listing'
    return (
        <div>
            <Breadcrumb pageName={pageName} />
            <div className='max-w-[1320px] mt-[50px] mx-auto grid grid-cols-[20%_auto] gap-5'>
                <ProductFilter />
                <ProductList data={productApiData} />
            </div>
        </div>
    )
}
