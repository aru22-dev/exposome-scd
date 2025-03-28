import React, { useState } from 'react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import CardContent from '../ui/CardContent';
import Input from '../ui/Input';
import Label from '../ui/Label';

const QuestionInputForm = () => {
    const [formData, setFormData] = useState({
        type: '',
        id: '',
        name: '',
        description: '',
        storyType: '',
        result: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        await fetch('http://localhost:5050/api/add-question', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        alert('Question added successfully!');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="p-10 rounded-2xl shadow-xl">
                <CardContent className="space-y-4">
                    <h1 className="text-3xl font-bold mb-4">Add Question</h1>
                    <div className="space-y-1">
                        <Label>ID</Label>
                        <Input
                            type="text"
                            name="id"
                            value={formData.type}
                            onChange={handleChange}
                            placeholder="Enter id"
                            className="w-full p-2 border rounded-lg"
                        />
                    </div>
                    <div className="space-y-1">
                        <Label>Type</Label>
                        <Input
                            type="text"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            placeholder="Enter type"
                            className="w-full p-2 border rounded-lg"
                        />
                    </div>
                    <div className="space-y-1">
                        <Label>Name</Label>
                        <Input
                            type="text"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            placeholder="Enter name"
                            className="w-full p-2 border rounded-lg"
                        />
                    </div>
                    <div className="space-y-1">
                        <Label>Description</Label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter description"
                            className="w-full p-2 border rounded-lg h-32"
                        />
                    </div>
                    <div className="space-y-1">
                        <Label>Story Type</Label>
                        <select
                            name="storyType"
                            value={formData.storyType}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                        >
                            <option value="">Select Story Type</option>
                            <option value="a">A</option>
                            <option value="b">B</option>
                            <option value="c">C</option>
                            <option value="d">D</option>
                        </select>
                    </div>
                    <div className="space-y-1">
                        <Label>Result</Label>
                        <Input
                            name="result"
                            value={formData.result}
                            onChange={handleChange}
                            placeholder="Enter result"
                            className="w-full p-2 border rounded-lg"
                        />
                    </div>
                    <Button onClick={handleSubmit} className="w-full mt-4">Submit</Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default QuestionInputForm;