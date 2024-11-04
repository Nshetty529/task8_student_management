const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Path to the JSON data file
const dataPath = path.join(__dirname, 'students.json');

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/build'))); // Adjust this if your build folder path is different

// Read data
app.get('/students', (req, res) => {
    fs.readFile(dataPath, 'utf-8', (err, data) => {
        if (err) return res.status(500).send(err);
        res.send(JSON.parse(data));
    });
});

// Add a student
app.post('/students', (req, res) => {
    fs.readFile(dataPath, 'utf-8', (err, data) => {
        if (err) return res.status(500).send(err);
        const students = JSON.parse(data);
        const newStudent = { id: Date.now(), ...req.body };
        students.push(newStudent);
        fs.writeFile(dataPath, JSON.stringify(students), (err) => {
            if (err) return res.status(500).send(err);
            res.send(newStudent);
        });
    });
});

// Update a student
app.put('/students/:id', (req, res) => {
    fs.readFile(dataPath, 'utf-8', (err, data) => {
        if (err) return res.status(500).send(err);
        const students = JSON.parse(data);
        const updatedStudents = students.map(student =>
            student.id === parseInt(req.params.id) ? { ...student, ...req.body } : student
        );
        fs.writeFile(dataPath, JSON.stringify(updatedStudents), (err) => {
            if (err) return res.status(500).send(err);
            res.send(updatedStudents.find(student => student.id === parseInt(req.params.id)));
        });
    });
});

// Delete a student
app.delete('/students/:id', (req, res) => {
    fs.readFile(dataPath, 'utf-8', (err, data) => {
        if (err) return res.status(500).send(err);
        const students = JSON.parse(data);
        const filteredStudents = students.filter(student => student.id !== parseInt(req.params.id));
        fs.writeFile(dataPath, JSON.stringify(filteredStudents), (err) => {
            if (err) return res.status(500).send(err);
            res.send({ message: 'Student deleted successfully' });
        });
    });
});

// The "catchall" handler: for any request that doesn't match one above, send back index.html.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html')); // Adjust if necessary
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
