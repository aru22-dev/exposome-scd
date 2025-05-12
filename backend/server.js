const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

const filePath = path.join(__dirname, 'questions.json');

// Read JSON
const readQuestions = () => {
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};

// Write JSON
const writeQuestions = (questions) => {
  fs.writeFileSync(filePath, JSON.stringify(questions, null, 2), 'utf-8');
};

// 📥 GET all questions
app.get('/api/questions', (req, res) => {
  const questions = readQuestions();
  res.json(questions);
});

// ➕ ADD a question
app.post('/api/add-question', (req, res) => {
  const questions = readQuestions();
  const newQuestion = req.body;
  questions.push(newQuestion);
  writeQuestions(questions);
  res.status(201).json({ message: 'Question added' });
});

// ✏️ UPDATE a specific question
app.post('/api/update-question/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const updatedQuestion = req.body;

  if (!id || !updatedQuestion || typeof updatedQuestion !== 'object') {
    return res.status(400).json({ message: 'Invalid update request' });
  }

  let questions = readQuestions();
  const index = questions.findIndex(q => parseInt(q.id, 10) === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Question not found' });
  }

  updatedQuestion.id = id; // preserve ID
  questions[index] = updatedQuestion;
  writeQuestions(questions);

  console.log(`✅ Updated question ID ${id}`);
  res.json({ message: 'Question updated successfully' });
});

// 🗑️ DELETE a question
app.delete('/api/delete-question/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const questions = readQuestions();
  const newQuestions = questions.filter(q => q.id !== id);
  writeQuestions(newQuestions);
  res.json({ message: 'Question deleted' });
});

// 🔁 UPDATE ALL questions & reindex IDs
app.put('/api/update-all-questions', (req, res) => {
  const updatedQuestions = req.body;

  if (!Array.isArray(updatedQuestions)) {
    return res.status(400).json({ message: 'Invalid data format. Expected an array.' });
  }

  const sanitized = updatedQuestions.map((q, index) => ({
    ...q,
    id: index + 1 // ensure sequential ID
  }));

  writeQuestions(sanitized);
  console.log('✅ All questions updated and reindexed');
  res.json({ message: 'Questions updated and reindexed successfully' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
