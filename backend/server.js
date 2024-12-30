import express from 'express';
import { nanoid } from 'nanoid';
import cors from 'cors';

const app = express();
const PORT = 3000;

// Enable CORS for all routes
app.use(cors());

// In-memory storage for todos
let todos = [];

// Middleware to parse JSON request bodies
app.use(express.json());

// GET /todos - Get all todos
app.get('/todos', (req, res) => {
    res.json(todos);
});

// POST /todos - Add a new todo
app.post('/todos', (req, res) => {
    const { title, description, targetDate } = req.body;
    if (!title || !description || !targetDate) {
        return res.status(400).json({ error: 'Title, description, and targetDate are required.' });
    }

    const todo = {
        id: nanoid(),
        title,
        description,
        targetDate,
        isCompleted: false,
    };
    todos.push(todo);
    res.status(201).json(todo);
});

// PUT /todos/:id - Update an existing todo
app.put('/todos/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, targetDate } = req.body;

    const todoIndex = todos.findIndex((todo) => todo.id === id);
    if (todoIndex === -1) {
        return res.status(404).json({ error: 'Todo not found.' });
    }

    todos[todoIndex] = {
        ...todos[todoIndex],
        title,
        description,
        targetDate,
    };
    res.json(todos[todoIndex]);
});

// DELETE /todos/:id - Delete a todo
app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    const initialLength = todos.length;
    todos = todos.filter((todo) => todo.id !== id);

    if (todos.length === initialLength) {
        return res.status(404).json({ error: 'Todo not found.' });
    }

    res.status(204).send();
});

// PATCH /todos/:id/toggle - Toggle completion status
app.patch('/todos/:id/toggle', (req, res) => {
    const { id } = req.params;
    const todo = todos.find((todo) => todo.id === id);

    if (!todo) {
        return res.status(404).json({ error: 'Todo not found.' });
    }

    todo.isCompleted = !todo.isCompleted;
    res.json(todo);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
