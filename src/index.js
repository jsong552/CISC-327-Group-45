import React from 'react';
import ReactDOM from 'react-dom/client';
import './output.css';
import App from './App';
import Sidebar from './components/sidebar.tsx';
import { BrowserRouter } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    <div>
    <App />
    {/* <Sidebar/> */}
    </div>
    </BrowserRouter>
);
