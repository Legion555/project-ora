//Dependencies
import {useState, useContext} from 'react';
import axios from 'axios';
//Components
import Teachers from './Teachers';
import Classes from './Classes';
import Class from './Class';
import { UserContext } from '../context/UserContext';
//Icons
import { FaPowerOff } from 'react-icons/fa';
import { GiTeacher } from 'react-icons/gi';
import {SiGoogleclassroom} from 'react-icons/si';
import { RiDashboardFill } from 'react-icons/ri';
//Images
import Circle from '../assets/circle.png';

const Dashboard = (props) => {
    //UserData
    // eslint-disable-next-line
    const [userData, setUserData] = useContext(UserContext);

    const [view, setView] = useState('default');

    const [teachers, setTeachers] = useState({});

    const [classes, setClasses] = useState({});

    const [classData, setClassData] = useState({});

    //FUNCTIONS
    const logout = () => {
        localStorage.clear();
        props.setLoggedIn(false);
    }
    //Teachers
    const readAllTeachers = () => {
        const userToken = localStorage.getItem('userToken');
        axios.get('./api/teachers', {
        headers: {
            'auth-token': userToken
        }
        })
        .then((res) => {
            console.log(res.data);
            setTeachers(res.data);
            setView('teachers');
        })
        .catch((error) => {
            console.error("Error: " + error)
        })
    }
    //Classes
    const readAllClasses = () => {
        const userToken = localStorage.getItem('userToken');
        axios.get('./api/classes', {
        headers: {
            'auth-token': userToken
        }
        })
        .then((res) => {
            console.log(res.data);
            setClasses(res.data);
            setView('classes');
        })
        .catch((error) => {
            console.error("Error: " + error)
        })
    }
    
  
    return (
        <div className="dashboard">
            <div className="navigation-container">
                <div className="links">
                    <img src={Circle} alt="profile" width="60px"></img>
                    <p>Welcome {userData.name}</p>
                    <p className="link" onClick={() => setView('default')} ><RiDashboardFill className="icon" /><br/>Dashboard</p>
                    {userData.authority === 'admin' &&
                        <p className="link" onClick={readAllTeachers} ><GiTeacher className="icon" /><br/>Teachers</p>
                    }
                    <p className="link" onClick={readAllClasses} ><SiGoogleclassroom className="icon" /><br/>Classes</p>
                </div>
                <div className="logout">
                    <p onClick={logout}><FaPowerOff /></p>
                </div>
            </div>
            <div className="content-container">
                <div className="breadcrumb">
                    {view === 'default' && <p>Dashboard</p>}
                    {view === 'teachers' && <p>Teachers</p>}
                    {view === 'classes' && <p>Classes</p>}
                    {view === 'class' && <p><span onClick={readAllClasses}>Classes</span> &gt; {classData.name}</p>}
                </div>
                {view === 'default' && 
                <div className="default-container">
                    <div className="section-card">
                        <h1>Classes</h1>
                        <SiGoogleclassroom className="icon"/>
                        <button onClick={readAllClasses}>View</button>
                    </div>
                </div>
                }
                {view === 'teachers' &&
                    <Teachers setView={setView} teachers={teachers} setTeachers={setTeachers} readAllTeachers={readAllTeachers} />
                }
                {view === 'classes' && 
                    <Classes setView={setView} classes={classes} classData={classData} setClassData={setClassData} readAllClasses={readAllClasses} />
                }
                {view === 'class' &&
                    <Class setView={setView} classes={classes} classData={classData} setClassData={setClassData} />
                }
            </div>
        </div>
    )
}

export default Dashboard