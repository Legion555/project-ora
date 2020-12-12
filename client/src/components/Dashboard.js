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
    const userToken = localStorage.getItem('userToken');
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
        axios.get('./api/teachers', {
        headers: {
            'auth-token': userToken
        }
        })
        .then((res) => {
            console.log(res.data)
            setTeachers(res.data);
            setView('teachers');
        })
        .catch((error) => {
            console.error("Error: " + error)
        })
    }
    //Classes
    const readAllClasses = () => {
        axios.get('./api/classes', {
        headers: {
            'auth-token': userToken
        }
        })
        .then((res) => {
            setClasses(res.data);
            setView('classes');
        })
        .catch((error) => {
            console.error("Error: " + error)
        })
    }
    const readAuthorizedClasses = () => {
        const classIds = userData.classes.map(item => item.id);
        console.log(classIds)
        axios.get('./api/classes/readAuthorizedClasses', {params: {classIds: classIds}}, {
        headers: {
            'auth-token': userToken
        }
        })
        .then((res) => {
            console.log(res.data)
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
                    <p>{userData.name}<br/><i>{userData.authority}</i></p>
                    <p className="link" onClick={() => setView('default')} ><RiDashboardFill className="icon" /><br/>Dashboard</p>
                    {userData.authority === 'admin' &&
                        <p className="link" onClick={readAllTeachers} ><GiTeacher className="icon" /><br/>Teachers</p>
                    }
                    <p className="link" onClick={userData.authority === 'admin' ? readAllClasses : readAuthorizedClasses} ><SiGoogleclassroom className="icon" /><br/>Classes</p>
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
                    {view === 'class' && <p><span onClick={userData.authority === 'admin' ? readAllClasses : readAuthorizedClasses}>Classes</span> &gt; {classData.name}</p>}
                </div>
                {view === 'default' && 
                <div className="default-container">
                    {userData.authority === 'admin' &&
                    <div className="section-card">
                        <h1>Teachers</h1>
                        <GiTeacher className="icon"/>
                        <button onClick={readAllTeachers}>View</button>
                    </div>
                    }
                    {userData.authority === ('teacher' || 'admin') &&
                    <div className="section-card">
                        <h1>Classes</h1>
                        <SiGoogleclassroom className="icon"/>
                        <button onClick={userData.authority === 'admin' ? readAllClasses : readAuthorizedClasses}>View</button>
                    </div>
                    }
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