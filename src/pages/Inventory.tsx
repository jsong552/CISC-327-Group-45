import React from 'react';
import {data} from './inven_list';
export const Inventory = () => {
    const inv = data.medicines
    console.log(inv);
    return (
        <div className='w-full'>
            <div className='bg-white'>
                <div className="p-12 flex gap-4">
                    <p className="text-4xl font-semibold text-stone-700">Inventory</p>
                    <img src="./arrow.svg" alt="arrow" className="mt-5 size-3"/>
                    <p className="text-3xl font-semibold text-stone-700 mt-1">List of Medicines (520)</p>
                </div>
                <div>
                    <h1>Medicine List</h1>
                    <ul>
                        {inv.map((medicine, index) => (
                            <li key={index}>
                                <h2>{medicine.med_name}</h2>
                                <p>ID: {medicine.id ? medicine.id : 'Not available'}</p>
                                <p>Quantity: {medicine.qty ? medicine.qty : 'Not available'}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="ml-12">
                    <p className="text-lg">List of medicines available for sales.</p>
                </div>

            </div>
        </div>
    )
}
