import React, {useState} from 'react';
import './App.css'; 
import Main from './components/main';
import Cards from './components/cards';
import Button from './components/button';
import Resources from './components/sections/resources/resources';
import Footer from './components/footer'
import FeedbacksPage from './components/sections/feedbacks/feedbacks';
import Cheatsheets from './components/sections/cheatsheets/cheatsheets';
function App() {
  const [activeSection, setActiveSection] = useState('homeScreen');
  const sections = {
    homeScreen: (
      <div>
        <div className="App"></div>
        <Main />
        <Button label="Get Started" onClick={() => setActiveSection['cheatsheets']} />
        <Cards />
        <Footer />
      </div>
    ),
    Resources: (
    <Resources/>
    ),
    cheatsheets: <Cheatsheets />,
    FeedbacksPage: <FeedbacksPage/>,
  };

  const Menu = () => {
    return (
      <nav style={styles.nav}>
        <ul style={{ listStyleType: 'none', margin: 0, padding: 0, display: 'flex', gap: '15px' }}>
          <li 
            style={{ color: 'white', cursor: 'pointer' }} 
            onClick={() => setActiveSection('homeScreen')}
          >
            Home
          </li>
          <li 
            style={{ color: 'white', cursor: 'pointer' }} 
            onClick={() => setActiveSection('Resources')}
          >
            Resources
          </li>
          <li 
            style={{ color: 'white', cursor: 'pointer' }} 
            onClick={() => setActiveSection('cheatsheets')}
          >
            Cheatsheets
          </li>
          <li
            style={{ color: 'white', cursor: 'pointer' }} 
            onClick={() => setActiveSection('FeedbacksPage')}
          >
            Feedbacks
          </li>
        </ul>
      </nav>
    );
  };


  return (
    <div>
      <Menu />
      {sections[activeSection]}
    </div>
  );
}

const styles = {
  nav: {
        backgroundColor: 'rgba(0, 132, 255, 0.09)',
        color: '#fff',
        textAlign: 'center',
        padding: '0px 0',
        position: 'fixed',
        top: 0,
        height: '40px',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%',
    },
  }






export default App;
