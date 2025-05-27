import resourcesData from '../components/sections/resources/resourcesLinks.json';
import downloadLogo from '../components/assets/icons/download.svg';


const DownloadBtn = () => {
        const allLinks = Object.values(resourcesData)
        .map(item => item.url)
        .join('\n');


    return (
        <div>
            <a 
                style={style.downloadBtn}
                href={`data:text/plain;charset=utf-8,${encodeURIComponent(allLinks)}`} 
                download="resources_links.txt"
            >
                
                <img style={style.img} src={downloadLogo} alt="DownloadLg" />
                Download All links
            </a>
        </div>
    );
}

export default DownloadBtn;

const style = {
    downloadBtn: {
        textDecoration: 'none',
        backgroundColor: 'rgba(0, 115, 255, 0.06)',
        width: 'auto',
        height: '30px',
        position: 'absolute',
        top: '15px',
        right: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: 'white',
        borderRadius: '1rem',
        padding: '10px 15px',
        transition: 'transform 0.3s ease, filter 0.3s ease',
        gap: '10px', // Adds spacing between text and logo
    },
    img: {
        width: '20px',
        height: '20px',
        filter: 'opacity(0.8)',
        transition: 'transform 0.3s ease, filter 0.3s ease',
    },
};