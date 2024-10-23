/**
 * Represents the Inventory component.
 * This component displays a list of medicines in the inventory.
 */
import React, { useState, useEffect } from 'react';
import { data, removeByIndex } from './medicineData.tsx';  // Importing the same `data` from medicineData.ts
import { Medicine } from './AddMedicine.tsx';
import { useNavigate } from 'react-router-dom';

export const Inventory = () => {

    const [inv, setInv] = useState<Medicine[]>(data);
    
    const navigate = useNavigate();

    const medicinesData = inv.map((medicine, index) => {
        return (
            <div
                className="flex flex-row ml-12 border border-gray-400 rounded round-xl w-5/6 justify-between"
                data-testid={`medicine-item-${index}`}  // Adding test id to each medicine item
            >
                <p className='w-1/4 text-center p-4' data-testid={`medicine-name-${index}`}>{medicine.name}</p>
                <p className='w-1/4 text-center p-4' data-testid={`medicine-id-${index}`}>{medicine.id}</p>
                <p className='w-1/4 text-center p-4' data-testid={`medicine-quantity-${index}`}>{medicine.quantity}</p>
                <button
                    type="button"
                    className="text-center w-1/4 bg-[#F0483E] text-white"
                    data-testid={`remove-button-${index}`}
                    onClick={() => {
                        removeByIndex(index);
                        setInv([...data]);
                    }}
                >
                    <p>Remove Item</p>
                </button>
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

                        
                    </div>
                </div>

                <div className="ml-12">
                    <p className="text-lg">List of medicines available for sales.</p>
                </div>

                <div className="flex flex-row w-5/6 items-center mt-12 ml-12 justify-between">
                    <div className="flex bg-[#E3EBF3] rounded">
                        <input
                            type='text'
                            placeholder='Search Medicine Inventory...'
                            className="text-[12px] px-2 py-5 focus:outline-none bg-[#e3ebf3] text-black h-2 w-80"
                            data-testid="search-input"  // Test id for the search input
                        />
                        <img
                            src="./searchicon.svg"
                            alt="search icon"
                            className="right-0 p-3"
                            data-testid="search-icon"  // Test id for the search icon
                        />
                    </div>
                    <button
                        type="button"
                        className='w-46 bg-[#19557f] rounded-md'
                        data-testid="add-new-item-button"  // Test id for the Add New Item button
                        onClick={() => navigate("/addmedicine")}
                    >
                        <div className="flex gap-2 mt-1 p-2">
                            <img src='./plusIcon.svg' alt="plus icon" />
                            <p className="text-white">Add New Item</p>
                        </div>
                    </button>
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
