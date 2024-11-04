// src/components/StudentDetail.js

import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { StudentContext } from '../context/StudentContext';

const StudentDetail = () => {
    const { id } = useParams();
    const { students } = useContext(StudentContext);
    
    const student = students.find(student => student.id === parseInt(id));

    if (!student) {
        return <div>Student not found.</div>;
    }

    return (
        <div>
            <h2>Student Details</h2>
            <ul>
                <li><strong>Name:</strong> {student.name}</li>
                <li><strong>Email:</strong> {student.email}</li>
                <li><strong>Class:</strong> {student.class}</li>
                {/* <li><strong>Age:</strong> {student.age}</li> */}
                <li><strong>Address:</strong> {student.address}</li>
                <li><strong>Phone Number:</strong> {student.phone}</li>
            </ul>
            <button className="btn btn-secondary" onClick={() => window.history.back()}>Go Back</button>
        </div>
    );
};

export default StudentDetail;
