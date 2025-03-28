# Game Admin Panel - README

## Features
- Admin Panel to add and manage questions.
- Question input form with the following fields:
  - Type (text)
  - ID (text)
  - Name (text)
  - Description (long text box)
  - Story Type (dropdown with options A, B, C, D)
  - Options A, B, C (text)
  - Result (text)
- Stores data in a JSON file using a Node.js backend.

## Technologies Used
- Frontend: React, TailwindCSS
- Backend: Node.js, Express
- Data Storage: JSON file

## Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/aru22-dev/exposome-scd.git
   cd exposome-scd
   ```
2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

## Running the Application
### Backend
To start the backend server:
```bash
cd backend
node server.js
```
The backend will run at `http://localhost:5050`.

### Frontend
To start the frontend React app:
```bash
cd frontend
npm start
```
The frontend will run at `http://localhost:3000`.

## Usage
1. Visit `http://localhost:3000` to access the Admin Panel.
2. Click on "Login as Admin" to navigate to the question input form.
3. Fill out the form and click "Submit" to add a question.
4. The question data will be stored in `backend/questions.json`.

## Troubleshooting
- If you encounter the error "EADDRINUSE: address already in use", stop any other instances of the server running on port 5050.
- To kill the process manually (Linux/Mac):
  ```bash
  lsof -i :5050
  kill -9 <PID>
  ```
- On Windows:
  ```cmd
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  ```

## Contributing
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-branch
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add new feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature-branch
   ```
5. Open a Pull Request.

## License
This project is licensed under the MIT License.

