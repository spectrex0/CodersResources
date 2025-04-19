// import icons from './assets/icons/icn.json';

export function Button(props) {
    return (
        <button className="btn btn-primary" onClick={props.onClick} style={buttonStyle} onTouchMove={props.onTouchMove}>
            {props.label}
        </button>
    );
}



export const buttonStyle = {
    backgroundColor: 'rgba(44, 48, 53, 0.09)', // Dark background color
    color: '#FFFFFF',          
    border: '1px solid rgb(35, 38, 40)',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'all 0.3s ease',
    position: 'relative',
    display: 'flex',
    top: '130px',
    left:'46%',
    flex: '1 1 calc(33.333% - 20px)', // Default for larger screens

    ':hover': {
        backgroundColor: '#34495E', 
        borderColor: '#5DADE2',
        gap: '10px',
    },
    ':active': {
        backgroundColor: '#292929',
        borderColor: '#FFFFFF',
    },
};
export default Button;