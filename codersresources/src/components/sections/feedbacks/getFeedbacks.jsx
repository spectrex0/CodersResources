import React, { useEffect, useState } from "react";

export default function GetFeedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [menuIdx, setMenuIdx] = useState(null);

 
  useEffect(() => {
    async function fetchFeedbacks() {
      try {
        const res = await fetch("https://codersresources-backend.onrender.com/feedback/get"); 
        if (!res.ok) throw new Error("Error fetching feedbacks");

        const data = await res.json();
        setFeedbacks(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchFeedbacks();
  }, []);

function getUserId() {
  let userId = localStorage.getItem("cr_user_id");
  if (!userId) {
    userId = "user_" + Math.random().toString(36).slice(2, 12);
    localStorage.setItem("cr_user_id", userId);
  }
  return userId;
}

function getUserActions() {
  try {
    return JSON.parse(localStorage.getItem("cr_actions") || "{}");
  } catch {
    return {};
  }
}
function setUserActions(actions) {
  localStorage.setItem("cr__actions", JSON.stringify(actions));
}

const handleLike = async (idx) => {
  const feedbackId = feedbacks[idx]?._id?.toString();
  if (!feedbackId) return;

  const userId = getUserId();
  const actions = getUserActions();

  if (actions[feedbackId]?.liked) return;
  const updatedFeedbacks = [...feedbacks];
  updatedFeedbacks[idx].Likes += 1;
  setFeedbacks(updatedFeedbacks);

  actions[feedbackId] = { ...(actions[feedbackId] || {}), liked: true };
  setUserActions(actions);

  try {
    const res = await fetch("https://codersresources-backend.onrender.com/feedback/like", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: feedbackId, userId })
    });
    if (!res.ok) throw new Error("Failed to send the like");
  } catch (err) {
    console.error("Error liking feedback:", err);
  }
};

const handleReport = async (idx) => {
  const feedbackId = feedbacks[idx]?._id?.toString();
  if (!feedbackId) return;

  const userId = getUserId();
  const actions = getUserActions();

  if (actions[feedbackId]?.reported) return;

  const updatedFeedbacks = [...feedbacks];
  updatedFeedbacks[idx].Reports += 1;
  setFeedbacks(updatedFeedbacks);

  actions[feedbackId] = { ...(actions[feedbackId] || {}), reported: true };
  setUserActions(actions);

  try {
    const res = await fetch("https://codersresources-backend.onrender.com/feedback/report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: feedbackId, userId })
    });
    if (!res.ok) throw new Error("Failed to report feedback");
  } catch (err) {
  }

  setMenuIdx(null);
};

  return (
    <div style={{
      maxWidth: "200vw",
      width: "150%",
      margin: "2rem auto",
      padding: "0",
      position: "relative",
      left: "-20%",
      background: "#181c24",
      borderRadius: "1.5rem",
      boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
      minHeight: "60vh",
      border: "1px solid #23283a"
    }}>
      <div style={{
        borderBottom: "1px solid #23283a",
        padding: "1.5rem 2rem 1rem 2rem"
      }}>
        <h2 style={{ color: "#0073ff", margin: 0, fontWeight: 700, fontSize: "1.5rem" }}>
          Coders Resources Forum
        </h2>
      </div>
      <div style={{ padding: "1.5rem 2rem" }}>
        {feedbacks.length === 0 && (
          <div style={{ color: "#aaa", textAlign: "center" }}>No feedbacks yet.</div>
        )}
        {feedbacks.map((fb, idx) => (
          <div key={idx} style={{
            display: "flex",
            gap: "1rem",
            padding: "1.25rem 0",
            borderBottom: idx !== feedbacks.length - 1 ? "1px solid #23283a" : "none",
            position: "relative"
          }}>
            {/* Avatar */}
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "#23283a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                color: "#0073ff",
                fontSize: "1.2rem",
                flexShrink: 0,
                cursor: "pointer",
                position: "relative"
              }}
              onClick={() => setMenuIdx(menuIdx === idx ? null : idx)}
            >
              {(fb.FeedbackAuthor || "U").charAt(0).toUpperCase()}
              
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "0.25rem"
              }}>
                <span style={{
                  fontWeight: 700,
                  color: "#0073ff",
                  fontSize: "1.05rem"
                }}>
                  {fb.FeedbackAuthor || "Unknownuser"}
                </span>
                <span style={{
                  color: "#888",
                  fontSize: "0.93rem",
                  fontStyle: "italic"
                }}>
                  {fb.FeedbackDate ? new Date(fb.FeedbackDate).toLocaleString() : ""}
                </span>
              </div>
              <div style={{
                color: "#fff",
                fontSize: "1.05rem",
                lineHeight: 1.7,
                marginTop: "0.25rem"
              }}>
                {fb.FeedbackContent}
              </div>
              {/* Mostrar Likes y Reports reales del backend */}
              <div style={{
                display: "flex",
                gap: "1rem",
                marginTop: "0.5rem",
                position: "absolute",
                right: "0",
                top: "40%"
              }}>
                <div style={{
                  background: "#23283a",
                  color: "#0073ff",
                  borderRadius: "0.5rem",
                  padding: "0.2rem 0.7rem",
                  fontSize: "0.95rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem", 
                }} onClick={() => handleLike(idx)}>
                  👍 {fb.Likes ?? 0} Likes
                  
                </div>
                <div style={{
                  background: "#23283a",
                  color: "#ff4d4f",
                  borderRadius: "0.5rem",
                  padding: "0.2rem 0.7rem",
                  fontSize: "0.95rem",
                  display: "flex", 
                  alignItems: "center",
                  gap: "0.3rem"
                }}  onClick={() => handleReport(idx)}>
                  👎 {fb.Reports ?? 0} Dislike
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cerrar menú al hacer clic fuera */}
      {menuIdx !== null && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1
          }}
          onClick={() => setMenuIdx(null)}
        />
      )}
    </div>
  );
}