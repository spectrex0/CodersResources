import React, { useState } from 'react';
import PropTypes from 'prop-types';
import resourcesData from './resourcesLinks.json';

const styles = {
    resourcesContainer: {
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
            backgroundColor: ' rgba(39, 33, 33, 0.6)',
            color: '#C9D1D9',
            transition: 'transform 0.3s, box-shadow 0.3s',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
        },
        hover: {
            transform: 'scale(1.05)',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.6)',
        },
    },
    image: {
        width: '100%',
        height: '150px',
        objectFit: 'cover',
        borderRadius: '8px',
        marginBottom: '15px',
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
    link: {
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
        },
        hover: {
            backgroundColor: '#58A6FF',
            color: '#0D1117',
            transform: 'scale(1.1)',
        },
    },
    tagsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '8px',
        marginTop: '15px',
    },
    tag: {
        backgroundColor: '#21262D',
        color: '#C9D1D9',
        padding: '6px 12px',
        borderRadius: '6px',
        fontSize: '0.85rem',
        fontFamily: 'Roboto, sans-serif',
    },
    allLinksButton: {
        base: {
            padding: '12px 24px',
            backgroundColor: '#161B22',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            textDecoration: 'none',
            fontWeight: '600',
            transition: 'background-color 0.3s, transform 0.3s',
            fontFamily: 'Roboto, sans-serif',
        },
        hover: {
            backgroundColor: '#58A6FF',
            transform: 'scale(1.1)',
        },
    },
};

function ResourceCard({ name, description, url, tags = [], image }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isButtonHovered, setIsButtonHovered] = useState(false);

    return (
        <div
            style={{
                ...styles.card.base,
                ...(isHovered ? styles.card.hover : {}),
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {image && <img src={image} alt={name} style={styles.image} />}
            <p style={styles.title}>{name}</p>
            <p style={styles.description}>{description}</p>
            <a
                href={url}
                style={{
                    ...styles.link.base,
                    ...(isButtonHovered ? styles.link.hover : {}),
                }}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setIsButtonHovered(true)}
                onMouseLeave={() => setIsButtonHovered(false)}
            >
                Visit Resource
            </a>
            <div style={styles.tagsContainer}>
                {tags.map((tag, index) => (
                    <span key={index} style={styles.tag}>
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
}

ResourceCard.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
    image: PropTypes.string,
};

function Resources() {
    const [isButtonHovered, setIsButtonHovered] = useState(false);

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
                        image={resource.image}
                    />
                ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '30px',backgroundColor:'#0D1117', }}>
                <a
                    href={`data:text/plain;charset=utf-8,${encodeURIComponent(allLinks)}`}
                    download="resources_links.txt"
                    style={{
                        ...styles.allLinksButton.base,
                        ...(isButtonHovered ? styles.allLinksButton.hover : {}),
                    }}
                    onMouseEnter={() => setIsButtonHovered(true)}
                    onMouseLeave={() => setIsButtonHovered(false)}
                >
                    Download All Links
                </a>
            </div>
        </div>
    );
}

export default Resources;
