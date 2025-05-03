import React, {useState} from 'react';
import './App.css'; 
import Main from './components/main';
// import Cards from './components/cards';
// import Button from './components/button';
import Resources from './components/sections/resources/resources';
import Footer from './components/footer'
import FeedbacksPage from './components/sections/feedbacks/feedbacks';
import Cheatsheets from './components/sections/cheatsheets/cheatsheets';
//  import Dashboard from './components/sections/dashboard/dasboard';
function App() {
  const [activeSection, setActiveSection] = useState('homeScreen');
  const sections = {
    homeScreen: (
      <div>
        <div className="App"></div>
        <Main />
        {/* <Button label="Get Started" onClick={() => setActiveSection('cheatsheets')} /> */}
        {/* <Cards /> */}
        <Footer />
      </div>    ),
    Resources: (
    <Resources/>
    ),
    cheatsheets: <Cheatsheets />,
    FeedbacksPage: <FeedbacksPage/>,
    // dashboard: <Dashboard />,
  };

  const Menu = () => {
    const menuItems = [
      { label: 'Home', section: 'homeScreen' },
      { label: 'Resources', section: 'Resources' },
      { label: 'Cheatsheets', section: 'cheatsheets' },
      { label: 'Feedback', section: 'FeedbacksPage' },
      // { label: 'Dashboard', section: 'dashboard' }
    ];

    return (
      <nav style={styles.nav}>
      
        <ul style={{ listStyleType: 'none', margin: 0, padding: 0, display: 'flex', gap: '15px' }}>
          {menuItems.map((item) => (
            <li
              key={item.section}
              style={{
                color: activeSection === item.section ? '#58A6FF' : 'white',
                cursor: 'pointer',
                fontWeight: activeSection === item.section ? 'bold' : 'normal',
                borderBottom: activeSection === item.section ? '2px solid #58A6FF' : 'none',
              }}
              onClick={() => setActiveSection(item.section)}
            >
              {item.label}
            </li>
          ))}
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
        backgroundColor: 'rgba(0, 115, 255, 0.06)',
        color: '#58A6FF',
        textAlign: 'center',
        padding: '5px 0',
        position: 'absolute',
        top: 0,
        height: '40px',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-around',
        borderRadius: '8px',
        width:'30%',
        left: '35%',
        marginTop:15
    },
  }






export default App;