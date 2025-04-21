import React from 'react';
import icons from './assets/icons/icn.json'
const styles = {
    card: {
        width: '300px',
        border: '1px solid #5DADE2',
        borderRadius: '8px',
        marginTop:'80px',
        margin: '10px',
        padding: '20px',
        textAlign: 'center',
        borderColor:'rgba(0, 132, 255, 0.2)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        // flex: '1 1 calc(33.333% - 20px)', // Default for larger screens
        boxSizing: 'border-box',
    },
    cardHover: {
        transform: 'scale(1.05)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '20px',
        marginTop: '10%',
    },
    '@media (max-width: 768px)': {
        card: {
            flex: '1 1 calc(50% - 20px)',
        },
    },
    '@media (max-width: 480px)': {
        card: {
            flex: '1 1 100%', 
        },
    },
};

const Main = () => {
    const [hoveredCard, setHoveredCard] = React.useState(null);

    const handleMouseEnter = (card) => setHoveredCard(card);
    const handleMouseLeave = () => setHoveredCard(null);

    const getResponsiveCardStyle = (card) => {
        const baseStyle = {
            ...styles.card,
            ...(hoveredCard === card ? styles.cardHover : {}),
        };

        if (window.innerWidth <= 480) {
            baseStyle.flex = '1 1 100%';
        } else if (window.innerWidth <= 768) {
            baseStyle.flex = '1 1 calc(50% - 20px)';
        }

        return baseStyle;
    };

    const handleCardClick = (card) => {
        if (card === 'changelogs') {
            window.open(`/changelogs`, '_blank');
        }
    };

    return (
        <div style={styles.container}>
            <div
                className="card"
                style={getResponsiveCardStyle('contribute')}
                onMouseEnter={() => handleMouseEnter('contribute')}
                onMouseLeave={handleMouseLeave}
            >
                <h3>Contribute</h3>
                <p>Send your own ideas and resources.</p>
                <img src={icons.code.path} style={{width: icons.code.size, color: icons.code.color}} alt="code_icon" />
            </div>
            <div
                className="card"
                style={getResponsiveCardStyle('changelogs')}
                onMouseEnter={() => handleMouseEnter('changelogs')}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleCardClick('changelogs')}
            >
                <h3>Changelogs</h3>
                <p>View the latest updates and changes.</p>
            </div>
            <div
                className="card"
                style={getResponsiveCardStyle('Free')}
                onMouseEnter={() => handleMouseEnter('Free')}
                onMouseLeave={handleMouseLeave}
            >
                <h3>Free</h3>
                <p>the access and resources here are free</p>
            </div>
        </div>
    );
};

export default Main;