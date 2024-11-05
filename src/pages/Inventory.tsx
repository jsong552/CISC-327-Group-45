/**
 * Represents the Inventory component.
 * This component displays a list of medicines in the inventory.
 */
import React, { useState, useEffect } from 'react';
import { data, removeByIndex } from './medicineData.tsx';  // Importing the same `data` from medicineData.ts
import { Medicine } from './AddMedicine.tsx';
import { useNavigate } from 'react-router-dom';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import db from '../firebase.js';


/**
 * Represents the Inventory component.
 * This component displays a list of medicines in the inventory.
 */





export const Inventory = () => {

    const [inv, setInv] = useState<Medicine[]>([]);

    // this state holds the inventory, does not change after initialization
    const [dataInv, setDataInv] = useState<Medicine[]>([]);

    const [search, setSearch] = useState<string>("");

    const navigate = useNavigate();

    useEffect(() => {
        const docRef = doc(db, "PharmaData", "medicine");
    
        getDoc(docRef)
            .then((docSnap) =>{
            if(docSnap.exists()){
                const data: Medicine[] = docSnap.data().medicines;
                setInv(data);
                setDataInv(data);
            } else {
                console.log("No such document")
            }


            }).catch((error) => {
                console.log("Error getting document:", error);
            }
        );
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

    const medicinesData = inv.map((medicine, index) => {
        return (
            <div
                className="flex flex-row ml-12 border border-gray-400 rounded round-xl w-5/6 justify-between"
                data-testid={`medicine-item-${index}`} 
            >
                <p className='w-1/4 text-center p-4' data-testid={`medicine-name-${index}`}>{medicine.name}</p>
                <p className='w-1/4 text-center p-4' data-testid={`medicine-id-${index}`}>{medicine.id}</p>
                <p className='w-1/4 text-center p-4' data-testid={`medicine-quantity-${index}`}>{medicine.quantity}</p>
                <button
                    type="button"
                    className="text-center w-1/4 bg-[#F0483E] text-white"
                    data-testid={`remove-button-${index}`}
                    onClick={() => {
                        setInv((prev) => { 
                            const newMedicineArray = [...prev];
                            newMedicineArray.splice(index, 1);
                            updateDb(newMedicineArray);

                            return newMedicineArray
                        });
                    }}
                >
                    <p>Remove Item</p>
                </button>
            </div>
        );
    });

    async function updateDb(data: Medicine[]) {
        const docRef = doc(db, "PharmaData", "medicine");
        await updateDoc(docRef, {
          medicines: data
        });
    }

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
