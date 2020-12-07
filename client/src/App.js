import {useState} from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';

function App() {
  //STATE
  //User data
  const [userData, setUserData] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  //RENDER
  return (
    <div className="app">
      {!loggedIn &&
        <LoginForm userData={userData} setUserData={setUserData} setLoggedIn={setLoggedIn} />
      }
      {loggedIn &&
        <Dashboard userData={userData} setUserData={setUserData} setLoggedIn={setLoggedIn}/>
      }
    </div>
  );
}

export default App;