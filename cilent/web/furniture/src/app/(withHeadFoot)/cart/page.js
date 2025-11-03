import React from 'react'
import CartList from './CartList'
import Breadcrumb from '@/app/common/Breadcrumb'
import CartTotal from './CartTotal'

export default function () {
    let pageName = 'Shopping Cart'
    return (
        <div>
            <Breadcrumb pageName={pageName} />
            <CartList />
            <CartTotal />
        </div>
    )
}
