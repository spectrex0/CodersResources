import React, { useState, useEffect } from 'react';

// Import images
import jsImg from './assets/icons/js.png';
import nextImg from './assets/icons/next.png';
import tsImg from './assets/icons/ts.png';
import htmlImg from './assets/icons/html.png';
import cssImg from './assets/icons/css.png';

const icons = [jsImg, nextImg, tsImg, htmlImg, cssImg];

const styles = {
    container: {
        textAlign: 'center',
        padding: '0 0px',
        backgroundColor: '#0D1117', // Dark background
        height: '100vh', // Full viewport height
        color: '#C9D1D9', // Light text
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', // Center content vertically
        alignItems: 'center',
        overflow: 'hidden', // Prevent scrolling
    },
    title: {
        fontSize: '3em',
        color: '#58A6FF', // Bright blue
        textShadow: '0px 0px 10px #58A6FF',
        marginBottom: '20px',
        fontFamily: "'Poppins', sans-serif",
        fontWeight: '600',
    },
    paragraph: {
        fontSize: '1.2em',
        // color: '#8B949E', // Muted blue-gray
        color:'white',
        marginBottom: '20px', // Reduced margin
        fontFamily: "'Roboto', sans-serif",
        fontWeight: '300',
        lineHeight: '1.8',
        maxWidth: '600px',
    },
    iconContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '15px', // Reduced gap
        flexWrap: 'wrap',
    },
    icon: {
        width: '3rem',
        height: '3rem',
        filter: 'opacity(0.4)', // Slightly increased opacity
        
        // backgroundColor: '#21262D', // Subtle background for icons
        padding: '10px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)', // Add shadow for better appearance
    },
    '@media (max-width: 768px)': {
        title: {
            fontSize: '2.5em',
        },
        icon: {
            width: '2.5rem',
            height: '2.5rem',
        },
    },
    '@media (max-width: 480px)': {
        title: {
            fontSize: '2em',
        },
        icon: {
            width: '2rem',
            height: '2rem',
        },
    },
};

const Main = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Welcome To Coders Resources</h1>
            <p style={styles.paragraph}>
                Discover a curated collection of resources for coders, designed to inspire and empower your journey.
            </p>
            <div style={styles.iconContainer}>
                {icons.map((src, index) => (
                    <img
                        key={index}
                        src={src}
                        alt={`icon-${index}`}
                        style={styles.icon}
                    />
                ))}
            </div>
        </div>
    );
};

export default Main;
