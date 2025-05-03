import React, { useState, useEffect } from 'react';
import dotenv from 'dotenv';
dotenv.config();
const feedbackLink = process.env.feedbackUrl;
const adminPass = process.env.adminPass;  

function Dashboard() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state for login
  const [password, setPassword] = useState(''); 
  const [ users] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      async function fetchFeedbacks() {
        try {
          const response = await fetch(feedbackLink, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          setFeedbacks(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }

      fetchFeedbacks();
    }
  }, [isLoggedIn]); // Fetch feedbacks only if logged in

  const handleLogin = () => {
    if (password === 'tokyodev') {
      setIsLoggedIn(true);
    } else {
      alert('Incorrect password');
    }
  };

  const style = {
    container: {
      display: "flex",
      margin: "0px auto",
      flexDirection: "column",
      alignItems: "center",
      flexGrow: 1,
      justifyContent: "center",
      height: "100vh",
      width: "100vw",
      backgroundColor: "#0D1117",
    },
    title: {
      fontSize: "2rem",
      marginBottom: "20px",
    },
    Card: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textarea: {
      width: "300px",
      height: "100px",
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #ccc",
    },
    input: { // New style for input
      marginBottom: "10px",
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      width: "300px",
    },
    button: { // New style for button
      padding: "10px 20px",
      borderRadius: "5px",
      border: "none",
      backgroundColor: "#58A6FF",
      color: "#fff",
      cursor: "pointer",
    },
  };

  if (!isLoggedIn) {
    return (
      <div style={style.container}>
        <h2 style={style.title}>Login</h2>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={style.input}
        />
        <button onClick={handleLogin} style={style.button}>
          Login
        </button>
      </div>
    );
  }

  if (loading) {
    return <div style={style.container}>Loading...</div>;
  }

  if (error) {
    return <div style={style.container}>Error: {error}</div>;
  }

  return (
    <div style={style.container}>
      <h2 style={style.title}>Dashboard</h2>
      <div style={style.Card}>
        {feedbacks.length > 0 ? (
          feedbacks.map((feedback, index) => (
            <div
              key={index}
              style={{
                margin: '10px 0',
                padding: '10px',
                backgroundColor: 'rgba(39, 33, 33, 0.6)',
                borderRadius: '5px',
                maxWidth: '300px',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                flexGrow: 4,
                alignItems: 'center',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                transition: 'transform 0.2s',
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
              }}
            >
              <h3 style={{ color: '#58A6FF' }}>{feedback.name}</h3>
              <code style={{ color: 'gray' }}>{feedback.token}</code>
              <p style={{ color: '#ccc', maxWidth: '300px' }}>{feedback.feedback}</p>
            </div>
          ))
        ) : (
          <p style={{ color: '#ccc' }}>No feedbacks available... try again later</p>
        )}
      </div>
      <div style={style.title}>USERS</div>
<div style={style.Card}>
        {users.length > 0 ? (
          users((users) => (
            <div
              key={users}
              style={{
                margin: '10px 0',
                padding: '10px',
                backgroundColor: 'rgba(4, 4, 4, 0.6)',
                borderRadius: '5px',
                maxWidth: '300px',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                flexGrow: 4,
                alignItems: 'center',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                transition: 'transform 0.2s',
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
              }}
            >
              <h3 style={{ color: '#58A6FF' }}>{users.name}</h3>
              <code style={{ color: 'gray' }}>{users.token}</code>
            </div>
          ))
        ) : (
          <p style={{ color: '#ccc' }}>No users available... try again later</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;