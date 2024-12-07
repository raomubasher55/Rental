import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Overview from '../Overview/Overview'

const AdminCard = () => {

    
    return (
        <>
            <div className="">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 ">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Categories</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">25</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Subcategories</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">120</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Rentals</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">500</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">$50,000</div>
                        </CardContent>
                    </Card>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Overview/>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default AdminCard
