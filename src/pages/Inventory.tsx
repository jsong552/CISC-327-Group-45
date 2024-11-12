/**
 * @file This file defines the Inventory component.
 * This component allows users to view, edit, and delete medicine details.
 *
 * The page fetches the current inventory from the Firestore database upon initial load.
 * Users can search for medicines by name
 * Each listed medicine can be edited or deleted directly from this page.
 *
 * ## How to navigate here:
 * Rendered by navigating to the Inventory page from either the sidebar or the dashboard.
 *
 * 
 * Updates made to the inventory on this page are pushed to the Firestore database.
 *
 * ## How it works:
 * 1. Fetches initial medicine data from Firestore. 
 * 2. Allows user to search through the inventory using name
 * 3. User can modify medicine details which are then saved back to the database.
 * 4. User can remove medicines from the inventory.
 */

import React, { useState, useEffect } from 'react';
import { Medicine } from './AddMedicine.tsx';
import { useNavigate } from 'react-router-dom';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import db from '../firebase.js';

export const Inventory = () => {
    const [inv, setInv] = useState<Medicine[]>([]);

    // this state holds the inventory, does not change after initialization
    const [dataInv, setDataInv] = useState<Medicine[]>([]);

    const [search, setSearch] = useState<string>("");
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const docRef = doc(db, "PharmaData", "medicine");
        getDoc(docRef)
            .then((docSnap) =>{
            if(docSnap.exists()){
                const data: Medicine[] = docSnap.data().medicines;
                setInv(data);
                setDataInv(data);
            }
        });
    }, []);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { value } = e.target;
        setSearch(value);
    }

    function handleSearch() {
        setInv(() => {
            const newInv: Medicine[] = [];
            for (let i = 0; i < dataInv.length; i++) {
                if (dataInv[i].name.toUpperCase().includes(search.toUpperCase()) || dataInv[i].quantity.toUpperCase().includes(search.toUpperCase()) || dataInv[i].usage?.toUpperCase()?.includes(search.toUpperCase()) || dataInv[i].sideEffects?.toUpperCase()?.includes(search.toUpperCase())) {
                    newInv.push(dataInv[i]);
                }
            }

            return newInv;
        });

    }
    const handleEditToggle = (index: number) => {
        setEditIndex(index === editIndex ? null : index);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string, index: number) => {
        const value = e.target.value;
        setInv((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [field]: value };
            return updated;
        });
    };

    const handleSave = async (index: number) => {
        const updatedMedicines = [...inv];
        setEditIndex(null);
        await updateDb(updatedMedicines);
    };

    const handleRemove = (index: number) => {
        setInv((prev) => {
            const updated = [...prev];
            updated.splice(index, 1);
            updateDb(updated);
            return updated;
        });
    };

    

    async function updateDb(data: Medicine[]) {
        const docRef = doc(db, "PharmaData", "medicine");
        await updateDoc(docRef, {
            medicines: data,
        });
    }

    const medicinesData = inv.map((medicine, index) => (
        <div
            key={index}
            className="flex flex-row ml-12 border border-gray-400 rounded round-xl w-5/6 justify-between items-center"
            data-testid={`medicine-item-${index}`}
        >
            {editIndex === index ? (
                <>
                    <input
                        type="text"
                        data-testid="edit-name"
                        value={medicine.name}
                        className="w-1/4 text-center p-4"
                        onChange={(e) => handleInputChange(e, 'name', index)}
                    />
                    <input
                        type="text"
                        data-testid="edit-id"
                        value={medicine.id}
                        className="w-1/4 text-center p-4"
                        onChange={(e) => handleInputChange(e, 'id', index)}
                    />
                    <input
                        type="number"
                        data-testid="edit-quantity"
                        value={medicine.quantity}
                        className="w-1/4 text-center p-4"
                        onChange={(e) => handleInputChange(e, 'quantity', index)}
                    />
                    <button
                        type="button"
                        data-testid="save-edits-button"
                        className="text-center w-1/6 bg-green-500 text-white p-2 mx-1 rounded"
                        onClick={() => handleSave(index)}
                    >
                        Save
                    </button>
                </>
            ) : (
                <>
                    <p className="w-1/4 text-center p-4">{medicine.name}</p>
                    <p className="w-1/4 text-center p-4">{medicine.id}</p>
                    <p className="w-1/4 text-center p-4">{medicine.quantity}</p>
                    <div className="flex w-1/4 justify-around">
                        <button
                            type="button"
                            className="text-center bg-blue-500 text-black p-2 rounded w-1/2 mx-1"
                            onClick={() => handleEditToggle(index)}
                            data-testid="edit-button"
                        >
                            Edit
                        </button>
                        <button
                            type="button"
                            data-testid="delete-button"
                            className="text-center bg-red-500 text-black p-2 rounded w-1/2 mx-1"
                            onClick={() => handleRemove(index)}
                        >
                            Remove
                        </button>
                    </div>
                </>
            )}
        </div>
    ));

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
                    <p className="text-lg" data-testid="tweaker">List of medicines available for sales.</p>
                </div>

                <div className="flex flex-row w-5/6 items-center mt-12 ml-12 justify-between">
                    <div className="flex bg-[#E3EBF3] rounded">
                        <input
                            type='text'
                            placeholder='Search Medicine Inventory...'
                            className="text-lg px-2 py-5 focus:outline-none bg-[#e3ebf3] text-black h-2 w-80"
                            data-testid="search-input"  // Test id for the search input
                            value={search}
                            onChange={(e) => handleChange(e)}
                        />
                        <img
                            src="./searchicon.svg"
                            alt="search icon"
                            className="right-0 p-3 hover:cursor-pointer"
                            data-testid="search-icon" 
                            onClick={() => {
                                handleSearch();
                            }}
                        />
                    </div>
                    <button
                        type="button"
                        className='w-46 bg-[#19557f] rounded-md'
                        data-testid="add-new-item-button"
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
};
