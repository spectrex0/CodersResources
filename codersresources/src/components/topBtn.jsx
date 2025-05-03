import resourcesData from '../components/sections/resources/resourcesLinks.json';
import downloadLogo from '../components/assets/icons/download.svg';

const DownloadBtn = () => {
        const allLinks = Object.values(resourcesData)
        .map(item => item.url)
        .join('\n');


    return (
        <div style={style.downloadBtn}>
            <a 
                href={`data:text/plain;charset=utf-8,${encodeURIComponent(allLinks)}`} 
                download="resources_links.txt"
            >
                <img style={style.img} src={downloadLogo} alt="DownloadLg" />
            </a>
        </div>
    );
}

export default DownloadBtn;

const style = {
    downloadBtn: {
        backgroundColor: 'rgba(0, 115, 255, 0.06)',
        width: '30px',
        height: '30px',
        position: 'absolute',
        top: '10px',
        right: '10px',
        cursor: 'pointer',
        borderRadius: '50%',
        padding: '10px',
        transition: 'transform 0.3s ease, filter 0.3s ease',
    },
    img: {
        width: '100%',
        height: '100%',
        filter: 'opacity(0.4)',
        transition: 'transform 0.3s ease, filter 0.3s ease',
    },
}