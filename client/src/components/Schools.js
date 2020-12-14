import { useState } from 'react';
import axios from 'axios';

const Classes = (props) => {
    // eslint-disable-next-line
    const userToken = localStorage.getItem('userToken');
    const [functionView, setFunctionView] = useState('');
    
    //Add school
    const [addSchoolName, setAddSchoolName] = useState('');
    const [addSchoolAddress, setAddSchoolAddress] = useState('');
    const [addSchoolContactNumber, setAddSchoolContactNumber] = useState('');
    //Assign manager
    const [inputAssignManagerSchoolId, setInputAssignManagerSchoolId] = useState('');
    const [inputAssignManagerId, setInputAssignManagerId] = useState('');

    //FUNCTIONS
    //create school
    const createSchool = (e) => {
        e.preventDefault();
        const payload = {
            name: addSchoolName,
            address: addSchoolAddress,
            contactNumber: addSchoolContactNumber
        }
        //Create new class document
        axios.post('/api/schools/createSchool', payload)
        .then(res => {
            props.readAllSchools();
            setFunctionView('');
        })
        .catch(err => {
            console.log(err);
        })
    }
    //read managers
    //assign manager to school
    const assignManager = (e) => {
        e.preventDefault();
        const chosenManager = props.managers.filter(manager => manager._id === inputAssignManagerId );
        const chosenSchool = props.schools.filter(school => school._id === inputAssignManagerSchoolId);
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
                props.readAllSchools();
                setFunctionView('');
            })
            .catch(err => {
                console.log(err);
            })
        })
        .catch((err) => {
            console.log(err);
        })
    }
    //Delete school
    const deleteSchool = (e, id) => {
        e.preventDefault();
        axios.delete("/api/schools/deleteSchool/" + id)
        .then((res) => {
            props.readAllSchools();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className="schools-container">
            <div className="section-nav">
                <div className="breadcrumb">
                    <p>Schools</p>
                </div>
                <div className="functions">
                    <button className="button-assign-manager" onClick={() => setFunctionView("assign-manager")}>assign manager</button>
                    <button className="button-create-school" onClick={() => setFunctionView("create-school")}>create</button>
                </div>
            </div>

            <div className="functions-container">
                {functionView === "create-school" &&
                <form >
                    <div>
                        <input type="text" value={addSchoolName} placeholder="School name" onChange={(e) => setAddSchoolName(e.target.value)} autoFocus></input>
                        <input type="text" value={addSchoolAddress} placeholder="School address" onChange={(e) => setAddSchoolAddress(e.target.value)}></input>
                        <input type="text" value={addSchoolContactNumber} placeholder="School contact number" onChange={(e) => setAddSchoolContactNumber(e.target.value)}></input>
                    </div>
                    <button onClick={createSchool}>Add school</button>
                    <button onClick={() => setFunctionView("")}>Cancel</button>
                </form>
                }
                {functionView === "assign-manager" &&
                <form>
                    <div>
                        <label>Choose a school: </label>
                        <select value={inputAssignManagerSchoolId} onChange={(e) => setInputAssignManagerSchoolId(e.target.value)}>
                            <option>Please choose a school</option>
                            {props.schools.map(school => 
                                <option value={school._id} key={school._id}>{school.name}</option>
                            )}
                        </select>
                        <br/>
                        <label>Choose a manager: </label>
                        <select value={inputAssignManagerId} onChange={(e) => setInputAssignManagerId(e.target.value)} >
                            <option>Please choose a manager</option>
                            {props.managers.map(manager => 
                                <option value={manager._id} key={manager._id}>{manager.name}</option>
                            )}
                        </select>
                    </div>
                    <button onClick={(e) => assignManager(e)}>Add manager</button>
                    <button onClick={() => setFunctionView("")}>Cancel</button>
                </form>
                }
            </div>
            
            <div className="schools-info">
                {props.schools.map(school => 
                <div className="school-info" key={school._id}>
                    <h3>{school.name}</h3>
                    <p>Address: {school.address}</p>
                    <p>Manager: {school.manager && school.manager.managerName}</p>
                    <button onClick={(e) => deleteSchool(e, school._id)}>Delete school</button>
                    <br/><br/>
                </div>
                )}
            </div>
        </div>
    )
}

export default Classes