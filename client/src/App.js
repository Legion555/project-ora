import {useState} from 'react';
import './App.css';
import LoginForm from './pages/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManagerDashboard from './pages/manager/ManagerDashboard';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import { UserProvider } from './context/UserContext';

function App() {
  //STATE
  //User data
  const [view, setView] = useState('authentication');

  //RENDER
  return (
    <UserProvider>
      <div className="app">
        {view === 'authentication' &&
          <LoginForm setView={setView} />
        }
        {view === 'admin' &&
          <AdminDashboard setView={setView}/>
        }
        {view === 'manager' &&
          <ManagerDashboard setView={setView}/>
        }
        {view === 'teacher' &&
          <TeacherDashboard setView={setView}/>
        }
      </div>
    </UserProvider>
  );
}

export default App;