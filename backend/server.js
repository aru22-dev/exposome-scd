const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5050;
const filePath = path.join(__dirname, 'questions.json');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route to add a question
app.post('/api/add-question', (req, res) => {
    const newQuestion = req.body;
    let questions = [];

    // Check if the file exists and read it
    if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, 'utf-8');
        questions = JSON.parse(fileData);
    }

    // Add the new question to the list
    questions.push(newQuestion);

    // Write the updated questions to the file
    fs.writeFileSync(filePath, JSON.stringify(questions, null, 2));

    res.json({ message: 'Question added successfully!' });
});

// Route to get all questions
app.get('/api/questions', (req, res) => {
    if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, 'utf-8');
        const questions = JSON.parse(fileData);
        res.json(questions);
    } else {
        res.json([]);
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});