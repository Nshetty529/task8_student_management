// src/components/Dashboard.js
import React from 'react';
import { useContext } from 'react';
import { StudentContext } from '../context/StudentContext';

const Dashboard = () => {
    const { students } = useContext(StudentContext); // Access the students from context
    return (
        <div>
            <h2>Dashboard</h2>
            <p>Total Number of Students: {students.length}</p>
            
        </div>
    );
};

export default Dashboard;
