// App.js
import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import Login from './components/Login';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();  // Clean up listener
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      console.log('User signed out');
    }).catch((error) => {
      console.error('Logout error:', error);
    });
  };

  return (
    <div className="App">
      {user ? (
        <>
          <header>
            <h1>Todo List</h1>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </header>
          <AddTodo />
          <TodoList />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
