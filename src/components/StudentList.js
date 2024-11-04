import React, { useContext, useState } from 'react';
import { StudentContext } from '../context/StudentContext';
import StudentPagination from './Pagination';
import { useNavigate } from 'react-router-dom';

const StudentList = () => {
    const { students, deleteStudent } = useContext(StudentContext);
    const [currentPage, setCurrentPage] = useState(1);
    const studentsPerPage = 10;

    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

    const navigate = useNavigate();

    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    };

    const handleView = (id) => {
        navigate(`/student/${id}`);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            deleteStudent(id);
        }
    };

    return (
        <div>
            <h2>Student List</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Class</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentStudents.length > 0 ? (
                        currentStudents.map(student => (
                            <tr key={student.id}>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td>{student.class}</td>
                                <td>
                                    <button onClick={() => handleView(student.id)} className="btn btn-info">View</button>
                                    <button onClick={() => handleEdit(student.id)} className="btn btn-primary">Edit</button>
                                    <button onClick={() => handleDelete(student.id)} className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">No students found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <StudentPagination 
                totalStudents={students.length} 
                studentsPerPage={studentsPerPage} 
                setCurrentPage={setCurrentPage} 
            />
        </div>
    );
};

export default StudentList;
