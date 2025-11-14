// frontend/src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../utils/api';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await loginUser({ username, password });
      
      // Store token for private routes
      localStorage.setItem('authToken', data.token); 
      
      // 🛑 FINAL FIX: Introduce a small, mandatory delay (e.g., 100ms) 
      // This ensures the browser persists the token to localStorage 
      // before navigating and immediately trying to read it on the Kiosk page.
      await new Promise(resolve => setTimeout(resolve, 100));
      
      navigate('/dashboard'); 
    } catch (err) {
      setError(err.message || 'Login failed. Check server status.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '30px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Logging In...' : 'Log In'}
        </button>
      </form>
      <div style={{marginTop: '20px', fontSize: '0.9em', color: '#555'}}>
        Note: Use username **admin** and password **password123** for login.
      </div>
    </div>
  );
}

export default Login;