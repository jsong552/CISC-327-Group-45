import React from 'react';
import { data } from './medicineData.tsx';  // Importing the same `data` from medicineData.ts

/**
 * Represents the Inventory component.
 * This component displays a list of medicines in the inventory.
 */

export const Inventory = () => {

    const inv = data;


    /**
     * Represents the rendered list of medicines in the inventory.
     * @type {JSX.Element[]}
     */
    const medicinesData = inv.map((medicine, index) => {
        return (
            <div className="flex flex-row ml-12 border border-gray-400 rounded round-xl w-5/6 justify-between">
                <p className='w-1/4 text-center p-4'>{medicine.name}</p>
                <p className='w-1/4 text-center p-4'>{medicine.id}</p>
                <p className='w-1/4 text-center p-4'>{medicine.quantity}</p>
                <button type="button" className="text-center w-1/4 bg-[#F0483E] text-white"><p className=''>Remove Item</p></button>
            </div>
        );
    });



    return (

        <div className='w-full'>

            <div className='bg-white'>

                <div className="flex">
                    <div className="p-12 flex gap-4 h-6">
                        <p className="text-4xl font-semibold text-stone-700">Inventory</p>
                        <img src="./arrow.svg" alt="arrow" className="mt-5 size-3" />
                        <p className="text-3xl font-semibold text-stone-700 mt-1.5">List of Medicines</p>

                        <button type="button" className='mt-20 h-12 w-46 bg-[#F0483E] rounded-md'>
                            <div className="flex gap-2 mt-0.5 p-2">
                                <img src='./plusIcon.svg' alt="plus icon" />
                                <p className="text-white ">Add New Item</p>

                            </div>
                        </button>

                    </div>

                </div>

                <div className="ml-12">
                    <p className="text-lg">List of medicines available for sales.</p>
                </div>


                <div className="bg-[#F7FAFD] flex items-center w-1/6 mt-12 ml-12">

                    <div className="flex bg-[#E3EBF3] rounded">
                        <input

                            type='text'
                            placeholder='Search Medicine Inventory...'
                            className="text-[12px] px-2 py-5 focus:outline-none bg-[#e3ebf3] text-black h-2 w-80"
                        />

                        <img
                            src="./searchicon.svg"
                            alt="search icon"
                            className="right-0 p-3"


                        />
                    </div>
                </div>

                <div className="flex flex-col">

                    <div className="flex flex-row ml-12 mt-6 border border-gray-400 rounded round-xl w-5/6 justify-between">
                        <div className='border border-gray round-md p-4 w-1/4'>
                            <p className="text-center font-bold">Medicine Name</p>
                        </div>
                        <div className='border border-gray round-md p-4 w-1/4'>
                            <p className="text-center font-bold">Medicine ID</p>
                        </div>
                        <div className='border border-gray round-md p-4 w-1/4'>
                            <p className="text-center font-bold">Stock in Qty</p>
                        </div>
                        <div className='border border-gray round-md p-4 w-1/4'>
                            <p className="text-center font-bold">Action</p>
                        </div>
                    </div>

                    {medicinesData}

                </div>
            </div>
        </div>
    );
}


