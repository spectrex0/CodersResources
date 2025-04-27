import React from 'react';

const GoodCard = ({ goodMessage }) => {
  const styles = {
    container: {
      backgroundColor: '#d4edda',
      border: '1px solid #c3e6cb',
      borderRadius: '5px',
      padding: '20px',
      margin: '20px 0',
      color: '#155724',
      zIndex: 1000,
    },
    title: {
      fontSize: '24px',
      marginBottom: '10px',
    },
    message: {
      fontSize: '16px',
    },
  };

  return (
    <div style={styles.container}>
    <span>X</span>
      <h2 style={styles.title}>Success</h2>
      <p style={styles.message}>{goodMessage}</p>
    </div>
  );
};

export default GoodCard;