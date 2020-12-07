//Dependencies
import {useState} from 'react';
import axios from 'axios';
//Components
import Classes from './Classes';
import Class from './Class';
//Icons
import { FaPowerOff } from 'react-icons/fa';
import { GiTeacher } from 'react-icons/gi';
import {SiGoogleclassroom} from 'react-icons/si';
import { RiDashboardFill } from 'react-icons/ri';
//Images
import Circle from '../assets/circle.png';

const Dashboard = (props) => {
    const [view, setView] = useState('default');

    const [classes, setClasses] = useState({});

    const [classData, setClassData] = useState({});
    

    //FUNCTIONS
    const logout = () => {
        localStorage.clear();
        props.setLoggedIn(false);
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
                    <p>Welcome {props.userData.name}</p>
                    <p onClick={() => setView('default')} className="link"><RiDashboardFill className="icon" /><br/>Dashboard</p>
                    <p className="link"><GiTeacher className="icon" /><br/>Teachers</p>
                    <p onClick={readAllClasses} className="link"><SiGoogleclassroom className="icon" /><br/>Classes</p>
                </div>
                <div className="logout">
                    <p onClick={logout}><FaPowerOff /></p>
                </div>
            </div>
            <div className="content-container">
                <div className="breadcrumb">
                    {view === 'default' && <p>Dashboard</p>}
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