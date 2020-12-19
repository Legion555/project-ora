import { useState, useEffect } from 'react';
import axios from 'axios';
//Material-UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const Classes = (props) => {
    // eslint-disable-next-line
    const userToken = localStorage.getItem('userToken');
    //Views

    const [schools, setSchools] = useState({});
    const [managers, setManagers] = useState({});
    //Add school
    const [addSchoolName, setAddSchoolName] = useState('');
    const [addSchoolAddress, setAddSchoolAddress] = useState('');
    const [addSchoolContactNumber, setAddSchoolContactNumber] = useState('');
    

    useEffect(() => {
        readSchools();
        props.setSubView('view-list')
    // eslint-disable-next-line
    }, []);
    const readSchools = () => {
        axios.get('./api/schools')
        .then((res) => {
            setSchools(res.data);
            axios.get('./api/managers')
            .then(res => {
                setManagers(res.data);
            })
            .catch(err => {
                console.error("Error: " + err)
            })
        })
        .catch(err => {
            console.error("Error: " + err)
        })
    }

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
            readSchools();
            props.setSubView('view-list');
            setAddSchoolName(''); setAddSchoolAddress(''); setAddSchoolContactNumber('');
        })
        .catch(err => {
            console.log(err);
        })
    }
    //Delete school
    const deleteSchool = (e, id) => {
        e.preventDefault();
        axios.delete("/api/schools/deleteSchool/" + id)
        .then((res) => {
            readSchools();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className="schools-container section__container">

            <div className="section-nav">
                <h3>
                {props.subView === 'view-list' && 'View schools'}
                {props.subView === 'create-school' && 'Create school'}
                </h3>
                <p>
                Schools / {props.subView === 'view-list' && 'View schools'}
                {props.subView === 'create-school' && 'Create school'}      
                </p>
            </div>

            {props.subView === 'view-list' &&
                <div className="content-container">
                    {schools.length > 0 && schools.map(school => 
                    <div className="school-info" key={school._id}>
                        <h3>{school.name}</h3>
                        <p>Address: {school.address}</p>
                        <p>Manager: {school.manager && school.manager.name}</p>
                        <button onClick={(e) => deleteSchool(e, school._id)}>Delete school</button>
                        <br/><br/>
                    </div>
                    )}
                </div>
            }

            {props.subView === "create-school" &&
                <div className="content-container">
                    <form className="create-school__form">
                        <div>
                            <TextField fullWidth variant="outlined" label="School name" className="input"
                                onChange={(e) => setAddSchoolName(e.target.value)} value={addSchoolName}/>
                            <TextField fullWidth variant="outlined" label="School address" className="input"
                                onChange={(e) => setAddSchoolAddress(e.target.value)} value={addSchoolAddress}/>
                            <TextField fullWidth variant="outlined" label="School contact number" className="input"
                                onChange={(e) => setAddSchoolContactNumber(e.target.value)} value={addSchoolContactNumber}/>
                        </div>
                        <Button fullWidth variant="contained" color="primary" onClick={createSchool}>
                            Create school
                        </Button>
                    </form>
                </div>
            }

        </div>
    )
}

export default Classes