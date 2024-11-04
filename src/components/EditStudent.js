import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { StudentContext } from '../context/StudentContext'; // Import the context to update student data

const EditStudent = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { updateStudent } = useContext(StudentContext); // Assuming you have an update function in your context
    const student = location.state;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        class: ''
    });

    useEffect(() => {
        if (student) {
            setFormData({
                name: student.name,
                email: student.email,
                class: student.class
            });
        }
    }, [student]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateStudent(student.id, formData); // Update the student in context
        navigate('/students'); // Navigate back to the student list
    };

    return (
        <div>
            <h2>Edit Student</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Class:</label>
                    <input type="text" name="class" value={formData.class} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-success">Update Student</button>
            </form>
        </div>
    );
};

export default EditStudent;
