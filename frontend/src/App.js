import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPanel from './components/AdminPanel';
import QuestionInputForm from './components/QuestionInputForm';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AdminPanel />} />
                <Route path="/questions" element={<QuestionInputForm />} />
            </Routes>
        </Router>
    );
}

export default App;
