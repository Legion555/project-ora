//Dependencies
import {useState, useContext} from 'react';
import axios from 'axios';
//Components
import Schools from './Schools';
import Managers from './Managers';
import Teachers from './Teachers';
import Classes from './Classes';
import Class from './Class';
import { UserContext } from '../context/UserContext';
//Icons
import { FaPowerOff, FaSchool } from 'react-icons/fa';
import { GiTeacher } from 'react-icons/gi';
import { SiGoogleclassroom } from 'react-icons/si';
import { RiDashboardFill, RiUser3Fill } from 'react-icons/ri';
//Images
import Circle from '../assets/circle.png';

const Dashboard = (props) => {
    const userToken = localStorage.getItem('userToken');
    const [view, setView] = useState('default');
    //UserData
    // eslint-disable-next-line
    const [userData, setUserData] = useContext(UserContext);

    const [schools, setSchools] = useState({});
    const [managers, setManagers] = useState({});
    const [teachers, setTeachers] = useState({});
    const [classes, setClasses] = useState({});
    const [classData, setClassData] = useState({});

    //FUNCTIONS
    const logout = () => {
        localStorage.clear();
        props.setLoggedIn(false);
    }
    //Schools
    const readAllSchools = () => {
        axios.get('./api/schools')
        .then((res) => {
            setSchools(res.data);
            axios.get('./api/managers')
            .then(res => {
                setManagers(res.data)
                setView('schools');
            })
            .catch(err => {
                console.error("Error: " + err)
            })
        })
        .catch(err => {
            console.error("Error: " + err)
        })
    }
    const readAllManagers = () => {
        axios.get('./api/managers')
        .then((res) => {
            setManagers(res.data);
            setView('managers');
        })
        .catch((error) => {
            console.error("Error: " + error)
        })
    }
    //Teachers
    const readAllTeachers = () => {
        axios.get('./api/teachers', {
        headers: {
            'auth-token': userToken
        }
        })
        .then((res) => {
            setTeachers(res.data);
            setView('teachers');
        })
        .catch((error) => {
            console.error("Error: " + error)
        })
    }
    //Classes
    const readAllClasses = () => {
        axios.get('./api/classes')
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
        axios.get('./api/classes/readAuthorizedClasses', {params: {classIds: classIds}})
        .then((res) => {
            setClasses(res.data);
            setView('classes');
        })
        .catch((error) => {
            console.error("Error: " + error)
        })
    }
    
  
    return (
        <div className="dashboard">
            {/* SIDE-NAVIGATION */}
            <div className="navigation-container">
                <div className="links">
                    <img src={Circle} alt="profile" width="60px"></img>
                    <p>{userData.name}<br/><i>{userData.authority}</i></p>
                    <p className="link" onClick={() => setView('default')} ><RiDashboardFill className="icon" /><br/>Dashboard</p>
                    {userData.authority === 'admin' &&
                        <p className="link" onClick={readAllSchools} ><FaSchool className="icon" /><br/>Schools</p>
                    }
                    {userData.authority === 'admin' &&
                        <p className="link" onClick={readAllManagers} ><RiUser3Fill className="icon" /><br/>Managers</p>
                    }
                    {userData.authority === ('admin' || 'manager') &&
                        <p className="link" onClick={readAllTeachers} ><GiTeacher className="icon" /><br/>Teachers</p>
                    }
                    <p className="link" onClick={userData.authority === 'admin' ? readAllClasses : readAuthorizedClasses} ><SiGoogleclassroom className="icon" /><br/>Classes</p>
                </div>
                <div className="logout">
                    <p onClick={logout}><FaPowerOff /></p>
                </div>
            </div>
            {/* CONTENT-CONTAINER */}
            <div className="content-container">
                {/* DEFAULT */}
                {view === 'default' && 
                <div className="default-container">
                    {userData.authority === 'admin' &&
                    <div className="section-card">
                        <h1>Schools</h1>
                        <FaSchool className="icon"/>
                        <button onClick={readAllSchools}>View</button>
                    </div>
                    }
                    {userData.authority === 'admin' &&
                    <div className="section-card">
                        <h1>Managers</h1>
                        <RiUser3Fill className="icon"/>
                        <button onClick={readAllManagers}>View</button>
                    </div>
                    }
                    {userData.authority === ('admin' || 'manager') &&
                    <div className="section-card">
                        <h1>Teachers</h1>
                        <GiTeacher className="icon"/>
                        <button onClick={readAllTeachers}>View</button>
                    </div>
                    }
                    {userData.authority === ('admin' || 'manager' || 'teachers') &&
                    <div className="section-card">
                        <h1>Classes</h1>
                        <SiGoogleclassroom className="icon"/>
                        <button onClick={userData.authority === 'admin' ? readAllClasses : readAuthorizedClasses}>View</button>
                    </div>
                    }
                </div>
                }
                {/* VIEWS */}
                {view === 'schools' &&
                    <Schools setView={setView} userData={userData} schools={schools} readAllSchools={readAllSchools} managers={managers} />
                }
                {view === 'managers' &&
                    <Managers setView={setView} userData={userData} managers={managers} readAllManagers={readAllManagers} schools={schools} />
                }
                {view === 'teachers' &&
                    <Teachers setView={setView} teachers={teachers} setTeachers={setTeachers} readAllTeachers={readAllTeachers} />
                }
                {view === 'classes' && 
                    <Classes setView={setView} userData={userData} classes={classes} classData={classData} setClassData={setClassData} readAllClasses={readAllClasses} />
                }
                {view === 'class' &&
                    <Class setView={setView} userData={userData} classes={classes} classData={classData} setClassData={setClassData} />
                }
            </div>
        </div>
    )
}
export default Dashboard