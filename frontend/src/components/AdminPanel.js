import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import Card from '../ui/Card';
import CardContent from '../ui/CardContent';

const AdminPanel = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="p-10 rounded-2xl shadow-xl">
                <CardContent className="space-y-4">
                    <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
                    <Button onClick={() => handleNavigation('/play')} className="w-full">Play Game</Button>
                    <Button onClick={() => handleNavigation('/login')} className="w-full">Login as Admin</Button>
                    <Button onClick={() => handleNavigation('/questions')} className="w-full">View Questions</Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminPanel;