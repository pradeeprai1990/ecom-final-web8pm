import Breadcrumb from '@/app/common/Breadcrumb'
import React from 'react'
import FaqView from './FaqView';

export default function Faq() {
    let pageName = 'Frequently Questions';
  return (
    <div>
        <Breadcrumb pageName={pageName} />
        <FaqView />
    </div>
  )
}
