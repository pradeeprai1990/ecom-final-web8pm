import Breadcrumb from '@/app/common/Breadcrumb'
import React from 'react'
import DashBoardList from './DashBoardList'

export default function MyDashboard() {
    let pageName = 'My Dashboard'
    return (
        <div>
            <Breadcrumb pageName={pageName} />
            <DashBoardList />
        </div>
    )
}
