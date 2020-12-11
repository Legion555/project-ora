import {useState} from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import { UserProvider } from './context/UserContext';

function App() {
  //STATE
  //User data
  const [loggedIn, setLoggedIn] = useState(false);

  //RENDER
  return (
    <UserProvider>
      <div className="app">
        {!loggedIn &&
          <LoginForm setLoggedIn={setLoggedIn} />
        }
        {loggedIn &&
          <Dashboard setLoggedIn={setLoggedIn}/>
        }
      </div>
    </UserProvider>
  );
}

export default App;