import './output.css';
import { Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard.tsx';
import Layout from './Layout.tsx';
import { Inventory } from './pages/Inventory.tsx';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />} >
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="inventory" element={<Inventory />} />
            </Route>
        </Routes>
    )
}

export default App;
