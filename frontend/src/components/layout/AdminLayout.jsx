import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '../ui/sidebar';
import Layout from './Layout';
import AdminSidebar from '../AdminSidebar/AdminSidebar';

const AdminLayout = () => {


    return (
        <Layout>
            <SidebarProvider>
                <div className="flex flex-col h-screen w-full">
                    <div className="flex flex-2  overflow-hidden">
                        <AdminSidebar/>

                        {/* Main content */}
                        <div className="flex-1 p-6 overflow-auto w-full">
                            <Outlet /> 
                        </div>
                    </div>
                </div>
            </SidebarProvider>
        </Layout>
    );
};

export default AdminLayout;
