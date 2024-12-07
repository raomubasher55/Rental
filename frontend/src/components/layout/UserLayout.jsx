import React from 'react'
import Layout from './Layout'
import { SidebarProvider } from '../ui/sidebar'
import CompanySidebar from '../CompanySidebar/CompanySidebar'
import { Outlet } from 'react-router'
import UserSidebar from '../Sidebar/UserSidebar'

const UserLayout = () => {
  return (
    <div>
      <Layout>
            <SidebarProvider>
                <div className="flex flex-col h-screen">
                    <div className="flex flex-1 overflow-hidden">
                        <UserSidebar/>

                        {/* Main content */}
                        <div className="flex-1 p-6 overflow-auto min-w-0">
                            <Outlet /> 
                        </div>
                    </div>
                </div>
            </SidebarProvider>
        </Layout>
    </div>
  )
}

export default UserLayout
