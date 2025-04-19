import {CSSproparties} from 'react'
let mielda = CSSproparties
export default function footer() {
    return (
        <div>
            <footer style={styles.footer}>
                <p>Made with 💖 by Spectre</p>
            </footer>
        </div>
    ); 
}

const styles = {footer: mielda} = {
    footer: {
        backgroundColor: 'rgba(44, 48, 53, 0.09)',
        color: '#fff',
        textAlign: 'center',
        padding: '0px 0',
        position: 'fixed',
        bottom: 0,
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%',
    },
}