// frontend/src/App.jsx
import { useEffect, useState } from 'react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => { fetchTasks(); }, []);

  const fetchTasks = () =>
    fetch(`${API}/tasks`).then(r => r.json()).then(setTasks);

  const addTask = async () => {
    if (!input.trim()) return;
    await fetch(`${API}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: input })
    });
    setInput('');
    fetchTasks();
  };

  const toggleTask = async (task) => {
    await fetch(`${API}/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: task.title, completed: !task.completed })
    });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`${API}/tasks/${id}`, { method: 'DELETE' });
    fetchTasks();
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <input value={input} onChange={e => setInput(e.target.value)} placeholder="New task..." />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map(t => (
          <li key={t.id}>
            <input type="checkbox" checked={t.completed} onChange={() => toggleTask(t)} />
            <span style={{ textDecoration: t.completed ? 'line-through' : 'none' }}>{t.title}</span>
            <button onClick={() => deleteTask(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}