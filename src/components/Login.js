import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import styles from './Login.module.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isNewUser) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.stars}></div>
      <div className={styles.twinkling}></div>
      <div className={styles.clouds}></div>
      
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Todify</h1>
        <h2 className={styles.subtitle}>{isNewUser ? 'Launch Your Journey' : 'Welcome Back, Explorer'}</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className={styles.input}
            />
            <span className={styles.inputBorder}></span>
          </div>
          <div className={styles.inputGroup}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className={styles.input}
            />
            <span className={styles.inputBorder}></span>
          </div>
          <button type="submit" className={styles.submitBtn}>
            {isNewUser ? 'Blast Off!' : 'Engage'}
          </button>
        </form>
        {error && <p className={styles.error}>{error}</p>}
        <button 
          onClick={() => setIsNewUser(!isNewUser)}
          className={styles.toggleBtn}
        >
          {isNewUser ? 'Already on board? Log in' : 'New astronaut? Sign Up'}
        </button>
      </div>
    </div>
  );
}

export default Login;