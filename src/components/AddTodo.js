// components/AddTodo.js
import React, { useState } from 'react';
import { db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';

function AddTodo() {
  const [todo, setTodo] = useState('');
  const [error, setError] = useState('');

  const handleAddTodo = async (e) => {
    e.preventDefault();
    setError('');
    if (todo.trim()) {
      try {
        await addDoc(collection(db, 'todos'), { text: todo, completed: false });
        setTodo('');
      } catch (error) {
        setError('Error adding todo: ' + error.message);
      }
    } else {
      setError('Please enter a valid todo.');
    }
  };

  return (
    <div>
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="Add new todo"
        />
        <button type="submit">Add</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default AddTodo;
