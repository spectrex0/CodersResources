import React, { useState, useEffect } from 'react';

function Dashboard() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);      

  useEffect(() => {
    
    async function fetchFeedbacks() {
      try {
        const response = await fetch('https://codersresources-backend.onrender.com/feedbacks', {
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
  }, []); 

  const style = {
    container: {
      display: "flex",
      margin: "100px auto",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      width: "100vw",
      backgroundColor: "#121212",
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
  };

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
                backgroundColor: '#2b2b2b',
                borderRadius: '5px',
                maxWidth: '300px',
                display:'flex',
                justifyContent:'center',
                flexDirection:'column',
                flexGrow: 1,
                alignItems:'center',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                transition: 'transform 0.2s',
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
              }}
            >
              <h3 style={{ color: '#58A6FF' }}>{feedback.userName}</h3>
              <code style={{color: 'gray'}}>{feedback.token}</code>
              <p style={{ color: '#ccc', maxWidth: '300px', }}>{feedback.comment}</p>
            </div>
          ))
        ) : (
          <p style={{ color: '#ccc' }}>No feedbacks available... try again later</p>
        )}
      </div>
    </div>
  );
}



export default Dashboard;