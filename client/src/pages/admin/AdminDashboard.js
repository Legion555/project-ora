//Dependencies
import {useState, useContext} from 'react';
//Components
import Logout from '../../components/Logout';
import Schools from './Schools';
import Managers from './Managers';
import { UserContext } from '../../context/UserContext';
//Material-UI

//Icons
import { FaSchool, FaPlus, FaEye } from 'react-icons/fa';
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
                    <i>Admin</i><br/>
                    <strong>{userData.school && userData.school.name}</strong>
                    </p>
                    {/* Links */}
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
                </div>
                }
                

                {/* VIEWS */}
                {view === 'schools' &&
                    <Schools setView={setView} subView={subView} setSubView={setSubView} userData={userData}/>
                }
                {view === 'managers' &&
                    <Managers setView={setView} subView={subView} setSubView={setSubView} userData={userData}/>
                }
            </div>
        </div>
    )
}

export default Dashboard