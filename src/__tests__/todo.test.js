import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import { AddMedicine } from "../pages/AddMedicine.tsx";
import { Inventory } from "../pages/Inventory.tsx";
import { MemoryRouter } from 'react-router-dom';
import { getDoc, Timestamp } from 'firebase/firestore';
import { act } from "react";
import { Dashboard } from "../pages/Dashboard.tsx";
import { Sales } from "../pages/Sales.tsx";
import Order from "../pages/Order.tsx";
import App from "../App.js";
import { DashboardComponent } from "../components/DashboardComponent.tsx";
import { DashboardComponentTwo } from "../components/DashboardComponentTwo.tsx";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../components/sidebar.tsx";

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

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),  // Keep the other exports intact
    useNavigate: jest.fn()  // Mock useNavigate
}));

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








// Testing for Assignment 4
// App.js testing to make sure routing works
describe('App Routing', () => {
    // Set up the mock for getDoc before each test
    beforeEach(() => {
        getDoc.mockResolvedValue({
            exists: () => true,
            data: () => ({
                data: [  
                    { createdAt: Timestamp.fromDate(new Date()), id: 'SDG34069WRGI240', name: 'Penicillin', price: "236", quantity: "87654" },
                    { createdAt: Timestamp.fromDate(new Date()), id: 'H3DSFKP340Y9JS', name: 'Aspirin', price: "32", quantity: "79" },
                ],
            }),
        });
    });

    const renderWithRouter = (initialRoute = '/') => {
        return render(
            <MemoryRouter initialEntries={[initialRoute]}>
                <App />
            </MemoryRouter>
        );
    };

    it('renders the Dashboard component on the root route', () => {
        renderWithRouter('/');
        expect(screen.getByText(/Overview of the pharmacy information/i)).toBeInTheDocument();
    });

    it('renders the Dashboard component on the /dashboard route', () => {
        renderWithRouter('/dashboard');
        expect(screen.getByText(/Overview of the pharmacy information/i)).toBeInTheDocument();
    });

    it('renders the Inventory component on the /inventory route', () => {
        renderWithRouter('/inventory');
        expect(screen.getByText(/List of medicines available for sales./i)).toBeInTheDocument();
    });

    it('renders the AddMedicine component on the /addmedicine route', () => {
        renderWithRouter('/addmedicine');
        expect(screen.getByText(/Add New Medicine/i)).toBeInTheDocument();
    });

    it('renders the Sales component on the /sales route', () => {
        renderWithRouter('/sales');
        expect(screen.getByText(/All sales of the pharmacy./i)).toBeInTheDocument();
    });

    it('renders the Order component on the /order route', () => {
        renderWithRouter('/order');
        expect(screen.getByText(/Make an Order/i)).toBeInTheDocument();
    });
});


// Additional testing for the DashboardComponent
describe('DashboardComponent', () => {
    it('renders with provided props', () => {
        const mockProps = {
            image: '/image.jpg',
            borderColor: 'red',
            color: 'blue',
            title: 'Test Title',
            subtitle: 'Test Subtitle',
            desc: 'Test description',
            link: '/test-link',
        };

        render(
            <MemoryRouter>
                <DashboardComponent {...mockProps} />
            </MemoryRouter>
        );

        // Check if elements are rendered correctly
        expect(screen.getByAltText('add medicine icon')).toHaveAttribute('src', '/image.jpg');
        expect(screen.getByText('Test Title')).toBeInTheDocument();
        expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
        expect(screen.getByText('Test description')).toBeInTheDocument();
    });

    it('calls navigate with the correct link when clicked', () => {
        const mockNavigate = jest.fn();  // Mock the navigate function
        useNavigate.mockReturnValue(mockNavigate);  // Return the mock function when useNavigate is called

        const mockProps = {
            image: '/image.jpg',
            borderColor: 'red',
            color: 'blue',
            title: 'Test Title',
            subtitle: 'Test Subtitle',
            desc: 'Test description',
            link: '/test-link',
        };

        render(
            <MemoryRouter>
                <DashboardComponent {...mockProps} />
            </MemoryRouter>
        );

        // Simulate click on the component
        fireEvent.click(screen.getByTestId('dashboard-component-button'));  // Use data-testid if necessary

        // Check that navigate function was called with correct link
        expect(mockNavigate).toHaveBeenCalledWith('/test-link');
    });

    it('does not call navigate if no link is provided', () => {
        const mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);

        const mockProps = {
            image: '/image.jpg',
            borderColor: 'red',
            color: 'blue',
            title: 'Test Title',
            subtitle: 'Test Subtitle',
            desc: 'Test description',
            link: null,  // No link provided
        };

        render(
            <MemoryRouter>
                <DashboardComponent {...mockProps} />
            </MemoryRouter>
        );

        // Simulate click on the component
        fireEvent.click(screen.getByTestId('dashboard-component-button'));

        // Check that navigate function was not called
        expect(mockNavigate).not.toHaveBeenCalled();
    });
});

// Keep testing DashboardComponentTwo, to ensure that the navigate to link function works
describe('DashboardComponentTwo', () => {
    it('should navigate to the correct link when clicked', () => {
        const mockNavigate = jest.fn(); // Mock function for navigation
        useNavigate.mockReturnValue(mockNavigate); // Return the mock navigate function when useNavigate is called
    
        const props = {
            no1: '123',
            no2: '456',
            title: 'Dashboard Title',
            subtitle: 'Subtitle',
            text1: 'Text 1',
            text2: 'Text 2',
            link: '/some-path', // The link to navigate to
        };
    
        render(<DashboardComponentTwo {...props} />);
    
        const component = screen.getByText('Dashboard Title'); // Find an element in the component to trigger the click event
    
        fireEvent.click(component); // Simulate the click event
    
        expect(mockNavigate).toHaveBeenCalledWith('/some-path'); // Check if navigate was called with the correct link
    });
});

// Testing for the sidebar, making sure that links work
describe('Sidebar', () => {
    let mockNavigate;
  
    // Set up before each test, if needed
    beforeEach(() => {
      mockNavigate = jest.fn(); // Local mock for useNavigate
    });
  
    it('should navigate to the correct path when a sidebar item is clicked', () => {
        // Mock useNavigate for this test
        useNavigate.mockReturnValue(mockNavigate);
    
        render(
            <MemoryRouter>
                <Sidebar />
            </MemoryRouter>
        ); // Render Sidebar component
    
        // Test clicking on the "Dashboard" link
        const dashboardLink = screen.getByText('Dashboard');
        fireEvent.click(dashboardLink);
        expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    
        // Test clicking on other sidebar items
        const inventoryLink = screen.getByText('Inventory');
        fireEvent.click(inventoryLink);
        expect(mockNavigate).toHaveBeenCalledWith('/inventory');
    
        const addMedicineLink = screen.getByText('Add Medicine');
        fireEvent.click(addMedicineLink);
        expect(mockNavigate).toHaveBeenCalledWith('/addmedicine');
    
        const salesLink = screen.getByText('View Sales');
        fireEvent.click(salesLink);
        expect(mockNavigate).toHaveBeenCalledWith('/sales');
    
        const orderLink = screen.getByText('Make Order');
        fireEvent.click(orderLink);
        expect(mockNavigate).toHaveBeenCalledWith('/order');
    });
});

// Testing for the add medicine file
describe('AddMedicine Component', () => {
    
    beforeEach(() => {
        getDoc.mockResolvedValue({
            exists: () => true,
            data: () => ({
                medicines: [
                    { name: 'Paracetamol 500mg', quantity: '100', id: 'D06ID232435499' },
                    { name: 'Penicillin', quantity: '10', id: 'G30IHG3I040J0T' },
                    { name: 'Aspirin', quantity: '1', id: 'NH04J50OGFKNG' },
                ],
                data: [ 
                    { createdAt: Timestamp.fromDate(new Date()), id: 'SDG34069WRGI240', name: 'Penicillin', price: "236", quantity: "87654" },
                ],
            }),
        });
    });

    it('should load medicines and display them', async () => {
        render(<AddMedicine />);
    
        // Ensure that the component renders correctly
        expect(screen.getByText('Add New Medicine')).toBeInTheDocument();
    
        // Wait for Firestore data to be loaded and rendered
        await waitFor(() => expect(getDoc).toHaveBeenCalledTimes(1));
    });
  
    it('should show an error if the medicine name is too long', async () => {
        render(<AddMedicine />);
    
        // Enter too long medicine name
        fireEvent.change(screen.getByLabelText(/Medicine Name*/i), {
            target: { value: 'A'.repeat(101) },
        });
    
        fireEvent.click(screen.getByText('Add Medicine'));
    
        await waitFor(() => {
            expect(screen.getByText('Medicine Name cannot be longer than 100 characters.')).toBeInTheDocument();
        });
    });

    it('quantity must not be empty', async () => {
        render(<AddMedicine />);
    
        // Enter ok medicine name
        fireEvent.change(screen.getByLabelText(/Medicine Name*/i), {
            target: { value: 'A'.repeat(15) },
        });
    
        fireEvent.click(screen.getByText('Add Medicine'));
    
        await waitFor(() => {
            expect(screen.getByText('Quantity cannot be empty')).toBeInTheDocument();
        });
    });

    it('quantity must be numeric', async () => {
        render(<AddMedicine />);
    
        // Enter ok medicine name
        fireEvent.change(screen.getByLabelText(/Medicine Name*/i), {
            target: { value: 'A'.repeat(15) },
        });
        // Enter non numeric quantity
        fireEvent.change(screen.getByLabelText(/Quantity in Number*/i), {
            target: { value: 'A'.repeat(101) },
        });
    
        fireEvent.click(screen.getByText('Add Medicine'));
    
        await waitFor(() => {
            expect(screen.getByText('Quantity must be numeric')).toBeInTheDocument();
        });
    });

    it('medicine ID must not be over 100 characters', async () => {
        render(<AddMedicine />);
    
        // Enter ok medicine name
        fireEvent.change(screen.getByLabelText(/Medicine Name*/i), {
            target: { value: 'A'.repeat(15) },
        });
        // Enter ok quantity
        fireEvent.change(screen.getByLabelText(/Quantity in Number*/i), {
            target: { value: 69 },
        });
        // Enter too long medicine id
        fireEvent.change(screen.getByLabelText(/Medicine ID*/i), {
            target: { value: 'A'.repeat(101) },
        });
    
        fireEvent.click(screen.getByText('Add Medicine'));
    
        await waitFor(() => {
            expect(screen.getByText('Medicine ID cannot be longer than 100 characters.')).toBeInTheDocument();
        });
    });
  
    it('should add a new medicine when the form is valid', async () => {
        render(<AddMedicine />);
    
        // Fill out the form with valid data
        fireEvent.change(screen.getByLabelText(/Medicine Name*/i), { target: { value: 'Tylenol' } });
        fireEvent.change(screen.getByLabelText(/Quantity in Number*/i), { target: { value: '50' } });
        fireEvent.change(screen.getByLabelText(/Medicine ID*/i), { target: { value: 'TYL123' } });
    
        // Submit the form
        fireEvent.click(screen.getByText('Add Medicine'));
    
        await waitFor(() => {
            expect(getDoc).toHaveBeenCalledTimes(1); // Check that getDoc was called to load data
        });
    });

    it('allows for updating the how to use part', async () => {
        render(<AddMedicine />);
    
        // Fill out the form with valid data
        fireEvent.change(screen.getByLabelText(/Medicine Name*/i), { target: { value: 'Tylenol' } });
        fireEvent.change(screen.getByLabelText(/Quantity in Number*/i), { target: { value: '50' } });
        fireEvent.change(screen.getByLabelText(/Medicine ID*/i), { target: { value: 'TYL123' } });
        fireEvent.change(screen.getByTestId('how-to-use'), { target: { value: 'TYL123' } });
    
        // Submit the form
        fireEvent.click(screen.getByText('Add Medicine'));
    
        await waitFor(() => {
            expect(getDoc).toHaveBeenCalledTimes(1); // Check that getDoc was called to load data
        });
    });

    it('allows for updating the side effects part', async () => {
        render(<AddMedicine />);
    
        // Fill out the form with valid data
        fireEvent.change(screen.getByLabelText(/Medicine Name*/i), { target: { value: 'Tylenol' } });
        fireEvent.change(screen.getByLabelText(/Quantity in Number*/i), { target: { value: '50' } });
        fireEvent.change(screen.getByLabelText(/Medicine ID*/i), { target: { value: 'TYL123' } });
        fireEvent.change(screen.getByTestId('side-effects'), { target: { value: 'TYL123' } });
    
        // Submit the form
        fireEvent.click(screen.getByText('Add Medicine'));
    
        await waitFor(() => {
            expect(getDoc).toHaveBeenCalledTimes(1); // Check that getDoc was called to load data
        });
    });
});


// Testing Inventory navigation
describe('Inventory', () => {
    beforeEach(() => {
        getDoc.mockResolvedValue({
            exists: () => true,
            data: () => ({
                medicines: [
                    { name: 'Paracetamol 500mg', quantity: '100', id: 'D06ID232435499' },
                    { name: 'Penicillin', quantity: '10', id: 'G30IHG3I040J0T' },
                    { name: 'Aspirin', quantity: '1', id: 'NH04J50OGFKNG' },
                ],
                data: [ 
                    { createdAt: Timestamp.fromDate(new Date()), id: 'SDG34069WRGI240', name: 'Penicillin', price: "236", quantity: "87654" },
                ],
            }),
        });
    });

    let mockNavigate;
  
    // Set up before each test, if needed
    beforeEach(() => {
      mockNavigate = jest.fn(); // Local mock for useNavigate
    });
  
    it('should navigate to addmedicine to link', () => {
        // Mock useNavigate for this test
        useNavigate.mockReturnValue(mockNavigate);
    
        render(
            <MemoryRouter>
                <Inventory />
            </MemoryRouter>
        ); // Render Sidebar component
    
        // Test clicking on the "add medicine" link
        const inventoryLink = screen.getByTestId('add-new-item-button');
        fireEvent.click(inventoryLink);
        expect(mockNavigate).toHaveBeenCalledWith('/addmedicine');
    });
});


// Testing for the order file
describe('Order Component', () => {
    
    beforeEach(() => {
        getDoc.mockResolvedValue({
            exists: () => true,
            data: () => ({
                medicines: [
                    { name: 'Paracetamol 500mg', quantity: '100', id: 'D06ID232435499' },
                    { name: 'Penicillin', quantity: '10', id: 'G30IHG3I040J0T' },
                    { name: 'Aspirin', quantity: '1', id: 'NH04J50OGFKNG' },
                ],
                data: [ 
                    { createdAt: Timestamp.fromDate(new Date()), id: 'SDG34069WRGI240', name: 'Penicillin', price: "236", quantity: "87654" },
                ],
            }),
        });
    });

    it('should load order and display them', async () => {
        render(<Order />);
    
        // Ensure that the component renders correctly
        expect(screen.getByText('Make an Order')).toBeInTheDocument();
    
        // Wait for Firestore data to be loaded and rendered
        await waitFor(() => expect(getDoc).toHaveBeenCalledTimes(1));
    });
  
    it('should show an error if the Medicine name is too long', async () => {
        render(<Order />);
    
        // Enter too long medicine name
        fireEvent.change(screen.getByLabelText(/Medicine Name*/i), {
            target: { value: 'A'.repeat(101) },
        });
    
        fireEvent.click(screen.getByText('Submit Order'));
    
        await waitFor(() => {
            expect(screen.getByText('Medicine Name cannot be longer than 100 characters.')).toBeInTheDocument();
        });
    });

    it('quantity must not be empty', async () => {
        render(<Order />);
    
        // Enter ok medicine name
        fireEvent.change(screen.getByLabelText(/Medicine Name*/i), {
            target: { value: 'A'.repeat(15) },
        });
    
        fireEvent.click(screen.getByText('Submit Order'));
    
        await waitFor(() => {
            expect(screen.getByText('Quantity cannot be empty')).toBeInTheDocument();
        });
    });

    it('quantity must be numeric', async () => {
        render(<Order />);
    
        // Enter ok medicine name
        fireEvent.change(screen.getByLabelText(/Medicine Name*/i), {
            target: { value: 'A'.repeat(15) },
        });
        // Enter non numeric quantity
        fireEvent.change(screen.getByLabelText(/Quantity in Number*/i), {
            target: { value: 'A'.repeat(101) },
        });
    
        fireEvent.click(screen.getByText('Submit Order'));
    
        await waitFor(() => {
            expect(screen.getByText('Quantity must be numeric')).toBeInTheDocument();
        });
    });

    it('order ID must not be over 100 characters', async () => {
        render(<Order />);
    
        // Enter ok medicine name
        fireEvent.change(screen.getByLabelText(/Medicine Name*/i), {
            target: { value: 'A'.repeat(15) },
        });
        // Enter ok quantity
        fireEvent.change(screen.getByLabelText(/Quantity in Number*/i), {
            target: { value: 69 },
        });
        // Enter too long medicine id
        fireEvent.change(screen.getByLabelText(/Order ID*/i), {
            target: { value: 'A'.repeat(101) },
        });
    
        fireEvent.click(screen.getByText('Submit'));
    
        await waitFor(() => {
            expect(screen.getByText('Order ID cannot be longer than 100 characters.')).toBeInTheDocument();
        });
    });
  
    it('should add a new order when the form is valid', async () => {
        render(<Order />);
    
        // Fill out the form with valid data
        fireEvent.change(screen.getByLabelText(/Medicine Name*/i), { target: { value: 'Tylenol' } });
        fireEvent.change(screen.getByLabelText(/Quantity in Number*/i), { target: { value: '50' } });
        fireEvent.change(screen.getByLabelText(/Medicine ID*/i), { target: { value: 'TYL123' } });
    
        // Submit the form
        fireEvent.click(screen.getByText('Submit Order'));
    
        await waitFor(() => {
            expect(getDoc).toHaveBeenCalledTimes(1); // Check that getDoc was called to load data
        });
    });

    it('checking for valid price', async () => {
        render(<AddMedicine />);
    
        // Fill out the form with valid data
        fireEvent.change(screen.getByLabelText(/Medicine Name*/i), { target: { value: 'Tylenol' } });
        fireEvent.change(screen.getByLabelText(/Quantity in Number*/i), { target: { value: '50' } });
        fireEvent.change(screen.getByLabelText(/Medicine ID*/i), { target: { value: 'TYL123' } });
        fireEvent.change(screen.getByTestId('how-to-use'), { target: { value: 'TYL123' } });
    
        // Submit the form
        fireEvent.click(screen.getByText('Add Medicine'));
    
        await waitFor(() => {
            expect(getDoc).toHaveBeenCalledTimes(1); // Check that getDoc was called to load data
        });
    });

    it('allows for updating the side effects part', async () => {
        render(<AddMedicine />);
    
        // Fill out the form with valid data
        fireEvent.change(screen.getByLabelText(/Medicine Name*/i), { target: { value: 'Tylenol' } });
        fireEvent.change(screen.getByLabelText(/Quantity in Number*/i), { target: { value: '50' } });
        fireEvent.change(screen.getByLabelText(/Medicine ID*/i), { target: { value: 'TYL123' } });
        fireEvent.change(screen.getByTestId('side-effects'), { target: { value: 'TYL123' } });
    
        // Submit the form
        fireEvent.click(screen.getByText('Add Medicine'));
    
        await waitFor(() => {
            expect(getDoc).toHaveBeenCalledTimes(1); // Check that getDoc was called to load data
        });
    });
});