//Dependencies
import {useState, useContext} from 'react';
//Components
import Logout from '../../components/Logout';
import TeacherClasses from './TeacherClasses';
import TeacherStudents from './TeacherStudents';
import { UserContext } from '../../context/UserContext';
//Material-UI

//Icons
import { FaPlus, FaEye, FaUsers } from 'react-icons/fa';
import { SiGoogleclassroom } from 'react-icons/si';
import { RiDashboardFill } from 'react-icons/ri';
import { MdAssignmentInd } from'react-icons/md';
//Images
import Circle from '../../assets/circle.png';

const TeacherDashboard = (props) => {
    // eslint-disable-next-line
    const userToken = localStorage.getItem('userToken');
    const [view, setView] = useState('default');
    const [subView, setSubView] = useState('view-list');
    //UserData
    // eslint-disable-next-line
    const [userData, setUserData] = useContext(UserContext);

    //FUNCTIONS
    
    return (
        <div className="dashboard">

            {/* SIDE-NAVIGATION */}
            <div className="navigation-container">
                <div className="links">
                    <img src={Circle} alt="profile" width="60px"></img>
                    <p>{userData.name}<br/>
                    <i>Teacher</i><br/>
                    <strong>{userData.school && userData.school.name}</strong>
                    </p>
                    {/* Links */}
                    <div>
                        <div className="nav-item">
                            <p className={view === 'default' ? 'main-link main-link__active' : 'main-link'} onClick={() => setView('default')} ><RiDashboardFill className="icon" /><br/>Dashboard</p>
                        </div>
                        <div className="nav-item">
                            <p className={view === 'teacher-classes' ? 'main-link main-link__active' : 'main-link'} onClick={() => setView('teacher-classes')} ><SiGoogleclassroom className="icon" /><br/>Classes</p>
                            <div className={view === 'teacher-classes' ? 'sub-link__container active' : 'sub-link__container hidden' }>
                                <p onClick={() => setSubView('view-list')}><FaEye /> View</p>
                                <p onClick={() => setSubView('assign-student')}><MdAssignmentInd /> Assign<br/>student</p>
                            </div>
                        </div>
                        <div className="nav-item">
                            <p className={view === 'teacher-students' ? 'main-link main-link__active' : 'main-link'} onClick={() => setView('teacher-students')} ><FaUsers className="icon" /><br/>Students</p>
                            <div className={view === 'teacher-students' ? 'sub-link__container active' : 'sub-link__container hidden' }>
                                <p onClick={() => setSubView('view-list')}><FaEye /> View</p>
                                <p onClick={() => setSubView('create-student')}><FaPlus /> Create<br/>student</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Logout setView={props.setView}/>
            </div>

            {/* CONTENT-CONTAINER */}
            <div className="content-container">
                {/* DEFAULT */}
                {view === 'default' && 
                <div className="default-container">
                    <div className="dashboard-container">
                        <div className="section-card">
                            <h1>Classes</h1>
                            <SiGoogleclassroom className="icon"/>
                            <button onClick={() => setView('teacher-classes')}>View details</button>
                        </div>
                    </div>
                </div>
                }
                {/* VIEWS */}
                {view === 'teacher-classes' && 
                    <TeacherClasses setView={setView} subView={subView} setSubView={setSubView} userData={userData} />
                }
                {view === 'teacher-students' && 
                    <TeacherStudents setView={setView} subView={subView} setSubView={setSubView} userData={userData} />
                }
            </div>
        </div>
    )
}

export default TeacherDashboard