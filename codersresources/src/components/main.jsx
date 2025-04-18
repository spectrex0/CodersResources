import React, { useState, useEffect } from 'react';

// Import images
let jsImge = require('./assets/icons/js.png');
let nextImg = require('./assets/icons/next.png');
let tsImg = require('./assets/icons/ts.png');
let htmlImg = require('./assets/icons/html.png');
let cssImg = require('./assets/icons/css.png');

const icons = [
    { src: jsImge },
    { src: nextImg },
    { src: tsImg },
    { src: htmlImg },
    { src: cssImg }
];

const iconPositions = [
    { top: '10%', left: '30%' },
    { top: '20%', left: '70%' },
    { top: '40%', left: '60%' },
    { top: '80%', left: '49%' },
    { top: '30px', left: '40%', transform: 'translate(-50%, -50%)' }
];

const styles = {
    container: {
        textAlign: 'center',
        marginTop: '50px',
        padding: '0 20px',
    },
    heading: {
        fontSize: '2em',
        color: '#333',
    },
    paragraph: {
        fontSize: '1.2em',
        color: '#888888',
        marginBottom: '20px',
        fontFamily: 'Arial, sans-serif',
        fontWeight: '300',
        lineHeight: '1.5',
    },
    title: {
        fontSize: '2.5em',
        color: '#FFFFFF',
    },
    icon: {
        position: 'absolute',
        width: '3rem',
        filter: 'opacity(0.2)',
        animationName: 'upDown',
        animationDuration: '2s',
        animationIterationCount: 'infinite',
        animationDirection: 'alternate',
        animationTimingFunction: 'ease-in-out',
        boxShadow: "#FFFFFF",
    },
    '@media (max-width: 768px)': {
        title: {
            fontSize: '2em',
        },
        icon: {
            width: '2rem',
        },
    },
    '@media (max-width: 480px)': {
        title: {
            fontSize: '1.5em',
        },
        icon: {
            width: '1.5rem',
        },
    },
};

const Main = () => {
    const [responsiveIconPositions, setResponsiveIconPositions] = useState(iconPositions);

    useEffect(() => {
        const updatePositions = () => {
            setResponsiveIconPositions(window.innerWidth <= 468 ? [{ display: "none" }] : iconPositions);
        };

        updatePositions();
        window.addEventListener('resize', updatePositions);

        return () => window.removeEventListener('resize', updatePositions);
    }, []);

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Welcome To Coders Resources</h1>
            <p style={styles.paragraph}>Here u will have a colection of Resources for coders!.</p>
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                {icons.map((icon, index) => (
                    <img
                        alt="icon"
                        key={index}
                        src={icon.src}
                        style={{ ...styles.icon, ...iconPositions[index], ...responsiveIconPositions[index] }}
                    />
                ))}
            </div>
        </div>
    );
};

export default Main;
