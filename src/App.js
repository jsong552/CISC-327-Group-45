import './output.css';
import { Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard.tsx';
import Layout from './Layout.tsx';
import { Inventory } from './pages/Inventory.tsx';
import { AddMedicine } from './pages/AddMedicine.tsx';

function App() {
    return (
      
            <Routes>
            <Route path="/" element={<Layout />} >
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="inventory" element={<Inventory />} />
                <Route path="addmedicine" element={<AddMedicine />} />
            </Route>
        </Routes>
        
        

    )
}

export default App;
