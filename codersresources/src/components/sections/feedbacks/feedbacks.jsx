import { useState } from "react";
import Cookies from 'universal-cookie';
import GetFeedbacks from "./getFeedbacks";
import './feedbacks.css'

const cookie = new Cookies();

export default function Feedback() {
  const [name, setName] = useState("");
  const [token, setToken] = useState(cookie.get('userToken') || "");
  const [userName, setUserName] = useState(cookie.get('userName') || "");
  const [comment, setComment] = useState("");
  const [password, setPassword] = useState("");
  const [showLogin, setShowLogin] = useState(true);

  // Registro
  const handleRegister = async () => {
    if (!name.trim() || !password.trim()) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      const response = await fetch("https://codersresources-backend.onrender.com/user/register",  {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName: name, userPassword: password }),
      });
      if (!response.ok) throw new Error("Could not register user");
      const generatedToken = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2);
      setToken(generatedToken);
      setUserName(name);
      cookie.set('userToken', generatedToken, { path: "/", SameSite: "lax", httpOnly: false, secure: false, maxAge: 1130000 });
      cookie.set('userName', name, { path: "/", maxAge: 1130000 });
      alert("Account created successfully!");
    } catch (error) {
      alert("Registration error: " + error.message);
    }
  };

  // Inicio de sesión
  const handleLogin = async () => {
    if (!name.trim() || !password.trim()) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      const response = await fetch("https://codersresources-backend.onrender.com/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName: name, userPassword: password }),
      });
      const data = await response.json();
      if (!data.successful) {
        alert(data.message || "Incorrect username or password");
        return;
      }
      const generatedToken = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2);
      setToken(generatedToken);
      setUserName(name);
      cookie.set('userToken', generatedToken, { path: "/", SameSite: "lax", httpOnly: true, secure: true, maxAge: 1130000 });
      cookie.set('userName', name, { path: "/", maxAge: 1130000 });
      alert("Login successful!");
    } catch (error) {
      alert("Login error: " + error.message);
    }
  };

  const handleCommentSubmit = async () => {
    if (!comment.trim()) {
      alert("Please type something...");
      return;
    }
    try {
      const response = await fetch('https://codersresources-backend.onrender.com/feedback/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ FeedbackAuthor: userName, FeedbackContent: comment, Likes: 0, Reports: 0 }),
      });
      if (response.ok) {
        setComment("");
      }
    } catch (error) {
      alert('Failed to submit comment. Please try again later.');
    }
  };

  return (
    <div style={style.container}>
      {!token || !userName ? (
        <div style={style.formContainer}>
          <h2 style={style.title}>{showLogin ? "Login" : "Register"}</h2>

          <input
            style={style.input}
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            style={style.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button style={style.button} onClick={showLogin ? handleLogin : handleRegister}>
            {showLogin ? "Login" : "Register"}
          </button>

          <button style={style.toggleButton} onClick={() => setShowLogin(!showLogin)}>
            {showLogin ? "Don't have an account? Register" : "Already have an account? Login"}
          </button>
        </div>
      ) : (
        <div>
          <div style={style.CommentInput}>
            <input
              type="text"
              placeholder="Add ur comment..."
              style={style.CommentInputI}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button style={style.button} onClick={handleCommentSubmit}>Send</button>
          </div>
          <GetFeedbacks />
          <button style={style.changelogs} onClick={openLogs}>View changes</button>
        </div>
      )}
    </div>
  );
}

function openLogs() {
  window.open('https://pastebin.com/n4L3yyfY',  '_blank');
}

const stysle = {
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
  formContainer: {
    backgroundColor: "#161B22",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 0 20px rgba(0, 123, 255, 0.5)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "20px",
    color: "#58A6FF",
    textShadow: "0px 0px 10px #58A6FF",
    fontFamily: "'Poppins', sans-serif",
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "#fff",
    fontSize: "1rem",
    outline: "none",
    boxShadow: "0 0 5px rgba(0, 123, 255, 0.4)",
  },
  button: {
    width: "100%",
    padding: "12px",
    marginTop: "15px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    fontSize: "1rem",
    cursor: "pointer",
    boxShadow: "0 0 5px rgba(0, 123, 255, 0.6)",
    transition: "background-color 0.3s ease",
  },
  toggleButton: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#24292e",
    color: "#c9d1d9",
    fontSize: "0.9rem",
    cursor: "pointer",
    textDecoration: "underline",
    background: "transparent",
    color: "#888",
  },
  CommentInput: {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    marginBottom: "2rem",
  },
  CommentInputI: {
    outline: "none",
    border: "0px solid transparent",
    borderBottom: "2px solid #58A6FF",
    backgroundColor: "transparent",
    color: "#fff",
    fontSize: "1rem",
    padding: "10px",
    width: "520px",
    boxShadow: "none",
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
    position: 'fixed',
    left: "0",
    bottom: "0",
  },
};

// Responsive adjustments
if (typeof window !== "undefined") {
  if (window.innerWidth <= 600) {
    style.input.fontSize = "1rem";
    style.title.fontSize = "1.5rem";
  }
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
    fontFamily: "'Poppins', sans-serif",
  },
  contentWrapper: {
    width: "100%",
    maxWidth: "800px",
    margin: "0 auto",
  },
  formContainer: {
    backgroundColor: "#161B22",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 0 15px rgba(0, 123, 255, 0.4)",
    width: "90%",
    maxWidth: "400px",
    textAlign: "center",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "20px",
    color: "#58A6FF",
    textShadow: "0px 0px 10px #58A6FF",
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "#fff",
    fontSize: "1rem",
    outline: "none",
    boxShadow: "0 0 5px rgba(0, 123, 255, 0.4)",
  },
  button: {
    width: "100%",
    padding: "12px",
    marginTop: "15px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    fontSize: "1rem",
    cursor: "pointer",
    boxShadow: "0 0 5px rgba(0, 123, 255, 0.6)",
    transition: "background-color 0.3s ease",
  },
  toggleButton: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "transparent",
    color: "#888",
    fontSize: "0.9rem",
    cursor: "pointer",
    textDecoration: "underline",
  },
  CommentInput: {
    display: "flex",
    gap: "1rem",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "2rem",
    width: "100%",
    maxWidth: "600px",
    margin: "0 auto",
  },
  CommentInputI: {
    width: "100%",
    padding: "12px",
    outline: "none",
    border: "2px solid #58A6FF",
    borderRadius: "8px",
    backgroundColor: "transparent",
    color: "#fff",
    fontSize: "1rem",
  },
  changelogs: {
    padding: "10px 20px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#333",
    color: "#fff",
    fontSize: "0.9rem",
    cursor: "pointer",
    margin: "20px auto",
    display: "block",
    textDecoration: "none",
    transition: "background-color 0.3s ease",
  },
};

// Ajustes responsivos dinámicos (opcional - puedes usar CSS Media Queries también)
if (typeof window !== "undefined") {
const updateStyles = () => {
  const isMobile = window.innerWidth <= 768;

  // Actualiza CommentInputI
  style.CommentInputI = {
    ...style.CommentInputI,
    width: isMobile ? "100%" : "520px",
    fontSize: isMobile ? "1rem" : "1rem"
  };

  // Actualiza title
  style.title = {
    ...style.title,
    fontSize: isMobile ? "1.5rem" : "2rem"
  };
};
  updateStyles();
  window.addEventListener("resize", updateStyles);
}