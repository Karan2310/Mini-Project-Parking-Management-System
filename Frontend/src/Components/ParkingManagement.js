import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dashboard from '../Pages/Dashboard';
import Records from '../Pages/Records';
import Analytics from '../Pages/Analytics';
import User from '../Pages/User';
import Error from '../Pages/Error';
import About from '../Pages/About';

export default function ParkingManagement({ updateLoginStatus }) {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/records" element={<Records />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/user" element={<User updateLoginStatus={updateLoginStatus} />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </Router>
    )
}
