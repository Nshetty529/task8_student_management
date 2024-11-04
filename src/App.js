// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentList from './components/StudentList';
import StudentDetail from './components/StudentDetails';
import StudentForm from './components/StudentForm';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard'; // Make sure Dashboard is imported
import { StudentProvider } from './context/StudentContext';

const App = () => {
    return (
        <StudentProvider>
            <Router>
                <div className="container mt-4">
                    <Navbar />
                    {/* <h1>Student Management Portal</h1> */}
                    <Routes>
                        <Route path="/" element={<StudentList />} />
                        <Route path="/students" element={<StudentList />} />
                        <Route path="/student/:id" element={<StudentDetail />} />
                        <Route path="/edit/:id" element={<StudentForm />} />
                        <Route path="/register" element={<StudentForm />} />
                        <Route path="/dashboard" element={<Dashboard />} /> {/* Add Dashboard Route */}
                    </Routes>
                </div>
            </Router>
        </StudentProvider>
    );
};

export default App;
