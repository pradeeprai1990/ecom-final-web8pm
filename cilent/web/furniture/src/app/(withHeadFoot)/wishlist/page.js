import React from 'react'
import WishListView from './WishListView'
import Breadcrumb from '@/app/common/Breadcrumb'

export default function Wishlist() {
  let pageName = 'My Wishlist'
  return (
    <div>
      <Breadcrumb pageName={pageName} />
      <WishListView />
    </div>
  )
}
