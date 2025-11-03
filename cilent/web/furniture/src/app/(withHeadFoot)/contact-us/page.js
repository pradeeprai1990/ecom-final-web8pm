import React from 'react'
import MapLocation from './MapLocation'
import Breadcrumb from '@/app/common/Breadcrumb'

export default function ContactUs() {
    let pageName = 'Contact us'
  return (
    <div>
        <Breadcrumb pageName={pageName} />
        <MapLocation />
    </div>
  )
}
