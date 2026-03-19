// src/App.js
import { useState, useEffect } from 'react';

const API = process.env.REACT_APP_API_URL;

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    fetch(`${API}/tasks`).then(r => r.json()).then(setTasks);
  }, []);

  const addTask = async () => {
    const res = await fetch(`${API}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    const task = await res.json();
    setTasks([...tasks, task]);
    setTitle('');
  };

  const deleteTask = async (id) => {
    await fetch(`${API}/tasks/${id}`, { method: 'DELETE' });
    setTasks(tasks.filter(t => t.id !== id));
  };

  const toggleDone = async (task) => {
    const res = await fetch(`${API}/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: task.title, done: !task.done }),
    });
    const updated = await res.json();
    setTasks(tasks.map(t => t.id === updated.id ? updated : t));
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>To-Do App</h1>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="New task" />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map(t => (
          <li key={t.id}>
            <span style={{ textDecoration: t.done ? 'line-through' : 'none' }}>{t.title}</span>
            <button onClick={() => toggleDone(t)}>✓</button>
            <button onClick={() => deleteTask(t.id)}>🗑</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;