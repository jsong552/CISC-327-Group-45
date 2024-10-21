import React from 'react';
import {data} from './inven_list';
export const Inventory = () => {
    






    const inv = data.medicines
    console.log(inv);
    return (
        <div className='w-full'>
            <div className='bg-white'>

                <div className="flex">
                    <div className="p-12 flex gap-4 h-6">
                            <p className="text-4xl font-semibold text-stone-700">Inventory</p>
                            <img src="./arrow.svg" alt="arrow" className="mt-5 size-3"/>
                            <p className="text-3xl font-semibold text-stone-700 mt-1.5">List of Medicines</p>

                            <button type="button" className='ml-80 mt-20 h-12 w-46 bg-[#F0483E] rounded-md'>
                                <div className="flex gap-2 mt-1 p-2">
                                    <img src='./plusIcon.svg' alt="plus icon"/>
                                    <p className="text-white ">Add New Item</p>

                                </div>
                            </button>
                        
                    </div>

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

    
                <div className="bg-[#F7FAFD] flex items-center w-1/6 mt-12 ml-12">

                        <div className="flex bg-[#E3EBF3] rounded">
                            <input 
                                
                                type='text' 
                                placeholder='Search Medicine Inventory...' 
                                className="text-[12px] px-2 py-5 focus:outline-none bg-[#e3ebf3] text-black h-2 w-full" 
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
                            <p className="text-center">Medicine Name</p>
                        </div>
                        <div className='border border-gray round-md p-4 w-1/4'>
                            <p className="text-center">Medicine ID</p>
                        </div>
                        <div className='border border-gray round-md p-4 w-1/4'>
                            <p className="text-center">Stock in Qty</p>
                        </div>
                        <div className='border border-gray round-md p-4 w-1/4'>
                            <p className="text-center">Action</p>
                        </div>
                    </div>

                    <div className="flex flex-row ml-12 border border-gray-400 rounded round-xl w-5/6 justify-between">
                        <p className="text-center w-1/4">1</p>
                        <p className="text-center w-1/4">2</p>
                        <p className="text-center w-1/4">3</p>
                        <button type="button" className="text-center w-1/4 bg-[#F0483E] text-white"><p className=''>Remove Item</p></button>


                    </div>




                </div>
                

            </div>

                


                        
            
                    




            

                



        </div>
    )
}


