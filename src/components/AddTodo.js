// components/AddTodo.js
import React, { useState } from 'react';
import { db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
import styles from './AddTodo.module.css';

function AddTodo() {
  const [todo, setTodo] = useState('');
  const [error, setError] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    setError('');
    if (todo.trim()) {
      setIsAdding(true);
      try {
        await addDoc(collection(db, 'todos'), { text: todo, completed: false });
        setTodo('');
        setIsAdding(false);
      } catch (error) {
        setError('Error adding todo: ' + error.message);
        setIsAdding(false);
      }
    } else {
      setError('Please enter a valid todo.');
    }
  };

  return (
    <div className={styles.addTodo}>
      <form onSubmit={handleAddTodo} className={styles.form}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="Add new mission..."
            className={styles.input}
            disabled={isAdding}
          />
          <button type="submit" className={`${styles.addBtn} ${isAdding ? styles.adding : ''}`} disabled={isAdding}>
            {isAdding ? 'Launching...' : 'Launch'}
          </button>
        </div>
      </form>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export default AddTodo;