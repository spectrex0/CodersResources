import React, { useState } from 'react';
import cheatsheetsData from './cheatsheetsLinks.json';

const styles = {
    cheatsheetsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        marginTop: '5%',
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: '#0D1117',
    },
    card: {
        base: {
            border: '1px solid #21262D',
            borderRadius: '12px',
            padding: '20px',
            width: '100%',
            maxWidth: '300px',
            textAlign: 'center',
            backgroundColor: 'rgba(39, 33, 33, 0.6)',
            color: '#C9D1D9',
            transition: 'transform 0.3s, box-shadow 0.3s',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
        },
        hover: {
            transform: 'scale(1.05)',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.6)',
        },
    },
    title: {
        fontSize: '1.5rem',
        fontWeight: '700',
        marginBottom: '10px',
        color: '#FFFFFF',
        fontFamily: 'Roboto, sans-serif',
    },
    description: {
        fontSize: '1rem',
        marginBottom: '15px',
        color: '#8B949E',
        fontFamily: 'Roboto, sans-serif',
    },
    button: {
        base: {
            color: '#58A6FF',
            textDecoration: 'none',
            fontWeight: '600',
            display: 'inline-block',
            marginTop: '10px',
            padding: '10px 20px',
            border: '1px solid #58A6FF',
            borderRadius: '8px',
            backgroundColor: '#161B22',
            transition: 'background-color 0.3s, transform 0.3s',
            fontFamily: 'Roboto, sans-serif',
            cursor: 'pointer',
        },
        hover: {
            backgroundColor: '#58A6FF',
            color: '#0D1117',
            transform: 'scale(1.1)',
        },
    },
     searchBar: {
        width: '20%',
        maxWidth: '400px',
        padding: '10px',
        borderRadius: '8px',
        marginTop: '1%',
        border: '0px solid #21262D',
        fontSize: '1rem',
        fontFamily: 'Roboto, sans-serif',
        backgroundColor: 'rgba(0, 115, 255, 0.06)',
        color: '#C9D1D9',
        position: "absolute",
        top:"0",
        outline: "none"
    },
};

function Card(props) {
    const [isHovered, setIsHovered] = React.useState(false);
    const [hoveredButtonIndex, setHoveredButtonIndex] = React.useState(null);

    return (
        <div
            style={{
                ...styles.card.base,
                ...(isHovered ? styles.card.hover : {}),
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <p style={styles.title}>{props.language}</p>
            <p style={styles.description}>{props.description}</p>
            {props.links.map((link, index) => (
                <button
                    key={index}
                    style={{
                        ...styles.button.base,
                        ...(hoveredButtonIndex === index ? styles.button.hover : {}),
                    }}
                    onMouseEnter={() => setHoveredButtonIndex(index)}
                    onMouseLeave={() => setHoveredButtonIndex(null)}
                    onClick={() => window.open(link, '_blank', 'noopener,noreferrer')}
                >
                    {new URL(link).hostname}
                </button>
            ))}
        </div>
    );
}

function Cheatsheets() {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredCheatsheets = cheatsheetsData.filter((item) =>
        item.language.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <input
                type="text"
                placeholder="Search cheatsheets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={styles.searchBar}
            />
            <div style={styles.cheatsheetsContainer}>
                {filteredCheatsheets.map((item, index) => (
                    <Card
                        key={index}
                        language={item.language}
                        description={item.description}
                        links={item.links}
                    />
                ))}
            </div>
        </div>
    );
}

if(window.innerWidth <= 600){
    styles.searchBar.display = 'none'
}

export default Cheatsheets;
