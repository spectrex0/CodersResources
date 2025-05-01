import React from 'react';

export default function footer() {
    return (
        <div>
            <footer style={styles.footer}>
            {/* <p>Thx for ur visit!</p> */}
                <p>Made with 💙 by Tokyo (Spectre)</p>
                {/* <p onClick={openChanges}>View Changelogs</p> */}
            </footer>
        </div>
    ); 
}

const styles  = {
    footer: {
        backgroundColor: 'rgba(44, 48, 53, 0.09)',
        color: 'gray',
        textAlign: 'center',
        padding: '0px 0',
        position: 'fixed',
        bottom: 0,
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%',
    },
}
