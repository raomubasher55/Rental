import AdminCard from '@/components/AdminCards/AdminCard'
import CompanyCard from '@/components/CompanyCards/CompanyCard'
import AdminLayout from '@/components/layout/AdminLayout'
import React from 'react'

const CompanyDashboard = () => {
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold">Company Dashboard</h1>
        <CompanyCard />
      </div>
    </>
  )
}

export default CompanyDashboard
