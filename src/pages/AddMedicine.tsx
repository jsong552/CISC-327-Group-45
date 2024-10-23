import React, { useState } from 'react';
import { data, addMedicineToData } from './medicineData.tsx';

// Defining a medicine type so that the data we use stays consistent
export type Medicine = {
  name: string;
  id: string;
  quantity: string;
  usage?: string;
  sideEffects?: string;
}

export const AddMedicine = () => {

  // this state will control the fields in the form (i.e. hold their values)
  const [newMedicine, setNewMedicine] = useState<Medicine>({
    name: "",
    id: "",
    quantity: "",
    usage: "",
    sideEffects: "",
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
    setNewMedicine((prevData) => ({
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
    if (newMedicine.name.length === 0 || newMedicine.name.length > 100) {
      setErrorMessage(`Medicine Name cannot be ${newMedicine.name.length === 0 ? "empty" : "longer than 100 characters."}`);
      setShowError(true);
      return;
    // Ensuring that the quantity field is not empty
    } else if (newMedicine.quantity.length === 0) {
      setErrorMessage("Quantity cannot be empty");
      setShowError(true);
      return;
    // Ensuring that the quantity field is numeric and only contains the characters 0-9.
    } else if (!numRegex.test(newMedicine.quantity)) {
      setErrorMessage("Quantity must be numeric");
      setShowError(true);
      return;
    // Ensuring that the medicine ID is not empty and is not more than 100 characters
    } else if (newMedicine.id.length === 0 || newMedicine.id.length > 100) {
      setErrorMessage(`Medicine ID cannot be ${newMedicine.id.length === 0 ? "empty" : "longer than 100 characters."}`);
      setShowError(true);
      return;
    }

    // Reset error states if no error
    setShowError(false);
    setErrorMessage("");

    // Append the new medicine to the hardcoded data in the external file
    addMedicineToData(newMedicine);

    // Reset the form fields
    setNewMedicine({
      name: "",
      id: "",
      quantity: "",
      usage: "",
      sideEffects: "",
    });
  }

  return (
    <div className='w-full'>
      <div className='bg-white'>
        <div className="p-12 flex gap-4 h-6">
          <p className="text-4xl font-semibold text-stone-700">Inventory</p>
          <img src="./arrow.svg" alt="arrow" className="mt-5 size-3" />
          <p className="text-3xl font-semibold text-stone-700 mt-1">List of Medicines</p>
          <img src="./arrow.svg" alt="arrow" className="mt-5 size-3" />
          <p className="text-3xl font-semibold text-stone-700 mt-1">Add New Medicine</p>
        </div>

        <div className="ml-12">
          <p className="text-lg">*All fields are mandatory, except mentioned as (optional).</p>
        </div>

        {/* Display the list of medicines       
        */}
        
        {/* <div className="p-12">
          <h3 className="text-2xl mb-4">Medicine Inventory</h3>
          <ul>
            {data.map((medicine) => (
              <li key={medicine.id} className="mb-2">
                <p><strong>{medicine.name}</strong> (ID: {medicine.id}) - {medicine.quantity} units</p>
                <p>Usage: {medicine.usage} | Side Effects: {medicine.sideEffects}</p>
              </li>
            ))}
          </ul>
        </div> */}

        {/* Form starts here */}
        <form className='p-12'>
          <label>
            <p>Medicine Name*</p>
            <input
              type="text"
              name="name"
              autoComplete='off'
              value={newMedicine.name}
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
                value={newMedicine.quantity}
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
                value={newMedicine.id}
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
                value={newMedicine.usage}
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
                value={newMedicine.sideEffects}
                onChange={(e) => handleChange(e)}
              />
            </label>
          </div>
        </form>

        {/* Add Medicine button starts here */}
        <div className='mb-32'>
          <button
            className='bg-[#f0483e] py-4 px-6 ml-12 rounded-lg hover:bg-[#ed6059]'
            onClick={handleSubmit}
          >
            <p className='text-white'>Add Medicine</p>
          </button>
          {showError && <p className='ml-12 mt-2'>{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
}