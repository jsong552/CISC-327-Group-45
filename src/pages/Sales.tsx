/**
 * The Sales component displays a summary of all orders made.
 * It fetches and lists each order's details including medicine name, quantity, and total price.
 *
 * ## How to navigate here:
 * Accessed via the "Sales" button on the sidebar and Dashboard.
 *
 *
 * ## How it works:
 * 1. Fetches sales data from Firestore.
 * 2. Renders a table displaying each sale's detailed information.
 * 3. Provides a user interface for navigation back to order creation.
 */

import React, { useEffect, useState } from 'react';
import { Order } from './Order';
import { doc, DocumentSnapshot, getDoc } from 'firebase/firestore';
import db from '../firebase';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

export const Sales = () => {

    const [orderData, setOrderData] = useState<Order[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        const docRef = doc(db, "PharmaData", "orders");

        getDoc(docRef).then((docSnap) => {
            if (docSnap.exists()) {
                const data: Order[] = docSnap.data().data;
                setOrderData(data);
            }
            
        }).catch((error) => {
           
        });
    }, []);

    const data = orderData.map((data, index) => {
        return (
            <div className='flex flex-row w-full' key={index}>
                <div className='border border-gray round-md p-4 w-1/5'>
                    <p className="text-center">{data.id}</p>
                </div>
                <div className='border border-gray round-md p-4 w-1/5'>
                    <p className="text-center">{format(data.createdAt.toDate(), 'yyyy-MM-dd HH:mm:ss')}</p>
                </div>
                <div className='border border-gray round-md p-4 w-1/5'>
                    <p className="text-center">{data.name}</p>
                </div>
                <div className='border border-gray round-md p-4 w-[12.5%]'>
                    <p className="text-center">{data.quantity}</p>
                </div>
                <div className='border border-gray round-md p-4 w-[12.5%]'>
                    <p className="text-center">${data.price}</p>
                </div>
                <div className='border border-gray round-md p-4 w-[15%]'>
                    <p className="text-center">${Number(data.price) * Number(data.quantity)}</p>
                </div>
            </div>
        )
    });
 
    return (
        <div className='w-full'>
                <div className='bg-white'>
                    <div className="flex flex-row items-end justify-between w-5/6 m-12">
                        <div className="h-6">
                            <p className="text-4xl font-semibold text-stone-700">Sales</p>
                        </div>

                        <button 
                            className='bg-red-500 hover:bg-red-400 text-white rounded-xl py-3 px-6 text-xl relative top-[50px]'
                            onClick={() => navigate("/order")}
                            data-testid="order-button"
                        >
                            Make Order
                        </button>
                    </div>

                    <div className="ml-12">
                        <p className="text-lg">All sales of the pharmacy.</p>
                    </div>


                    <div className="flex flex-col ml-12 mt-6 border border-gray-400  rounded w-5/6">
                        <div className="flex flex-row w-full border-b border-b-black">
                            <div className='border border-gray round-md p-4 w-1/5'>
                                <p className="text-center font-bold">Order ID</p>
                            </div>
                            <div className='border border-gray round-md p-4 w-1/5'>
                                <p className="text-center font-bold">Date Ordered</p>
                            </div>
                            <div className='border border-gray round-md p-4 w-1/5'>
                                <p className="text-center font-bold">Medicine Name</p>
                            </div>
                            <div className='border border-gray round-md p-4 w-[12.5%]'>
                                <p className="text-center font-bold">Quantity</p>
                            </div>
                            <div className='border border-gray round-md p-4 w-[12.5%]'>
                                <p className="text-center font-bold">Price Per Unit</p>
                            </div>
                            <div className='border border-gray round-md p-4 w-[15%]'>
                                <p className="text-center font-bold">Total</p>
                            </div>
                        </div>
                        {data}



                    </div>
                </div>
            </div>
    );
};

