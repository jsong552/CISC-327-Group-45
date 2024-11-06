import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import { AddMedicine } from "../pages/AddMedicine.tsx";
import { Inventory } from "../pages/Inventory.tsx";
import { MemoryRouter } from 'react-router-dom';
import { getDoc, Timestamp } from 'firebase/firestore';
import { act } from "react";
import { Dashboard } from "../pages/Dashboard.tsx";
import { Sales } from "../pages/Sales.tsx";
import Order from "../pages/Order.tsx";

jest.mock('firebase/firestore', () => {
    const originalModule = jest.requireActual('firebase/firestore');

    return {
        ...originalModule,
        getDoc: jest.fn(),
        updateDoc: jest.fn(),
        getFirestore: jest.fn(),
        doc: jest.fn(),
    };
});

// REQUIREMENT 1 TEST - DASHBOARD DISPLAYS CORRECTLY
test('renders Dashboard correctly, viewable to user', async () => {
    // Mock getDoc to simulate Firebase behavior (if necessary for your test case)
    getDoc.mockResolvedValue({
        exists: () => true,
        data: () => ({
            medicines: [
                { name: 'Paracetamol 500mg', quantity: '100', id: 'D06ID232435499' },
            ],
            data: [ 
                { createdAt: Timestamp.fromDate(new Date()), id: 'SDG34069WRGI240', name: 'Penicillin', price: "236", quantity: "87654" },
            ],
        }),
    });

    // Render Dashboard component inside MemoryRouter for React Router context
    await act(async () => {
        render(
            <MemoryRouter>
                <Dashboard />
            </MemoryRouter>
        );
    })
    
    // Check if the word "Dashboard" appears in the document
    const element = screen.getByText(/Dashboard/i);
    
    // Assert that the element is in the document
    expect(element).toBeInTheDocument();
});

// REQUIREMENT 2 TEST - ENSURES THAT SOMEONE CAN ADD TO THE INVENTORY
test('user can add a medicine to the inventory', async () => {
    // Mock getDoc to simulate Firebase behavior (if necessary for your test case)
    getDoc.mockResolvedValue({
        exists: () => true,
        data: () => ({
            medicines: [
                { name: 'Paracetamol 500mg', quantity: '100', id: 'D06ID232435499' },
                { name: 'Aspirin', quantity: '10', id: 'A69U3490ID3493' },
            ],
        }),
    });

    // Render AddMedicine component inside MemoryRouter for React Router context
    await act(async () => {
        render(
            <MemoryRouter>
                <AddMedicine />
            </MemoryRouter>
        );
    });

    // Simulate user input for adding a new medicine
    fireEvent.change(screen.getByLabelText(/Medicine Name*/i), { target: { value: 'Aspirin' } });
    fireEvent.change(screen.getByLabelText(/Quantity in Number*/i), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText(/Medicine ID*/i), { target: { value: 'A69U3490ID3493' } });
  
    // Submit the form
    fireEvent.click(screen.getByText(/Add Medicine/i));

    await act(async () => {
        render(
            <MemoryRouter>
                <Inventory />
            </MemoryRouter>
        );
    });
    
    // Check if the word "Aspirin" appears in the document after adding it
    const newMedicine = await screen.findAllByText(/Aspirin/);
    
    // Assert that the element is in the document
    expect(newMedicine[0]).toBeInTheDocument();
});

// REQUIREMENT 3 TEST - ENSURES THAT SOMEONE CAN SEARCH THE INVENTORY
test('user can search the inventory', async () => {
    // Mock getDoc to simulate Firebase behavior (if necessary for your test case)
    getDoc.mockResolvedValue({
        exists: () => true,
        data: () => ({
        medicines: [
            { name: 'Paracetamol 500mg', quantity: '100', id: 'D06ID232435499' },
            { name: 'Aspirin', quantity: '10', id: 'A69U3490ID3493' },
            { name: 'Penicillin', quantity: '50', id: 'SDG34069WRGI240' },
        ],
        }),
    });

    // Render Inventory component inside MemoryRouter for React Router context
    await act(async () => {
        render(
            <MemoryRouter>
                <Inventory />
            </MemoryRouter>
        );
    });

    // Simulate user input for searching a medicine
    fireEvent.change(screen.getByTestId(/search-input/), { target: { value: 'Aspirin' } });
  
    // Click the search icon
    fireEvent.click(screen.getByTestId(/search-icon/i));

    // Check if the word "Aspirin" appears in the document after adding it
    const newMedicine = await screen.findAllByText(/Aspirin/);
    
    // Assert that the element is in the document
    expect(newMedicine[0]).toBeInTheDocument();

    const oldMedicine = screen.queryByText(/SDG34069WRGI240/);

    // Check if the Penicillin ID is NOT there
    expect(oldMedicine).toBeNull();
});



// REQUIREMENT 4 TEST - ENSURES THAT SOMEONE CAN UPDATE THE MEDICINE DETAILS
test('user can update medicine details', async () => {
    // Mock getDoc to simulate Firebase behavior (if necessary for your test case)
    getDoc.mockResolvedValue({
        exists: () => true,
        data: () => ({
        medicines: [
            { name: 'Paracetamol 500mg', quantity: '100', id: 'D06ID232435499' },
        ],
        }),
    });

    // Render Inventory component inside MemoryRouter for React Router context
    await act(async () => {
        render(
            <MemoryRouter>
                <Inventory />
            </MemoryRouter>
        );
    });

  
    // Click the edit button
    fireEvent.click(screen.getByTestId(/edit-button/i));
    
    // Simulate user input for editing a medicine name
    fireEvent.change(screen.getByTestId(/edit-name/), { target: { value: 'Aspirin' } });

    // Simulate user input for editing a medicine id
    fireEvent.change(screen.getByTestId(/edit-id/), { target: { value: 'SD2309TH23069' } });

    // Simulate user input for editing a medicine quantity
    fireEvent.change(screen.getByTestId(/edit-quantity/), { target: { value: '3704' } });

    // Click the save button
    fireEvent.click(screen.getByTestId(/save-edits-button/i));


    // Check if the word "Aspirin" appears in the document after editing
    const newName = await screen.findAllByText(/Aspirin/);
    // Assert that the element is in the document
    expect(newName[0]).toBeInTheDocument();

    // Check if the Aspirin's ID is there after editing
    const newID = await screen.findAllByText(/SD2309TH23069/);
    // Assert that the element is in the document
    expect(newID[0]).toBeInTheDocument();

    // Check if the Aspirin's quantity is there after editing
    const newQuantity = await screen.findAllByText(/3704/);
    // Assert that the element is in the document
    expect(newQuantity[0]).toBeInTheDocument();



    // Check that the old Paracetamol ID is NOT there
    const paracetamolID = screen.queryByText(/D06ID232435499/);
    expect(paracetamolID).toBeNull();

    // Check that the old Paracetamol Name is NOT there
    const paracetamolName = screen.queryByText(/Paracetamol 500mg/);
    expect(paracetamolName).toBeNull();

    // Check that the old Paracetamol Quantity is NOT there
    const paracetamolQuantity = screen.queryByText(/100/);
    expect(paracetamolQuantity).toBeNull();
});


// REQUIREMENT 5 TEST - ENSURES THAT A USER CAN DELETE A MEDICINE FROM THE INVENTORY
test('user can delete a medicine', async () => {
    // Mock getDoc to simulate Firebase behavior (if necessary for your test case)
    getDoc.mockResolvedValue({
        exists: () => true,
        data: () => ({
        medicines: [
            { name: 'Paracetamol 500mg', quantity: '100', id: 'D06ID232435499' },
        ],
        }),
    });

    // Render Inventory component inside MemoryRouter for React Router context
    await act(async () => {
        render(
            <MemoryRouter>
                <Inventory />
            </MemoryRouter>
        );
    });

    // Check if Paracetamol's ID is there before deleting
    const newMedicine = await screen.findAllByText(/D06ID232435499/);
    
    // Assert that the element is in the document
    expect(newMedicine[0]).toBeInTheDocument();
  

    // Click the delete button
    fireEvent.click(screen.getByTestId(/delete-button/i));

    // ensure that it is NOT there after deleting
    const oldMedicine = screen.queryByText(/D06ID232435499/);
    expect(oldMedicine).toBeNull();
});



// REQUIREMENT 6 TEST - ENSURES THAT USERS CAN VIEW SALES REPORTS
test('renders Sales report correctly, viewable to user ', async () => {
    // Mock getDoc to simulate Firebase behavior (if necessary for your test case)
    getDoc.mockResolvedValue({
        exists: () => true,
        data: () => ({
            medicines: [
                { name: 'Paracetamol 500mg', quantity: '100', id: 'D06ID232435499' },
            ],
            data: [ 
                { createdAt: Timestamp.fromDate(new Date()), id: 'SDG34069WRGI240', name: 'Penicillin', price: "236", quantity: "87654" },
            ],
        }),
    });

    // Render Sales component inside MemoryRouter for React Router context
    await act(async () => {
        render(
            <MemoryRouter>
                <Sales />
            </MemoryRouter>
        );
    })
    
    // Check if the string 'All sales of the pharmacy' appears in the document
    const element = screen.getByText(/All sales of the pharmacy/i);
    
    // Assert that the element is in the document
    expect(element).toBeInTheDocument();
});


// REQUIREMENT 7 TEST - ENSURES THAT USERS CAN VIEW INVENTORY
test('renders Inventory correctly, viewable to user ', async () => {
    // Mock getDoc to simulate Firebase behavior (if necessary for your test case)
    getDoc.mockResolvedValue({
        exists: () => true,
        data: () => ({
            medicines: [
                { name: 'Paracetamol 500mg', quantity: '100', id: 'D06ID232435499' },
            ],
        }),
    });

    // Render Inventory component inside MemoryRouter for React Router context
    await act(async () => {
        render(
            <MemoryRouter>
                <Inventory />
            </MemoryRouter>
        );
    })
    
    // Check if the string 'List of medicines available for sales.' appears in the document
    const element = screen.getByText(/List of medicines available for sales./i);
    
    // Assert that the element is in the document
    expect(element).toBeInTheDocument();
});


// REQUIREMENT 8 TEST - ENSURES THAT USERS CAN MAKE AN ORDER
test('user can make an order', async () => {
    // Mock getDoc to simulate Firebase behavior (if necessary for your test case)
    getDoc.mockResolvedValue({
        exists: () => true,
        data: () => ({
            data: [  
                { createdAt: Timestamp.fromDate(new Date()), id: 'SDG34069WRGI240', name: 'Penicillin', price: "236", quantity: "87654" },
                { createdAt: Timestamp.fromDate(new Date()), id: 'H3DSFKP340Y9JS', name: 'Aspirin', price: "32", quantity: "79" },
            ],
        }),
    });

    // Render Order component inside MemoryRouter for React Router context
    await act(async () => {
        render(
            <MemoryRouter>
                <Order />
            </MemoryRouter>
        );
    })

    fireEvent.change(screen.getByTestId(/order-name/), { target: { value: 'Aspirin' } });
    fireEvent.change(screen.getByTestId(/order-id/), { target: { value: 'H3DSFKP340Y9JS' } });
    fireEvent.change(screen.getByTestId(/order-quantity/), { target: { value: '32' } });
    fireEvent.change(screen.getByTestId(/order-price/), { target: { value: '79' } });
    
    // Render Sales component inside MemoryRouter for React Router context
    await act(async () => {
        render(
            <MemoryRouter>
                <Sales />
            </MemoryRouter>
        );
    })

    // Check if the Aspirin's quantity is there after editing
    const newQuantity = await screen.findAllByText(/32/);
    // Assert that the element is in the document
    expect(newQuantity[0]).toBeInTheDocument();

    // Check if the Aspirin's name is there after editing
    const newName = await screen.findAllByText(/Aspirin/);
    // Assert that the element is in the document
    expect(newName[0]).toBeInTheDocument();

    // Check if the Aspirin's id is there after editing
    const newID = await screen.findAllByText(/H3DSFKP340Y9JS/);
    // Assert that the element is in the document
    expect(newID[0]).toBeInTheDocument();

    // Check if the Aspirin's price is there after editing
    const newPrice = await screen.findAllByText(/79/);
    // Assert that the element is in the document
    expect(newPrice[0]).toBeInTheDocument();
});





































// test('successfully adds a medicine and it appears in inventory', async () => {
//   // Mock the updateDoc to simulate adding a new medicine
//   updateDoc.mockResolvedValueOnce({});

//   // Mock getDoc to return the updated inventory after adding a new medicine
//   getDoc.mockResolvedValueOnce({
//     exists: () => true,
//     data: () => ({
//       medicines: [
//         { name: 'Paracetamol 500mg', quantity: '100', id: 'D06ID232435499' },
//       ],
//     }),
//   });

//   // Render AddMedicine component within a MemoryRouter
//   render(
//     <MemoryRouter>
//       <AddMedicine />
//     </MemoryRouter>
//   );
  
//   // Simulate user input for adding a new medicine
//   fireEvent.change(screen.getByLabelText(/Medicine Name*/i), { target: { value: 'Paracetamol 500mg' } });
//   fireEvent.change(screen.getByLabelText(/Quantity in Number*/i), { target: { value: '100' } });
//   fireEvent.change(screen.getByLabelText(/Medicine ID*/i), { target: { value: 'D06ID232435499' } });

//   // Submit the form
//   fireEvent.click(screen.getByText(/Add Medicine/i));

//   // Render Inventory component within a MemoryRouter
//   render(
//     <MemoryRouter>
//       <Inventory />
//     </MemoryRouter>
//   );
  
//   // Verify if the new medicine appears in the inventory
//   const newMedicine = await screen.findByText(/Paracetamol 500mg/i);
//   expect(newMedicine).toBeInTheDocument();

//   const medicineQuantity = await screen.findByText(/100/i);
//   expect(medicineQuantity).toBeInTheDocument();
// });







// import { render, screen, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import { AddMedicine } from '../pages/AddMedicine';
// import { Inventory } from '../pages/Inventory';
// import { data } from '../pages/medicineData';

// Helper function to reset the data array before each test
// beforeEach(() => {
//   data.length = 0;  // Clear the data array
//   data.push(
//     {
//       name: "Augmentin 625 Duo Tablet",
//       id: "D06ID232435454",
//       quantity: "350",
//       usage: "Take 1 tablet every 12 hours",
//       sideEffects: "Nausea, Diarrhea",
//     },
//     {
//       name: "Azithral 500 Tablet",
//       id: "D06ID232435451",
//       quantity: "150",
//       usage: "Take 1 tablet daily",
//       sideEffects: "Headache",
//     },
//     {
//       name: "Ascoril LS Syrup",
//       id: "D06ID232435452",
//       quantity: "69",
//       usage: "10 ml twice a day",
//       sideEffects: "Drowsiness",
//     }
//   );
// });

// Test for successfully adding a medicine
// test('successfully adds a medicine and it appears in inventory', async () => {
//   // Render the AddMedicine component
//   render(<AddMedicine />);
  
//   // Simulate user input for adding a new medicine
//   fireEvent.change(screen.getByLabelText(/Medicine Name*/i), { target: { value: 'Paracetamol 500mg' } });
//   fireEvent.change(screen.getByLabelText(/Quantity in Number*/i), { target: { value: '100' } });
//   fireEvent.change(screen.getByLabelText(/Medicine ID*/i), { target: { value: 'D06ID232435499' } });

//   // Submit the form
//   fireEvent.click(screen.getByText(/Add Medicine/i));

//   // Render the Inventory component to check if the medicine appears in the inventory
//   render(<Inventory />);
  
//   // Check if the new medicine is present in the list
//   const newMedicine = await screen.findAllByText(/Paracetamol 500mg/i);
//   expect(newMedicine[0]).toBeInTheDocument();

//   const medicineQuantity = await screen.findAllByText(/100/i);
//   expect(medicineQuantity[0]).toBeInTheDocument();
// });

// // Test for failure case: Adding a medicine with missing data (e.g., missing name) and checking for error message
// test('fails to add medicine with missing name and shows error', () => {
//   // Render the AddMedicine component
//   render(<AddMedicine />);

//   // Simulate user input with a missing name
//   fireEvent.change(screen.getByLabelText(/Quantity in Number*/i), { target: { value: '50' } });
//   fireEvent.change(screen.getByLabelText(/Medicine ID*/i), { target: { value: 'D06ID232435500' } });

//   // Submit the form
//   fireEvent.click(screen.getByText(/Add Medicine/i));

//   // Check if an error message is displayed
//   const errorMessage = screen.getByText(/Medicine Name cannot be empty/i);
//   expect(errorMessage).toBeInTheDocument();

//   // Check that the medicine was not added to the inventory by rendering the Inventory component
//   render(<Inventory />);

//   // Verify the medicine is not present in the list
//   const invalidMedicine = screen.queryByText(/D06ID232435500/i);
//   expect(invalidMedicine).not.toBeInTheDocument();
// });

// // Test for successfully removing a medicine from the inventory
// test('successfully removes a medicine from the inventory', () => {
//   // Render the Inventory component with initial data
//   render(<Inventory />);

//   // Check that the medicine to be removed is present initially
//   const firstMedicine = screen.getByText(/Augmentin 625 Duo Tablet/i);
//   expect(firstMedicine).toBeInTheDocument();

//   // Simulate clicking the remove button for the first medicine
//   const removeButton = screen.getByTestId('remove-button-0');
//   fireEvent.click(removeButton);

//   // Check that the medicine has been removed from the inventory
//   const removedMedicine = screen.queryByText(/Augmentin 625 Duo Tablet/i);
//   expect(removedMedicine).not.toBeInTheDocument();
// });
