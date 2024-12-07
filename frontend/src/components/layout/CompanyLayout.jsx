import React from 'react'
import Layout from './Layout'
import { SidebarProvider } from '../ui/sidebar'
import CompanySidebar from '../CompanySidebar/CompanySidebar'
import { Outlet } from 'react-router'

const CompanyLayout = () => {
  return (
    <div>
      <Layout>
            <SidebarProvider>
                <div className="flex flex-col h-screen w-full">
                    <div className="flex flex-1 overflow-hidden">
                        <CompanySidebar/>

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

export default CompanyLayout
