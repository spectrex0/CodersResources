import React from 'react';
import resourcesData from './resourcesLinks.json';

const styles = {
    resourcesContainer: {
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

function ResourceCard(props) {
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
            <p style={styles.cardTitle}>{props.name}</p>
            <p style={styles.cardDescription}>{props.description}</p>
            <a
                href={props.url}
                style={styles.cardLink}
                target="_blank"
                rel="noopener noreferrer"
            >
                Visit Resource
            </a>
            <div>
                {props.tags.map((tag, index) => (
                  
                    <span
                        key={index}
                        style={{
                            backgroundColor: '#555',
                            color: '#fff',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            margin: '2px',
                            fontSize: '0.8rem',
                        }}
                    >
                    
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
}

function Resources() {
    const allLinks = Object.values(resourcesData)
        .map(item => item.url)
        .join('\n');

    return (
        <div>
            <div style={styles.resourcesContainer}>
                {Object.values(resourcesData).map((resource, index) => (
                    <ResourceCard
                        key={index}
                        name={resource.name}
                        description={resource.description}
                        url={resource.url}
                        tags={resource.tags}
                    />
                ))}
            </div>
            <div style={styles.allLinks}>
                <a
                    href={`data:text/plain;charset=utf-8,${encodeURIComponent(allLinks)}`}
                    download="resources_links.txt"
                    style={styles.allLinksButton}
                >
                    Download All Links
                </a>
            </div>
        </div>
    );
}

export default Resources;