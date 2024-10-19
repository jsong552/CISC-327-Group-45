import React from 'react'
import { DashboardComponent } from '../components/DashboardComponent.tsx'
import { DashboardComponentTwo } from '../components/DashboardComponentTwo.tsx'

export const Dashboard = () => {
    return (
        <div className='w-full'>
            <div className="bg-[#edf1f5]">
                <div className="p-12 border">
                    <p className="text-4xl font-semibold">Dashboard</p>
                    <p className="text-xl mt-2">Overview of th pharmacy information</p>
                    <div className="gap-4 grid grid-cols-3 mx-6 mt-12">
                        <DashboardComponent 
                            borderColor={"#59c39c"} 
                            image="/addMedicinesIcon.svg" 
                            title="Add Medicines"
                            subtitle="To Inventory"
                            desc="Add Medicines"
                            color="#a6dbcb"
                            link=""
                        />
                        <DashboardComponent 
                            borderColor={"#fdd70b"} 
                            image="/viewSalesIcon.svg"
                            title="View Sales"
                            subtitle="of the Year"
                            desc="View Detailed Report"
                            color="#f2e9ac"
                            link=""
                        />
                        <DashboardComponent 
                            borderColor={"#36b8f5"} 
                            image="/medicinesAvailableIcon.svg"
                            title="298"
                            subtitle="Medicines Available"
                            desc="View Inventory"
                            color="#a7dcf5"
                            link=""
                        />
                    </div>
                </div>
            </div>
            <div className="px-8 grid grid-cols-2 gap-8 mt-32 mb-32">
                <DashboardComponentTwo 
                    no1="298"
                    no2="24"
                    title="Inventory"
                    subtitle="Go to Configuration"
                    text1="Total no. of Medicines"
                    text2="Medicine Groups"
                />
                <DashboardComponentTwo 
                    no1="70,856"
                    no2="5,288"
                    title="Quick Report"
                    subtitle="October 2024"
                    text1="Qty. of Medicines Sold"
                    text2="Invoices Generated"
                />
            </div>
        </div>
    )
}
