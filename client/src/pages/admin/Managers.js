import { useState, useEffect } from 'react';
import axios from 'axios';
//Icons
import { FaArrowRight } from 'react-icons/fa';
//Material-UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


const Managers = (props) => {
    // eslint-disable-next-line
    const userToken = localStorage.getItem('userToken');

    const [managers, setManagers] = useState({});
    const [schools, setSchools] = useState({});
    //Add manager inputs
    const [addManagerName, setAddManagerName] = useState('');
    const [addManagerEmail, setAddManagerEmail] = useState('');
    const [addManagerPassword, setAddManagerPassword] = useState('');
    //Assign manager
    const [inputAssignManagerSchoolId, setInputAssignManagerSchoolId] = useState('');
    const [inputAssignManagerId, setInputAssignManagerId] = useState('');

    useEffect(() => {
        readAllData()
    // eslint-disable-next-line
    }, []);
    const readAllData = () => {
        axios.get('./api/managers')
        .then((res) => {
            setManagers(res.data);
            axios.get('./api/schools')
            .then((res) => {
                setSchools(res.data);
                props.setSubView('view-list');
            })
            .catch(err => {
                console.log(err);
            })
        })
        .catch((error) => {
            console.error("Error: " + error)
        })
    }
    

    //FUNCTIONS
    //Create manager
    const createManager = (e) => {
        e.preventDefault();
        const payload = {
            name: addManagerName,
            email: addManagerEmail,
            password: addManagerPassword
        }
        //Create new class document
        axios.post('/api/managers/createManager', payload)
        .then(res => {
            readAllData();
            props.setSubView('view-list');
            setAddManagerName(''); setAddManagerEmail(''); setAddManagerPassword('');
        })
        .catch(err => {
            console.log(err);
        })
    }
    //assign manager to school
    const assignManager = (e) => {
        e.preventDefault();
        const chosenManager = managers.filter(manager => manager._id === inputAssignManagerId );
        const chosenSchool = schools.filter(school => school._id === inputAssignManagerSchoolId);
        const payload = {
          "schoolId": chosenSchool[0]._id,
          "schoolName": chosenSchool[0].name,
          "managerId": chosenManager[0]._id,
          "managerName": chosenManager[0].name
        }
        // console.log(payload);
        axios.put("/api/schools/addManager", payload)
        .then((res) => {
            axios.put("/api/managers/addSchoolRef", payload)
            .then(res => {
                readAllData();
                props.setSubView('view-list');
            })
            .catch(err => {
                console.log(err);
            })
        })
        .catch((err) => {
            console.log(err);
        })
    }
    //Delete manager
    const deleteManager = (e, id) => {
        e.preventDefault();
        axios.delete("/api/managers/deleteManager/" + id)
        .then((res) => {
            readAllData();
        })
        .catch((err) => {
            console.log(err);
        })
    }
    

    return (
        <div className="managers-container section__container">

            <div className="section-nav">
                <h3>
                {props.subView === 'view-list' && 'View managers'}
                {props.subView === 'create-manager' && 'Create manager'}
                {props.subView === 'assign-manager' && 'Assign manager'}
                </h3>
                <p>
                Managers / {props.subView === 'view-list' && 'View managers'}
                {props.subView === 'create-manager' && 'Create manager'}
                {props.subView === 'assign-manager' && 'Assign manager'}      
                </p>
            </div>

            {props.subView === "view-list" &&
                <div className="content-container view-managers__container">
                    {managers.length > 0 && managers.map(manager => 
                    <div className="manager__card" key={manager._id}>
                        <h3>{manager.name}</h3>
                        <p>School: {manager.school.name}</p>
                        <button onClick={(e) => deleteManager(e, manager._id)}>Delete manager</button>
                        <br/>
                        <br/>
                    </div>
                    )}
                </div>
            }

            {props.subView === "create-manager" &&
                <div className="content-container">
                    <form className="create-manager">
                        <TextField fullWidth variant="outlined" label="Manager name" className="input"
                            onChange={(e) => setAddManagerName(e.target.value)} value={addManagerName}/>
                        <TextField fullWidth variant="outlined" label="Manager email" className="input"
                            onChange={(e) => setAddManagerEmail(e.target.value)} value={addManagerEmail}/>
                        <TextField fullWidth variant="outlined" label="Manager password" className="input"
                            onChange={(e) => setAddManagerPassword(e.target.value)} value={addManagerPassword}/>
                        <Button fullWidth variant="contained" color="primary" onClick={createManager}>
                            Create manager
                        </Button>
                    </form>
                </div>
            }

            {props.subView === "assign-manager" &&
                <div className="content-container">
                    <form  className="assign-manager">
                        <div className="assignment__container">
                            <div>
                                {/* <label>Choose a manager: </label> */}
                                <select value={inputAssignManagerId} onChange={(e) => setInputAssignManagerId(e.target.value)} >
                                    <option value="" disabled>Choose a manager</option>
                                    {managers.map(manager => 
                                        <option value={manager._id} key={manager._id}>{manager.name}</option>
                                    )}
                                </select>
                            </div>
                            <div>
                                <FaArrowRight className="icon" />
                            </div>
                            <div>
                                {/* <label>Choose a school: </label> */}
                                <select value={inputAssignManagerSchoolId} onChange={(e) => setInputAssignManagerSchoolId(e.target.value)}>
                                    <option value="" disabled>Choose a school</option>
                                    {schools.map(school => !school.manager &&
                                        <option value={school._id} key={school._id}>{school.name}</option>
                                    )}
                                </select>
                            </div>
                        </div>
                        
                        <Button fullWidth variant="contained" color="primary" onClick={(e) => assignManager(e)}>
                            Assign
                        </Button>
                    </form>
                </div>
            }

        </div>
    )
}

export default Managers