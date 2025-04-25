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
      const response = await fetch('https://localhost:3001/feedbacks', {
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
          <h2 style={style.title}>Get access token</h2>
          <input
          style={style.textarea}
            type="text"
            placeholder="Unique name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button style={style.button} onClick={generateToken}>Generate Token</button>
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
    backgroundColor: "#121212", // Fondo oscuro para un diseño moderno
  },
  title: {
    fontSize: "3rem",
    marginBottom: "20px",
    color: '#58A6FF', // Azul claro
    textShadow: '0px 0px 10px #58A6FF', // Brillo azul
    fontFamily: "'Poppins', sans-serif", // Fuente moderna
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
    width: "100%",
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