import React, { useState } from "react";


export default function Feedback() {
  const [name, setName] = useState("");
  const [token, setToken] = useState(localStorage.getItem("userToken") || "");
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "");
  const [comment, setComment] = useState("");

  const generateToken = () => {
    const generatedToken = crypto.randomUUID();
    localStorage.setItem("userToken", generatedToken);
    localStorage.setItem("userName", name);
    setToken(generatedToken);
    setUserName(name);
  };

   const handleCommentSubmit = async () => {
    if ( !comment) {
      alert("Please fill in both name and comment.");
      return;
    }

    try {
      const response = await fetch('https://cr-backend-lime.vercel.app/api/feedbacks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, comment }),
      });

      const data = await response.json();

      if (response.ok) {
        setComment("");
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('Failed to submit comment. Please try again later.');
    }
  };


  return (
    <div style={style.container}>
      {!token || !userName ? (
        <div>
          <h2>Get access token</h2>
          <input
            type="text"
            placeholder="Unique name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={generateToken}>Generate Token</button>
        </div>
      ) : (
        <div>
          <h2>Send Comments and resources that u want to add</h2>
          <p>Hello <strong>{userName}</strong> 👋</p>
          <textarea style={style.textarea}
            rows="4"
            cols="50"
            placeholder="Please add ur comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <br />
          <button style={style.button} onClick={handleCommentSubmit}>Send</button>
          <button style={style.changelogs} onClick={openLogs} >View changes</button>
        </div>
      )}
    </div>
  );
}

function openLogs() {
  window.open('https://pastebin.com/n4L3yyfY' , '_blank');
}
const style = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  textarea: {
    width: "100%",
    maxWidth: "500px",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    resize: "none",
    outline: "none",
     backgroundColor: 'rgba(39, 33, 33, 0.6)',
     textAlign: "center",
    color: "#fff",
  },
  button: {
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
    marginTop: "10px",
    marginLeft: "25%",
  },
  changelogs: {
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#333",
    color: "#fff",
    cursor: "pointer",
    marginTop: "10px",
    marginLeft: "10px",
  },
}