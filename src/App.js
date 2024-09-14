//App.js
import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import Login from './components/Login';
import styles from './App.module.css';

function App() {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    // Check for user's preferred theme
    const isDarkMode = localStorage.getItem('darkMode') === 'false';
    setDarkMode(!isDarkMode);

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      console.log('User signed out');
    }).catch((error) => {
      console.error('Logout error:', error);
    });
  };

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', !newDarkMode);
  };

  return (
    <div className={`${styles.app} ${!darkMode ? styles.lightMode : ''}`}>
      <div className={styles.background}>
        <div className={styles.stars}></div>
        <div className={styles.twinkling}></div>
      </div>
      <div className={styles.content}>
        {user ? (
          <>
            <header className={styles.header}>
              <h1 className={styles.title}>Todify</h1>
              <div className={styles.buttonContainer}>
                <button className={styles.themeToggle} onClick={toggleTheme}>
                  {!darkMode ? '🌙 Dark' : '☀️ Light'}
                </button>
                <button className={styles.logoutBtn} onClick={handleLogout}>Logout</button>
              </div>
            </header>
            <main className={`${styles.main} ${styles.fadeIn}`}>
              <AddTodo />
              <TodoList />
            </main>
          </>
        ) : (
          <Login />
        )}
      </div>
    </div>
  );
}

export default App;