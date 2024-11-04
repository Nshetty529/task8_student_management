import React, { useContext, useState, useEffect } from 'react';
import { StudentContext } from '../context/StudentContext';
import { useParams, useNavigate } from 'react-router-dom';

const StudentForm = () => {
    const { addStudent, updateStudent, students } = useContext(StudentContext);
    const { id } = useParams();
    const navigate = useNavigate();

    const [studentData, setStudentData] = useState({
        name: '',
        email: '',
        class: '',
        address: '',
        phone: '',
    });

    useEffect(() => {
        if (id) {
            const studentToEdit = students.find(student => student.id === parseInt(id));
            if (studentToEdit) {
                setStudentData(studentToEdit);
            }
        }
    }, [id, students]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudentData({ ...studentData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            updateStudent(studentData);
        } else {
            addStudent(studentData);
        }
        navigate('/students');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{id ? 'Edit Student' : 'Register Student'}</h2>
            <div className="form-group">
                <label>Name:</label>
                <input type="text" name="name" value={studentData.name} onChange={handleChange} required className="form-control" />
            </div>
            <div className="form-group">
                <label>Email:</label>
                <input type="email" name="email" value={studentData.email} onChange={handleChange} required className="form-control" />
            </div>
            <div className="form-group">
                <label>Class:</label>
                <input type="text" name="class" value={studentData.class} onChange={handleChange} required className="form-control" />
            </div>
            <div className="form-group">
                <label>Address:</label>
                <input type="text" name="address" value={studentData.address} onChange={handleChange} required className="form-control" />
            </div>
            <div className="form-group">
                <label>Phone Number:</label>
                <input type="text" name="phone" value={studentData.phone} onChange={handleChange} required className="form-control" />
            </div>
            <button type="submit" className="btn btn-success">{id ? 'Update' : 'Register'}</button>
            <button type="button" onClick={() => navigate('/students')} className="btn btn-secondary">Cancel</button>
        </form>
    );
};

export default StudentForm;
