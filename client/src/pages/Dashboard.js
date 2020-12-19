//Dependencies
import {useState, useContext} from 'react';
//Components
import Schools from './admin/Schools';
import Managers from './admin/Managers';
import Teachers from './manager/Teachers';
import ManagerClasses from './manager/ManagerClasses';
import TeacherClasses from './teacher/TeacherClasses';
import TeacherStudents from './teacher/TeacherStudents';
import { UserContext } from '../context/UserContext';
//Material-UI

//Icons
import { FaPowerOff, FaSchool, FaPlus, FaEye, FaUsers } from 'react-icons/fa';
import { GiTeacher } from 'react-icons/gi';
import { SiGoogleclassroom } from 'react-icons/si';
import { RiDashboardFill, RiUser3Fill } from 'react-icons/ri';
import { MdAssignmentInd } from'react-icons/md';
//Images
import Circle from '../assets/circle.png';

const Dashboard = (props) => {
    // eslint-disable-next-line
    const userToken = localStorage.getItem('userToken');
    const [view, setView] = useState('default');
    const [subView, setSubView] = useState('view-list');
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
                            <div className="nav-item">
                                <p className={view === 'default' ? 'main-link main-link__active' : 'main-link'} onClick={() => setView('default')} ><RiDashboardFill className="icon" /><br/>Dashboard</p>
                            </div>
                            <div className="nav-item">
                                <p className={view === 'schools' ? 'main-link main-link__active' : 'main-link'} onClick={() => setView('schools')} ><FaSchool className="icon" /><br/>Schools</p>
                                <div className={view === 'schools' ? 'sub-link__container active' : 'sub-link__container hidden' }>
                                    <p onClick={() => setSubView('view-list')}><FaEye /> View</p>
                                    <p onClick={() => setSubView('create-school')}><FaPlus /> Create</p>
                                </div>
                            </div>
                            <div className="nav-item">
                                <p className={view === 'managers' ? 'main-link main-link__active' : 'main-link'} onClick={() => setView('managers')} ><RiUser3Fill className="icon" /><br/>Managers</p>
                                <div className={view === 'managers' ? 'sub-link__container active' : 'sub-link__container hidden' }>
                                    <p onClick={() => setSubView('view-list')}><FaEye /> View</p>
                                    <p onClick={() => setSubView('create-manager')}><FaPlus /> Create</p>
                                    <p onClick={() => setSubView('assign-manager')}><MdAssignmentInd /> Assign to<br/>school</p>
                                </div>
                            </div>
                        </div>
                    }
                    {userData.authority === 'manager' &&
                        <div>
                            <div className="nav-item">
                                <p className={view === 'default' ? 'main-link main-link__active' : 'main-link'} onClick={() => setView('default')} ><RiDashboardFill className="icon" /><br/>Dashboard</p>
                            </div>
                            <div className="nav-item">
                                <p className={view === 'teachers' ? 'main-link main-link__active' : 'main-link'} onClick={() => setView('teachers')} ><RiUser3Fill className="icon" /><br/>Teachers</p>
                                <div className={view === 'teachers' ? 'sub-link__container active' : 'sub-link__container hidden' }>
                                    <p onClick={() => setSubView('view-list')}><FaEye /> View</p>
                                    <p onClick={() => setSubView('create-teacher')}><FaPlus /> Create</p>
                                </div>
                            </div>
                            <div className="nav-item">
                                <p className={view === 'manager-classes' ? 'main-link main-link__active' : 'main-link'} onClick={() => setView('manager-classes')} ><SiGoogleclassroom className="icon" /><br/>Classes</p>
                                <div className={view === 'manager-classes' ? 'sub-link__container active' : 'sub-link__container hidden' }>
                                    <p onClick={() => setSubView('view-list')}><FaEye /> View</p>
                                    <p onClick={() => setSubView('create-class')}><FaPlus /> Create</p>
                                    <p onClick={() => setSubView('assign-teacher')}><MdAssignmentInd /> Assign<br/>teacher</p>
                                </div>
                            </div>
                        </div>
                    }
                    {userData.authority === 'teacher' &&
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
                        <div className="section-card">
                            <h1>Schools</h1>
                            <FaSchool className="icon"/>
                            <button onClick={() => setView('schools')}>View</button>
                        </div>
                        <div className="section-card">
                            <h1>Managers</h1>
                            <RiUser3Fill className="icon"/>
                            <button onClick={() => setView('managers')}>View</button>
                        </div>
                    </div>
                    }
                    {userData.authority === 'manager' &&
                    <div className="dashboard-container">
                        <div className="section-card">
                            <h1>Teachers</h1>
                            <GiTeacher className="icon"/>
                            <button onClick={() => setView('teachers')}>View</button>
                        </div>
                        <div className="section-card">
                            <h1>Classes</h1>
                            <SiGoogleclassroom className="icon"/>
                            <button onClick={() => setView('manager-classes')}>View details</button>
                        </div>
                    </div>
                    }
                    {userData.authority === 'teacher' &&
                    <div className="dashboard-container">
                        <div className="section-card">
                            <h1>Classes</h1>
                            <SiGoogleclassroom className="icon"/>
                            <button onClick={() => setView('teacher-classes')}>View details</button>
                        </div>
                    </div>
                    }
                </div>
                }
                

                {/* VIEWS */}
                {view === 'schools' &&
                    <Schools setView={setView} subView={subView} setSubView={setSubView} userData={userData} />
                }
                {view === 'managers' &&
                    <Managers setView={setView} subView={subView} setSubView={setSubView} userData={userData} />
                }
                {view === 'teachers' &&
                    <Teachers setView={setView} subView={subView} setSubView={setSubView} userData={userData} />
                }
                {view === 'manager-classes' && 
                    <ManagerClasses setView={setView} subView={subView} setSubView={setSubView} userData={userData} />
                }
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

export default Dashboard