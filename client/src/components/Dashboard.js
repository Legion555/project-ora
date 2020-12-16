//Dependencies
import {useState, useContext} from 'react';
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
    // eslint-disable-next-line
    const userToken = localStorage.getItem('userToken');
    const [view, setView] = useState('default');
    //UserData
    // eslint-disable-next-line
    const [userData, setUserData] = useContext(UserContext);

    //FUNCTIONS
    const logout = () => {
        localStorage.clear();
        props.setLoggedIn(false);
    }    
  
    return (
        <div className="dashboard">

            {/* SIDE-NAVIGATION */}
            <div className="navigation-container">
                <div className="links">
                    <img src={Circle} alt="profile" width="60px"></img>
                    <p>{userData.name}<br/>
                    <i>{userData.authority}</i><br/>
                    <strong>{userData.school && userData.school.name}</strong>
                    </p>
                    {/* Links */}
                    {userData.authority === 'admin' &&
                        <div>
                            <p className={view === 'default' ? 'link link-active' : 'link'} onClick={() => setView('default')} ><RiDashboardFill className="icon" /><br/>Dashboard</p>
                            <p className={view === 'schools' ? 'link link-active' : 'link'} onClick={() => setView('schools')} ><FaSchool className="icon" /><br/>Schools</p>
                            <p className={view === 'managers' ? 'link link-active' : 'link'} onClick={() => setView('managers')} ><RiUser3Fill className="icon" /><br/>Managers</p>
                        </div>
                    }
                    {userData.authority === 'manager' &&
                        <div>
                            <p className={view === 'default' ? 'link link-active' : 'link'} onClick={() => setView('default')} ><RiDashboardFill className="icon" /><br/>Dashboard</p>
                            <p className={view === 'teachers' ? 'link link-active' : 'link'} onClick={() => setView('teachers')} ><GiTeacher className="icon" /><br/>Teachers</p>
                            <p className={view === 'classes' ? 'link link-active' : 'link'} onClick={() => setView('classes')} ><SiGoogleclassroom className="icon" /><br/>Classes</p>
                        </div>
                    }
                    {userData.authority === 'teacher' &&
                        <div>
                            <p className={view === 'default' ? 'link link-active' : 'link'} onClick={() => setView('default')} ><RiDashboardFill className="icon" /><br/>Dashboard</p>
                            <p className={view === 'classes' ? 'link link-active' : 'link'} onClick={() => setView('classes')} ><SiGoogleclassroom className="icon" /><br/>Classes</p>
                        </div>
                    }
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
                    <div className="dashboard-container">
                        <SchoolsDashLink setView={setView}/>
                        <ManagersDashLink setView={setView}/>
                    </div>
                    }
                    {userData.authority === 'manager' &&
                    <div className="dashboard-container">
                        <TeachersDashLink setView={setView}/>
                        <ClassesDashLink setView={setView}/>
                    </div>
                    }
                    {userData.authority === 'teacher' &&
                    <div className="dashboard-container">
                        <ClassesDashLink setView={setView}/>
                    </div>
                    }
                </div>
                }

                {/* VIEWS */}
                {view === 'schools' &&
                    <Schools setView={setView} userData={userData} />
                }
                {view === 'managers' &&
                    <Managers setView={setView} userData={userData} />
                }
                {view === 'teachers' &&
                    <Teachers setView={setView} userData={userData} />
                }
                {view === 'classes' && 
                    <Classes setView={setView} userData={userData} />
                }
                {view === 'class' &&
                    <Class setView={setView} userData={userData} />
                }
            </div>
        </div>
    )
}

const SchoolsDashLink = (props) => {
    return (
    <div className="section-card">
        <h1>Schools</h1>
        <FaSchool className="icon"/>
        <button onClick={() => props.setView('schools')}>View</button>
    </div>
    )
}
const ManagersDashLink = (props) => {
    return (
    <div className="section-card">
        <h1>Managers</h1>
        <RiUser3Fill className="icon"/>
        <button onClick={() => props.setView('managers')}>View</button>
    </div>
    )
}
const TeachersDashLink = (props) => {
    return (
    <div className="section-card">
        <h1>Teachers</h1>
        <GiTeacher className="icon"/>
        <button onClick={() => props.setView('teachers')}>View</button>
    </div>
    )
}
const ClassesDashLink = (props) => {
    return (
    <div className="section-card">
        <h1>Classes</h1>
        <SiGoogleclassroom className="icon"/>
        <button onClick={() => props.setView('classes')}>View details</button>
    </div>
    )
}

export default Dashboard