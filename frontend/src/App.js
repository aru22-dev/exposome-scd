import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminPanel from './components/AdminPanel';
import QuestionInputForm from './components/QuestionInputForm';
import CharacterSelection from './components/CharacterSelection';
import Dashboard from './components/Dashboard';
import GameOver from './components/GameOver'; 
import LoginScreen from './components/LoginScreen';
import AdminActionScreen from './components/AdminActionScreen'; 
import CharacterQuiz from './components/CharacterQuizPage';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AdminPanel />} />
                <Route path="/questions" element={<QuestionInputForm />} />
                <Route path="/select-character" element={<CharacterSelection />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/gameover" element={<GameOver />} />
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/admin" element={<AdminActionScreen />} />
                <Route path="/character-quiz" element={<CharacterQuiz />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
