import './output.css';
import { Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard.tsx';
import Layout from './Layout.tsx';
import { Inventory } from './pages/Inventory.tsx';
import { AddMedicine } from './pages/AddMedicine.tsx';
import { Sales } from './pages/Sales.tsx';
import Order from './pages/Order.tsx';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />} >
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="inventory" element={<Inventory />} />
                <Route path="addmedicine" element={<AddMedicine />} />
                <Route path="sales" element={<Sales />} />
                <Route path="order" element={<Order />} />
            </Route>
        </Routes>
    )
}

export default App;
