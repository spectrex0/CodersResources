import { useState } from "react";
import Cookies from 'universal-cookie'
const cookie = new Cookies()
export default function Feedback() {
  const [name, setName] = useState("");
  const [token, setToken] = useState(cookie.get('userToken') || "");
  const [userName, setUserName] = useState(cookie.get('userName') || "");
  const [comment, setComment] = useState("");
  const [password, setPassword] = useState("");

  const generateToken = async () => {
    const generatedToken = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2);
    setToken(generatedToken);
    setUserName(name);
    try {
      const response = await fetch("https://codersresources-backend.onrender.com/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({userName: name, userPassword: password }),
      });
      if (!response.ok) {
        throw new Error("Failed to create user");
      }
      console.log("User account generated successfully!");
      cookie.set('userToken', generatedToken, {path: "/", SameSite:"lax", httpOnly: false, secure:false,maxAge:1130000})
      cookie.set('userName',name,{path: "/",maxAge:1130000})
    } catch (error) {
      console.error("Error generating token:", error);
    }
  };


   const handleCommentSubmit = async () => {
    if ( !comment.trim()) {
    alert("Please type something...");
    return;   
    }

    try {
      const response = await fetch('https://codersresources-backend.onrender.com/feedback/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ FeedbackAuthor: name || cookie.get('userName'), FeedbackContent: comment}),
      });


      if (response.ok) {
        setComment("");
    
        alert("Thx for ur comment!");
      } else {
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback. Please try again later.');
    }
  };


  return (
    <div style={style.container}>
    
      {!token || !userName ? (
        <div>
          <h2 style={style.title}>Generate Account or login</h2>
          <input
          style={style.textarea}
            type="text"
            placeholder="Unique name or current username to login."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
           <div>
          <input
          style={style.textarea}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
          <button style={style.button} onClick={generateToken}>proceed</button>
        </div>
      ) : (
        <div>
          <h2 style={style.h2}>Send Comments or resources that u want to add</h2>
          <p>Hello <strong>{userName}</strong> 👋</p>
          <textarea style={style.textarea}
            rows="4"
            cols="50"
            placeholder="Please add your comment"
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
    minHeight: "100vh",
    backgroundColor: "#0D1117",
    padding: "20px",
    boxSizing: "border-box",
  },
  h2: {
    fontSize: "2rem",
    marginBottom: "20px",
    color: "#58A6FF",
    textShadow: "0px 0px 10px #58A6FF",
    fontFamily: "'Poppins', sans-serif",
    textAlign: "center",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "20px",
    color: "#58A6FF",
    textShadow: "0px 0px 10px #58A6FF",
    fontFamily: "'Poppins', sans-serif",
    textAlign: "center",
  },
  input: {
    width: "100%",
    maxWidth: "400px",
    padding: "15px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "#fff",
    fontSize: "1rem",
    outline: "none",
    marginBottom: "15px",
    transition: "background-color 0.3s ease",
    boxShadow: "0px 0px 10px rgba(0, 123, 255, 0.5)",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
  textarea: {
    width: "100%",
    maxWidth: "400px",
    padding: "15px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "#fff",
    fontSize: "1rem",
    outline: "none",
    resize: "none",
    marginBottom: "15px",
    transition: "background-color 0.3s ease",
    boxShadow: "0px 0px 10px rgba(0, 123, 255, 0.5)",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
  button: {
    padding: "15px 30px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    boxShadow: "0px 0px 10px rgba(0, 123, 255, 0.5)",
    margin: "10px auto",
    display: "block",
  },
  changelogs: {
    padding: "10px 20px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#333",
    color: "#fff",
    fontSize: "0.9rem",
    cursor: "pointer",
    margin: "10px auto",
    display: "block",
    textDecoration: "none",
    transition: "background-color 0.3s ease",
  },
};

if (typeof window !== "undefined" && window.innerWidth <= 600) {
  style.container.padding = "10px";
  style.textarea.maxWidth = "95vw";
  style.input.maxWidth = "95vw";
  style.button.width = "100%";
  style.changelogs.width = "100%";
}

