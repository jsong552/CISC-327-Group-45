import React, { useEffect, useState } from 'react';
import { Order } from './Order';
import { doc, DocumentSnapshot, getDoc } from 'firebase/firestore';
import db from '../firebase';
import { format } from 'date-fns';

export const Sales = () => {

    const [orderData, setOrderData] = useState<Order[]>([]);

    useEffect(() => {
        const docRef = doc(db, "PharmaData", "orders");

        getDoc(docRef).then((docSnap) => {
            if (docSnap.exists()) {
                const data: Order[] = docSnap.data().data;
                setOrderData(data);
            }
            else {
                console.log("No such document");
            }
        }).catch((error) => {
            console.log("Error getting the document: ", error);
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
                    <div className="flex">
                        <div className="p-12 flex gap-4 h-6">
                            <p className="text-4xl font-semibold text-stone-700">Sales</p>
                        </div>
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

