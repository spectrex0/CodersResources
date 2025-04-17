import React from 'react';
import cheatsheetsData from './cheatsheetsLinks.json';

const styles = {
    cheatsheetsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        marginTop: '10%',
        justifyContent: 'center',
        padding: '20px',
    },
    cardBody: {
        border: '1px solid #444',
        borderRadius: '8px',
        padding: '16px',
        width: '300px',
        textAlign: 'center',
        boxShadow: '0 4px 6px rgba(0, 132, 255, 0.2)',
        backgroundColor: '',
        color: '#fff',
        transition: 'transform 0.3s, box-shadow 0.3s',
    },
    cardBodyHover: {
        transform: 'scale(1.05)',
        boxShadow: '0 8px 12px rgba(0, 0, 0, 0.7)',
    },
    cardTitle: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '8px',
        color: '#fff',
    },
    cardDescription: {
        fontSize: '1rem',
        marginBottom: '12px',
        color: '#ccc',
    },
    cardLink: {
        color: '#1E90FF',
        textDecoration: 'none',
        fontWeight: 'bold',
        wordBreak: 'break-word',
        display: 'block',
        marginBottom: '12px',
        padding: '8px',
        border: '1px solid #555',
        borderRadius: '4px',
        backgroundColor: '#444',
    },
    allLinks: {
        marginTop: '20px',
        textAlign: 'center',
    },
    allLinksButton: {
        padding: '10px 20px',
        backgroundColor: '#1E90FF',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        textDecoration: 'none',
    },
};

function Card(props) {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <div
            style={{
                ...styles.cardBody,
                ...(isHovered ? styles.cardBodyHover : {}),
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <p style={styles.cardTitle}>{props.language}</p>
            <p style={styles.cardDescription}>{props.description}</p>
            {props.links.map((link, index) => (
                <a
                    key={index}
                    href={link}
                    style={styles.cardLink}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {link}
                </a>
            ))}
        </div>
    );
}

function Cheatsheets() {
    const allLinks = cheatsheetsData
        .flatMap(item => item.links)
        .join('\n');

    return (
        <div>
            <div style={styles.cheatsheetsContainer}>
                {cheatsheetsData.map((item, index) => (
                    <Card
                        key={index}
                        language={item.language}
                        description={item.description}
                        links={item.links}
                    />
                ))}
            </div>
            <div style={styles.allLinks}>
                <a
                    href={`data:text/plain;charset=utf-8,${encodeURIComponent(allLinks)}`}
                    download="cheatsheets_links.txt"
                    style={styles.allLinksButton}
                >
                    Download All Links
                </a>
            </div>
        </div>
    );
}

export default Cheatsheets;