import { useState } from "react";
export default function Feedback() {
  const [name, setName] = useState("");
  const [token, setToken] = useState(localStorage.getItem("userToken") || "");
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "");
  const [comment, setComment] = useState("");
  const [password, setPassword] = useState("");

  const generateToken = async () => {
    const generatedToken = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2);
    setToken(generatedToken);
    localStorage.setItem("userToken", generatedToken);
    localStorage.setItem("userName", name);
    localStorage.setItem("NOTE", "PLEASE DO NOT REMOVE THE DATA FROM LOCAL STORAGE");
    setUserName(name);
    try {
      const response = await fetch("https://codersresources-backend.onrender.com/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name: name, token: generatedToken,password: password }),
      });
      if (!response.ok) {
        throw new Error("Failed to create user");
      }
      console.log("Token generated successfully!");
      localStorage.setItem("userToken", generatedToken);
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
      const response = await fetch('https://codersresources-backend.onrender.com/createFeedbacks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name || localStorage.getItem("userName"), feedback: comment}),
      });


      if (response.ok) {
        setComment("");
    
        alert("Thx for ur comment!");
      } else {
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
          <h2>Send Comments or resources that u want to add</h2>
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
    height: "100vh",
    backgroundColor: "#0D1117",
  },
  title: {
    fontSize: "3rem",
    marginBottom: "20px",
    color: '#58A6FF',
    textShadow: '0px 0px 10px #58A6FF',
    fontFamily: "'Poppins', sans-serif",
  },
  input: {
    width: "100%",
    maxWidth: "500px",
    padding: "15px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "rgba(255, 255, 255, 0.1)", // Fondo semi-transparente
    color: "#fff",
    fontSize: "1rem",
    outline: "none",
    marginBottom: "15px",
    transition: "background-color 0.3s ease", // Efecto suave al interactuar
    boxShadow: "0px 0px 10px rgba(0, 123, 255, 0.5)", // Brillo azul alrededor del input
  },
  textarea: {
    width: "50%",
    maxWidth: "500px",
    padding: "15px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "rgba(255, 255, 255, 0.1)", // Fondo semi-transparente
    color: "#fff",
    fontSize: "1rem",
    outline: "none",
    resize: "none",
    marginBottom: "15px",
    left: '20%',
    position: 'relative',
    transition: "background-color 0.3s ease", // Efecto suave al interactuar
    boxShadow: "0px 0px 10px rgba(0, 123, 255, 0.5)", // Brillo azul alrededor del textarea
  },
  button: {
    padding: "15px 30px",
    borderRadius: "10px",
    border: "none",
    left: "45%",
    position: "absolute",
    backgroundColor: "#007bff", // Azul brillante
    color: "#fff",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "transform 0.3s ease, box-shadow 0.3s ease", // Animación al hacer clic
    boxShadow: "0px 0px 10px rgba(0, 123, 255, 0.5)", // Brillo azul alrededor del botón
    "&:hover": {
      transform: "scale(1.05)", // Aumenta ligeramente el tamaño al pasar el mouse
    },
  },
  changelogs: {
    padding: "10px 20px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#333", // Gris oscuro
    color: "#fff",
    fontSize: "0.9rem",
    cursor: "pointer",
    position: "absolute",
    bottom: "20px",
    left: "48%",
    transform: "translateX(-50%)", // Centra horizontalmente
    textDecoration: "none",
    transition: "background-color 0.3s ease", // Efecto suave al interactuar
    "&:hover": {
      backgroundColor: "#555", // Cambia el color al pasar el mouse
    },
  },
};