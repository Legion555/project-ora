//Dependencies
import {useState, useContext} from 'react';
//Components
import Logout from '../../components/Logout';
import Teachers from './Teachers';
import ManagerClasses from './ManagerClasses';
import { UserContext } from '../../context/UserContext';
//Material-UI

//Icons
import { FaPlus, FaEye } from 'react-icons/fa';
import { GiTeacher } from 'react-icons/gi';
import { SiGoogleclassroom } from 'react-icons/si';
import { RiDashboardFill, RiUser3Fill } from 'react-icons/ri';
import { MdAssignmentInd } from'react-icons/md';
//Images
import Circle from '../../assets/circle.png';

const Dashboard = (props) => {
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
                    <i>Manager</i><br/>
                    <strong>{userData.school && userData.school.name}</strong>
                    </p>
                    {/* Links */}
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
                </div>
                }
                

                {/* VIEWS */}
                {view === 'teachers' &&
                    <Teachers setView={setView} subView={subView} setSubView={setSubView} userData={userData} />
                }
                {view === 'manager-classes' && 
                    <ManagerClasses setView={setView} subView={subView} setSubView={setSubView} userData={userData} />
                }
            </div>
        </div>
    )
}

export default Dashboard