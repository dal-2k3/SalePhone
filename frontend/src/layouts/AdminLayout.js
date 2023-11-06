import React, { Fragment, useState } from 'react'
import Header from '../components/Admin/header'
import Sidebar from '../components/Admin/Sidebar'

function AdminLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <Fragment>
            <div className="flex h-screen overflow-hidden">
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                    <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} ></Header>
                    <div>{children}</div>
                </div>
            </div>
        </Fragment>
    )
}
export default AdminLayout;