import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AddMedicine } from '../pages/AddMedicine';
import { Inventory } from '../pages/Inventory';
import { data } from '../pages/medicineData';

// Helper function to reset the data array before each test
beforeEach(() => {
  data.length = 0;  // Clear the data array
  data.push(
    {
      name: "Augmentin 625 Duo Tablet",
      id: "D06ID232435454",
      quantity: "350",
      usage: "Take 1 tablet every 12 hours",
      sideEffects: "Nausea, Diarrhea",
    },
    {
      name: "Azithral 500 Tablet",
      id: "D06ID232435451",
      quantity: "150",
      usage: "Take 1 tablet daily",
      sideEffects: "Headache",
    },
    {
      name: "Ascoril LS Syrup",
      id: "D06ID232435452",
      quantity: "69",
      usage: "10 ml twice a day",
      sideEffects: "Drowsiness",
    }
  );
});

// Test for successfully adding a medicine
test('successfully adds a medicine and it appears in inventory', async () => {
  // Render the AddMedicine component
  render(<AddMedicine />);
  
  // Simulate user input for adding a new medicine
  fireEvent.change(screen.getByLabelText(/Medicine Name*/i), { target: { value: 'Paracetamol 500mg' } });
  fireEvent.change(screen.getByLabelText(/Quantity in Number*/i), { target: { value: '100' } });
  fireEvent.change(screen.getByLabelText(/Medicine ID*/i), { target: { value: 'D06ID232435499' } });

  // Submit the form
  fireEvent.click(screen.getByText(/Add Medicine/i));

  // Render the Inventory component to check if the medicine appears in the inventory
  render(<Inventory />);
  
  // Check if the new medicine is present in the list
  const newMedicine = await screen.findAllByText(/Paracetamol 500mg/i);
  expect(newMedicine[1]).toBeInTheDocument();

  const medicineQuantity = await screen.findAllByText(/100/i);
  expect(medicineQuantity[1]).toBeInTheDocument();
});

// Test for failure case: Adding a medicine with missing data (e.g., missing name) and checking for error message
test('fails to add medicine with missing name and shows error', () => {
  // Render the AddMedicine component
  render(<AddMedicine />);

  // Simulate user input with a missing name
  fireEvent.change(screen.getByLabelText(/Quantity in Number*/i), { target: { value: '50' } });
  fireEvent.change(screen.getByLabelText(/Medicine ID*/i), { target: { value: 'D06ID232435500' } });

  // Submit the form
  fireEvent.click(screen.getByText(/Add Medicine/i));

  // Check if an error message is displayed
  const errorMessage = screen.getByText(/Medicine Name cannot be empty/i);
  expect(errorMessage).toBeInTheDocument();

  // Check that the medicine was not added to the inventory by rendering the Inventory component
  render(<Inventory />);

  // Verify the medicine is not present in the list
  const invalidMedicine = screen.queryByText(/D06ID232435500/i);
  expect(invalidMedicine).not.toBeInTheDocument();
});

// Test for successfully removing a medicine from the inventory
test('successfully removes a medicine from the inventory', () => {
  // Render the Inventory component with initial data
  render(<Inventory />);

  // Check that the medicine to be removed is present initially
  const firstMedicine = screen.getByText(/Augmentin 625 Duo Tablet/i);
  expect(firstMedicine).toBeInTheDocument();

  // Simulate clicking the remove button for the first medicine
  const removeButton = screen.getByTestId('remove-button-0');
  fireEvent.click(removeButton);

  // Check that the medicine has been removed from the inventory
  const removedMedicine = screen.queryByText(/Augmentin 625 Duo Tablet/i);
  expect(removedMedicine).not.toBeInTheDocument();
});
