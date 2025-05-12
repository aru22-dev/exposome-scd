import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import Card from '../ui/Card';
import CardContent from '../ui/CardContent';
import Input from '../ui/Input';
import Label from '../ui/Label';

const QuestionInputForm = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [editId, setEditId] = useState(null);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  const [formData, setFormData] = useState({
    text: '',
    options: [
      { label: 'A', text: '', effects: { community: '', resources: '', health: '' } },
      { label: 'B', text: '', effects: { community: '', resources: '', health: '' } },
      { label: 'C', text: '', effects: { community: '', resources: '', health: '' } }
    ]
  });

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/add-question`);
      const data = await response.json();
      setQuestions(data.filter(q => q.text && q.text.trim()));
    };
    fetchQuestions();
  }, []);

  const handleChange = (e, optionIndex, field, isEffect = false) => {
    let value = e.target.value;

    if (isEffect && !/^[-]?[0-9]{1,2}$/.test(value) && value !== '' && value !== '-') {
      alert('Only numbers between -10 and 10 are allowed.');
      return;
    }

    if (optionIndex !== null) {
      const updatedOptions = [...formData.options];
      if (isEffect) {
        updatedOptions[optionIndex].effects[field] = value;
      } else {
        updatedOptions[optionIndex][field] = value;
      }
      setFormData({ ...formData, options: updatedOptions });
    } else {
      setFormData({ ...formData, [e.target.name]: value });
    }
  };

  const handleEdit = (question) => {
    setEditId(question.id);
    setFormData({
      text: question.text,
      options: question.options.length === 3 ? question.options : formData.options
    });
  };

  const promptDelete = (id) => {
    setDeleteTargetId(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (deleteTargetId !== null) {
      await fetch(`${process.env.REACT_APP_API_URL}/api/delete-question/${deleteTargetId}`, { method: 'DELETE' });

      const renumbered = questions
        .filter(q => q.id !== deleteTargetId)
        .map((q, idx) => ({ ...q, id: idx + 1 }));

      await fetch(`${process.env.REACT_APP_API_URL}/api/update-all-questions`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(renumbered)
      });

      setQuestions(renumbered);
      setDeleteTargetId(null);
      setShowDeleteConfirm(false);
    }
  };

  const cancelDelete = () => {
    setDeleteTargetId(null);
    setShowDeleteConfirm(false);
  };

  const handleSubmit = async () => {
    const preparedData = {
      id: editId || (questions.length > 0 ? Math.max(...questions.map(q => parseInt(q.id, 10))) + 1 : 1),
      text: formData.text,
      options: formData.options.map(opt => ({
        ...opt,
        effects: {
          community: parseInt(opt.effects.community, 10) || 0,
          resources: parseInt(opt.effects.resources, 10) || 0,
          health: parseInt(opt.effects.health, 10) || 0
        }
      }))
    };

    const url = editId
      ? `${process.env.REACT_APP_API_URL}/api/update-question/${editId}`
      : `${process.env.REACT_APP_API_URL}/api/add-question`;

    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(preparedData)
    });

    setEditId(null);
    setFormData({
      text: '',
      options: formData.options.map(opt => ({
        label: opt.label,
        text: '',
        effects: { community: '', resources: '', health: '' }
      }))
    });

    const refreshed = await (await fetch(`${process.env.REACT_APP_API_URL}/api/questions`)).json();
    setQuestions(refreshed);
    alert('Question saved successfully!');
  };

  const handleLogout = () => navigate('/');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-6 relative">
      {/* Logout */}
      <div className="absolute top-6 right-6">
        <Button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-xl shadow">
          Logout
        </Button>
      </div>

      {/* Toggle Button */}
      <div className="flex justify-center mb-6">
        <Button
          onClick={() => {
            if (showQuestions) {
              setEditId(null);
              setFormData({
                text: '',
                options: formData.options.map(opt => ({
                  label: opt.label,
                  text: '',
                  effects: { community: '', resources: '', health: '' }
                }))
              });
            }
            setShowQuestions(!showQuestions);
          }}
          className="bg-purple-600 text-white text-lg px-6 py-3 rounded-full shadow"
        >
          {showQuestions ? 'Hide Questions' : 'View or Update Existing Questions'}
        </Button>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md text-center space-y-4">
            <h2 className="text-xl font-bold text-red-600">Confirm Deletion</h2>
            <p className="text-gray-700">Are you sure you want to delete this question?</p>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold"
              >
                Yes, Delete
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-300 text-blue-900 px-4 py-2 rounded-lg font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Questions List + Input Form */}
      <div className={`grid ${showQuestions ? 'lg:grid-cols-2' : 'grid-cols-1'} gap-6`}>
        {showQuestions && (
          <div className="space-y-6 w-full transition-all duration-700 ease-in-out">
            {questions.map((q, index) => (
              <div
                key={q.id}
                className="bg-white p-6 rounded-3xl shadow border border-blue-200 animate-fade-in-up"
              >
                <p className="font-semibold text-blue-800 text-lg mb-2">
                  <span className="text-sm text-gray-600 italic">Question {index + 1}</span><br />
                  {q.text?.trim() || '(No question text)'}
                </p>
                <ul className="pl-4 text-sm text-blue-700 mb-4 list-disc">
                  {q.options?.map(opt => (
                    <li key={opt.label}><strong>{opt.label}:</strong> {opt.text}</li>
                  ))}
                </ul>
                <div className="flex justify-end gap-2">
                  <Button className="bg-yellow-400 hover:bg-yellow-500" onClick={() => handleEdit(q)}>Edit</Button>
                  <Button className="bg-red-500 hover:bg-red-600" onClick={() => promptDelete(q.id)}>Delete</Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Input Form */}
        <div className={`flex justify-center ${showQuestions ? '' : 'col-span-full'}`}>
          <Card className="w-full max-w-3xl bg-white shadow-2xl rounded-3xl p-10">
            <CardContent className="space-y-8">
              <h1 className="text-4xl font-extrabold text-blue-800 text-center mb-6">
                {editId ? 'Edit Question' : 'Add a New Exposure Question'}
              </h1>

              {/* Question Text */}
              <div>
                <Label className="text-blue-900 font-semibold">Question Text</Label>
                <textarea
                  name="text"
                  value={formData.text}
                  onChange={(e) => handleChange(e, null)}
                  placeholder="What situation are you posing to the player?"
                  className="w-full p-3 border border-blue-300 rounded-xl shadow-sm h-24 resize-none"
                />
              </div>

              {/* Options */}
              {formData.options.map((opt, index) => (
                <div key={index} className="border border-blue-200 rounded-xl p-6 bg-blue-50">
                  <h3 className="text-lg font-bold text-blue-800 mb-4">Option {opt.label}</h3>
                  <div className="mb-4">
                    <Label className="text-blue-900 font-semibold">Option Text</Label>
                    <Input
                      type="text"
                      value={opt.text}
                      onChange={(e) => handleChange(e, index, 'text')}
                      placeholder={`Option ${opt.label} response text`}
                      className="w-full p-2 border border-blue-300 rounded-lg"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                    {['community', 'resources', 'health'].map(field => (
                      <div key={field}>
                        <Label className="text-blue-900 font-semibold">
                          {field.charAt(0).toUpperCase() + field.slice(1)} Effect (+/-)
                        </Label>
                        <Input
                          type="text"
                          value={opt.effects[field]}
                          onChange={(e) => handleChange(e, index, field, true)}
                          placeholder="e.g. -5 or 10"
                          className="w-full p-2 border border-blue-300 rounded-lg"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button onClick={handleSubmit} className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl">
                  {editId ? 'Update Question' : 'Submit Question'}
                </Button>
                <Button onClick={() => navigate('/admin')} className="w-full bg-gray-300 text-blue-900 font-bold py-3 rounded-xl">
                  Back to Admin Panel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QuestionInputForm;
