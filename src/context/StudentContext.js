import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
    const [students, setStudents] = useState([]);

    const fetchStudents = async () => {
        const response = await axios.get('http://localhost:5000/students');
        setStudents(response.data);
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const addStudent = async (student) => {
        const response = await axios.post('http://localhost:5000/students', student);
        setStudents([...students, response.data]);
    };

    const updateStudent = async (updatedStudent) => {
        const response = await axios.put(`http://localhost:5000/students/${updatedStudent.id}`, updatedStudent);
        setStudents(students.map(student => student.id === response.data.id ? response.data : student));
    };

    const deleteStudent = async (id) => {
        await axios.delete(`http://localhost:5000/students/${id}`);
        setStudents(students.filter(student => student.id !== id));
    };

    return (
        <StudentContext.Provider value={{ students, addStudent, updateStudent, deleteStudent }}>
            {children}
        </StudentContext.Provider>
    );
};
