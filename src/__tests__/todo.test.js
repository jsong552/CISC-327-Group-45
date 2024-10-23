import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AddMedicine } from '../pages/AddMedicine';
import { Inventory } from '../pages/Inventory';

test('successfully adds a medicine and it appears in inventory', async () => {
    // Rendering the AddMedicine component
    render(<AddMedicine />);
    

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
