import AdminCard from '@/components/AdminCards/AdminCard'
import AdminLayout from '@/components/layout/AdminLayout'
import React from 'react'

const Dashboard = () => {
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <AdminCard />
      </div>
    </>
  )
}

export default Dashboard
