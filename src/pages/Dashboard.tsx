

/**
 * Represents the Dashboard component.
 * This component displays the main dashboard of the application.
 */

import React, { useState, useEffect} from 'react'
import { DashboardComponent } from '../components/DashboardComponent.tsx'
import { DashboardComponentTwo } from '../components/DashboardComponentTwo.tsx'
import { doc, getDoc } from 'firebase/firestore';
import db from '../firebase.js';
import { Medicine } from './AddMedicine.tsx';
import { Order } from './Order.tsx';
import { format } from 'date-fns';

export const Dashboard = () => {
    const [data, setData] = useState<Medicine[]>([]);
    const [quantity, setQuantity] = useState<number>(0);

    const [orderData, setOrderData] = useState<Order[]>([]);
    const [totalSold, setTotalSold] = useState<number>(0);

    useEffect(() => {
        const docRef = doc(db, "PharmaData", "medicine");

        getDoc(docRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    const medicineData: Medicine[] = docSnap.data().medicines;
                    setData(medicineData);
                    
                    let tempQuantity = 0;
                    for (let i = 0; i < medicineData.length; i++) {
                        tempQuantity += Number(medicineData[i].quantity); 
                    }
                    setQuantity(tempQuantity);
                }
            }).catch(() => {});

        const orderDocRef = doc(db, "PharmaData", "orders");
        getDoc(orderDocRef).then((docSnap) => {
            if (docSnap.exists()) {
                const orderData: Order[] = docSnap.data().data;
                setOrderData(orderData);

                let tempTotal = 0;
                for (let i = 0; i < orderData.length; i++) {
                    tempTotal += Number(orderData[i].quantity);
                }
                setTotalSold(tempTotal);
            }
        });
    }, []);

    return (
        <div className='w-full'>
            <div className="bg-[#edf1f5]">
                <div className="p-12 border" data-testid="todo-1">
                    <p className="text-4xl font-semibold">Dashboard</p>
                    <p className="text-xl mt-2">Overview of the pharmacy information</p>
                    <div className="gap-4 grid grid-cols-3 mx-6 mt-12">
                        <DashboardComponent 
                            borderColor={"#59c39c"} 
                            image="/addMedicinesIcon.svg" 
                            title="Add Medicines"
                            subtitle="To Inventory"
                            desc="Add Medicines"
                            color="#a6dbcb"
                            link="/addmedicine"
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
                            title={data.length}
                            subtitle="Medicines Available"
                            desc="View Inventory"
                            color="#a7dcf5"
                            link="/inventory"
                        />
                    </div>
                </div>
            </div>
            <div className="px-8 grid grid-cols-2 gap-8 mt-32 mb-32">
                <DashboardComponentTwo 
                    no1={quantity}
                    no2={data.length}
                    title="Inventory"
                    subtitle="Go to Configuration"
                    text1="Total no. of Medicines"
                    text2="Medicine Groups"
                    link="/inventory"
                />
                <DashboardComponentTwo 
                    no1={totalSold}
                    no2={orderData.length}
                    title="Quick Report"
                    subtitle={format(new Date(), 'MMMM yyyy')}
                    text1="Qty. of Medicines Sold"
                    text2="Invoices Generated"
                    link="/sales"
                />
            </div>
        </div>
    )
}
