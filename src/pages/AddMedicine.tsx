import { getValue } from '@testing-library/user-event/dist/utils'
import React, { useState } from 'react'

export type Medicine = {
    name: string
    id: string
    quantity: string
    usage: string
    sideEffects: string
}

export const AddMedicine = () => {
    const [data, setData] = useState<Medicine>({
        name: "",
        id: "",
        quantity: "",
        usage: "",
        sideEffects: ""
    });

    const [showError, setShowError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string|null>(null);

    function handleChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setData((prevData) => {
            const newData = {
                ...prevData,
                [name]: value
            }

            return newData;
        });
    }

    function handleSubmit() {
        if (errorMessage !== "" || errorMessage === null) {
            setShowError(true);
        }
        else {
            setShowError(false);
        }

        const numRegex = /^[0-9]*$/i;
        if (data.name.length === 0 || data.name.length > 100) {
            setErrorMessage(() => {
                return `Medicine Name cannot be ${data.name.length === 0 ? "empty" : "longer than 100 characters."}`
            });
        }
        else if (data.quantity.length === 0) {
            setErrorMessage(() => {
                return `Quantity cannot be empty`
            });
        }
        else if (!numRegex.test(data.quantity)) {
            setErrorMessage(() => {
                return `Quantity must be numeric`
            });
        }
        else if (data.id.length === 0 || data.id.length > 100) {
            setErrorMessage(() => {
                return `Medicine ID cannot be ${data.id.length === 0 ? "empty" : "longer than 100 characters."}`
            });
        }
        else {
            setShowError(false);
            setErrorMessage("");
        }
    }

    return (
        <div className='w-full'>
            <div className='bg-white'>
                <div className="p-12 flex gap-4 h-6">
                    <p className="text-4xl font-semibold text-stone-700">Inventory</p>
                    <img src="./arrow.svg" alt="arrow" className="mt-5 size-3"/>
                    <p className="text-3xl font-semibold text-stone-700 mt-1">List of Medicines</p>
                    <img src="./arrow.svg" alt="arrow" className="mt-5 size-3"/>
                    <p className="text-3xl font-semibold text-stone-700 mt-1">Add New Medicine</p>
                </div>

                <div className="ml-12">
                    <p className="text-lg">*All fields with are mandatory, except mentioned as (optional).</p>
                </div>

                {/* form starts here */}
                <form className='p-12'>
                    <label>
                        <p>Medicine Name*</p>
                        <input 
                            type="text"
                            name="name"
                            autoComplete='off'
                            value={data.name}
                            onChange={(e) => handleChange(e)}
                            className='focus:outline-none border border-[#9ba2ab] rounded-lg bg-[#e3ebf3] p-2 text-xl w-full'
                        />
                    </label>
                    <div className='flex flex-row justify-between w-full mt-6'>
                        <label className='w-[49%]'>
                            <p>Quantity in Number*</p>
                            <input 
                                type="text"
                                name="quantity"
                                autoComplete='off'
                                value={data.quantity}
                                onChange={(e) => handleChange(e)}
                                className='focus:outline-none border border-[#9ba2ab] rounded-lg bg-[#e3ebf3] p-2 text-xl w-full'
                            />
                        </label>
                        <label className='w-[49%]'>
                            <p>Medicine ID*</p>
                            <input 
                                type="text"
                                name="id"
                                autoComplete='off'
                                value={data.id}
                                onChange={(e) => handleChange(e)}
                                className='focus:outline-none border border-[#9ba2ab] rounded-lg bg-[#e3ebf3] p-2 text-xl w-full'
                            />
                        </label>
                    </div>
                    <div className='mt-6'>
                        <label>
                            <p>How to Use (optional)</p>
                            <textarea 
                                className='text-xl p-2 focus:outline-none resize-none bg-[#e3ebf3] border border-[#9ba2ab] rounded-lg w-full h-32' 
                                name="usage"
                                value={data.usage}
                                onChange={(e) => handleChange(e)}
                            />
                        </label>
                    </div>
                    <div className='mt-6'>
                        <label>
                            <p>Side Effects (optional)</p>
                            <textarea 
                                className='text-xl p-2 focus:outline-none resize-none bg-[#e3ebf3] border border-[#9ba2ab] rounded-lg w-full h-32' 
                                name="sideEffects"
                                value={data.sideEffects}
                                onChange={(e) => handleChange(e)}
                            />
                        </label>
                    </div>
                </form>
                {/* FORM ENDS HERE MATE */}



                <div className='mb-32'>
                    <button 
                        className='bg-[#f0483e] py-4 px-6 ml-12 rounded-lg hover:bg-[#ed6059]'
                        onClick={() => handleSubmit()}
                    >
                        <p className='text-white'>Add Medicine</p>
                    </button>
                    {showError && <p className='ml-12 mt-2'>{errorMessage === null ? "Fields must not be empty" : errorMessage}</p>}
                </div>
            </div>
        </div>
    )
}
