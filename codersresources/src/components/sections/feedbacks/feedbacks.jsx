import React, { useState } from "react";
// import x from '../../../../api/feedbacks'
export default function Feedback() {
  const [name, setName] = useState("");
  const [token, setToken] = useState(localStorage.getItem("userToken") || "");
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "");
  const [comment, setComment] = useState("");

  // Generar un token único para el usuario
  const generateToken = () => {
    const generatedToken = crypto.randomUUID();
    localStorage.setItem("userToken", generatedToken);
    localStorage.setItem("userName", name);
    setToken(generatedToken);
    setUserName(name);
  };

  const handleCommentSubmit = async (e) => {
  e.preventDefault();

  if (!comment) {
    alert("Please type something..");
    return;
  }

  try {
    
      const usuario = localStorage.getItem("userName")
    const response = await fetch("../../../../api/feedbacks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName: usuario, comment }),
      
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Success:", data);
    setComment("");
    alert("Comment saved successfully!");
  } catch (error) {
    console.error("Error submitting comment:", error);
    alert("Failed to submit comment. Please try again later.");
  }
};

  return (
    <div style={style.container}>
      {!token || !userName ? (
        <div>
          <h2 style={style.title}>Get access token</h2>
          <input
            style={style.input}
            type="text"
            placeholder="Unique name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button style={style.button} onClick={generateToken}>
            Generate Token
          </button>
        </div>
      ) : (
        <div>
          <h2>Send Comments and resources that you want to add</h2>
          <p>Hello <strong>{userName}</strong> 👋</p>
          <textarea
            style={style.textarea}
            rows="4"
            cols="50"
            placeholder="Please add your comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <br />
          <button style={style.button} onClick={handleCommentSubmit}>
            Send
          </button>
          <button style={style.changelogs} onClick={openLogs}>
            View changes
          </button>

          {/* Mostrar comentarios guardados */}
          <div>
            <h3>Saved Feedbacks:</h3>
            <FeedbackList />
          </div>
        </div>
      )}
    </div>
  );
}

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  React.useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch("../../../../api/feedbacks");
        if (!response.ok) {
          throw new Error("Failed to fetch feedbacks");
        }
        const data = await response.json();
        setFeedbacks(data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <ul>
      {feedbacks.map((feedback, index) => (
        <li key={index}>
          <strong>{feedback.userName}:</strong> {feedback.comment}
        </li>
      ))}
    </ul>
  );
};

function openLogs() {
  window.open("https://pastebin.com/n4L3yyfY", "_blank");
}

const style = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#121212",
  },
  title: {
    fontSize: "3rem",
    marginBottom: "20px",
    color: "#58A6FF",
    textShadow: "0px 0px 10px #58A6FF",
    fontFamily: "'Poppins', sans-serif",
  },
  input: {
    width: "100%",
    maxWidth: "500px",
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
  },
  textarea: {
    width: "100%",
    maxWidth: "500px",
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
  },
  changelogs: {
    padding: "10px 20px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#333",
    color: "#fff",
    fontSize: "0.9rem",
    cursor: "pointer",
    position: "absolute",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    textDecoration: "none",
    transition: "background-color 0.3s ease",
  },
};