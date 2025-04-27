import React from 'react';

const ErrorCard = ({ errorMessage }) => {
  const styles = {
    container: {
      position: 'absolute',
      top: '20px',
      left: '50%',
      backgroundColor: 'red',
      border: '1px solidrgb(255, 0, 25)',
      borderRadius: '5px',
      padding: '20px',
      margin: '20px 0',
      zIndex: 1000,
      color: 'white',
    },
    title: {
      fontSize: '24px',
      marginBottom: '10px',
    },
    message: {
      fontSize: '16px',
    },
    close: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      cursor: 'pointer',
      color: '#721c24',
      fontSize: '20px',
    },
  };

  return (
    <div style={styles.container}>
        <span style={styles.close} onClick={CloseCard}>X</span>
      <h2 style={styles.title}>Error</h2>
      <p style={styles.message}>{errorMessage}</p>
    </div>
  );
};

export default ErrorCard;

function CloseCard() {
  const card = document.querySelector('div[style*="position: absolute"]');
  if (card) {
    card.style.display = 'none';
  }
}