/**
 * The Order component allows users to create new orders for medicines in the pharmacy management system.
 * This component is used to capture and submit new orders to the Firestore 
 *
 *
 * Submits the new order to the Firestore database and updates the list of orders. 
 * This count is also updated in the dashboard.
 *
 * ## How it works:
 * 1. User inputs order details into a form.
 * 2. The form data is validated upon submission.
 * 3. If valid, the new order is added to the Firestore database.
 * 4. The UI confirms by rendering the added order.
 */

import React, { useState, useEffect } from "react";
import { doc, getDoc, Timestamp, updateDoc } from "firebase/firestore";
import db from "../firebase";

export type Order = {
    name: string,
    id: string,
    quantity: string,
    price: string,       // price per unit
    createdAt: Timestamp
    notes?: string
}

export default function Order() {
    const [orders, setOrders] = useState<Order[]>([]);

    const [currentTimestamp, setCurrentTimestamp] = useState<Timestamp>(Timestamp.fromDate(new Date()));

    useEffect(() => {
        const docRef = doc(db, "PharmaData", "orders");

        getDoc(docRef)
        .then((docSnap) =>{
            if(docSnap.exists()){
                const data: Order[] = docSnap.data().data;
                setOrders(data);
            } 
        }).catch((error) => {
            
        })
    }, []);

    // this state will control the fields in the form (i.e. hold their values)
    const [newOrder, setNewOrder] = useState<Order>({
        name: "",
        id: "",
        quantity: "",
        price: "",
        notes: "",
        createdAt: currentTimestamp
    });

    // this state (a boolean) will decide whether or not an error message needs to be shown
    const [showError, setShowError] = useState<boolean>(false);

    // this state will contain the content of the error message
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // this function handles the changes made by the user. It will be able to
    // determine the new value of the field inputted by the user
    // and set its corresponding attribute to the react state created above.
    function handleChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setNewOrder((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    // this function handles the submission of the form. it will validate the information 
    // inputted by the user, ensuring that there are no conflicts before appending
    // the data to the medicine list. If there is an issue, it will display an
    // error message to the user, telling them to fix the error
    function handleSubmit() {
        const numRegex = /^[0-9]*$/i;

        // Ensuring that the name of the medicine is not empty and is not more than 100 characters
        if (newOrder.name.length === 0 || newOrder.name.length > 100) {
            setErrorMessage(`Medicine Name cannot be ${newOrder.name.length === 0 ? "empty" : "longer than 100 characters."}`);
            setShowError(true);
            return;
        // Ensuring that the quantity field is not empty
        } else if (newOrder.quantity.length === 0) {
            setErrorMessage("Quantity cannot be empty");
            setShowError(true);
            return;
        // Ensuring that the quantity field is numeric and only contains the characters 0-9.
        } else if (!numRegex.test(newOrder.quantity)) {
            setErrorMessage("Quantity must be numeric");
            setShowError(true);
            return;
        // Ensuring that the price field is not empty
        } else if (newOrder.price.length === 0) {
            setErrorMessage("Price cannot be empty");
            setShowError(true);
            return;
        // Ensuring that the price field is numeric and only contains the characters 0-9.
        } else if (!numRegex.test(newOrder.price)) {
            setErrorMessage("Price must be numeric");
            setShowError(true);
            return;
        // Ensuring that the medicine ID is not empty and is not more than 100 characters
        } else if (newOrder.id.length === 0 || newOrder.id.length > 100) {
            setErrorMessage(`Order ID cannot be ${newOrder.id.length === 0 ? "empty" : "longer than 100 characters."}`);
            setShowError(true);
            return;
        }

        // Reset error states if no error
        setShowError(false);
        setErrorMessage("");

        // Append the new medicine to the hardcoded data in the external file
        // addMedicineToData(newOrder);

        // Append the new medicine to the database
        setOrders((prev) => {
            const newMedicineArray = [...prev];
            newMedicineArray.push(newOrder);

            const newTime: Timestamp = Timestamp.fromDate(new Date());
            newMedicineArray[newMedicineArray.length - 1].createdAt = newTime;

            updateDb(newMedicineArray);

            return newMedicineArray;
        });

        


        // Reset the form fields
        setNewOrder({
            name: "",
            id: "",
            quantity: "",
            price: "",
            notes: "",
            createdAt: currentTimestamp
        }); 
    }

    async function updateDb(data: Order[]) {
        const docRef = doc(db, "PharmaData", "orders");
        await updateDoc(docRef, {
            data: data
        });
    }


    return (
        <div className='w-full p-12'>
            <h1 className="text-4xl font-semibold text-stone-700">Make an Order</h1>

            <div>
                <p className="text-lg">*All fields are mandatory, except mentioned as (optional).</p>
            </div>

            {/* Form starts here */}
            <form className="mt-12">
                <label>
                    <p>Medicine Name*</p>
                    <input
                    type="text"
                    data-testid="order-name"
                    name="name"
                    autoComplete='off'
                    value={newOrder.name}
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
                            data-testid="order-quantity"
                            autoComplete='off'
                            value={newOrder.quantity}
                            onChange={(e) => handleChange(e)}
                            className='focus:outline-none border border-[#9ba2ab] rounded-lg bg-[#e3ebf3] p-2 text-xl w-full'
                        />
                    </label>
                    <label className='w-[49%]'>
                        <p>Order ID*</p>
                        <input
                            type="text"
                            name="id"
                            data-testid="order-id"
                            autoComplete='off'
                            value={newOrder.id}
                            onChange={(e) => handleChange(e)}
                            className='focus:outline-none border border-[#9ba2ab] rounded-lg bg-[#e3ebf3] p-2 text-xl w-full'
                        />
                    </label>
                </div>
                <div className="mt-6">
                    <label>
                        <p>Price Per Unit*</p>
                        <input
                        type="text"
                        name="price"
                        data-testid="order-price"
                        autoComplete='off'
                        value={newOrder.price}
                        onChange={(e) => handleChange(e)}
                        className='focus:outline-none border border-[#9ba2ab] rounded-lg bg-[#e3ebf3] p-2 text-xl w-full'
                        />
                    </label>
                </div>
                <div className='mt-6'>
                    <label>
                        <p>Notes (optional)</p>
                        <textarea
                            className='text-xl p-2 focus:outline-none resize-none bg-[#e3ebf3] border border-[#9ba2ab] rounded-lg w-full h-32'
                            name="notes"
                            data-testid="notes-part"
                            value={newOrder.notes}
                            onChange={(e) => handleChange(e)}
                        />
                </label>
          </div>
                
            </form>

            {/* Add Medicine button starts here */}
            <div className='mb-32 mt-12'>
                <button
                    className='bg-[#f0483e] py-4 px-6 rounded-lg hover:bg-[#ed6059]'
                    onClick={handleSubmit}
                >
                    <p className='text-white'>Submit Order</p>
                </button>
            {showError && <p className='mt-2'>{errorMessage}</p>}
            </div>

        </div>
    )
}