export function Button(props) {
    return (
        <button
            className="btn btn-primary custom-button" // Agregar clase personalizada
            onClick={props.onClick}
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
            style={buttonStyle}
            onTouchMove={props.onTouchMove}
        >
            {props.label}
        </button>
    );
}

export const buttonStyle = {
    backgroundColor: 'rgba(44, 48, 53, 0.09)', // Dark background color
    color: '#FFFFFF',
    border: '1px solid rgb(1, 136, 226)',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'all 0.3s ease',
    position: 'absolute',
    display: 'flex',
    top: '40%',
    left: '46%',
    flex: '1 1 calc(33.333% - 20px)', // Default for larger screens
};

export const buttonHoverStyle = {
    backgroundColor: 'rgb(1, 136, 226)', // Light blue background color
    color: '#FFFFFF',
    transform: 'scale(1.05)',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
};

export default Button;