import { useState } from 'react';
import axios from 'axios';

const Managers = (props) => {
    // eslint-disable-next-line
    const userToken = localStorage.getItem('userToken');
    const [functionView, setFunctionView] = useState('');
    //Add manager inputs
    const [addManagerName, setAddManagerName] = useState('');
    const [addManagerEmail, setAddManagerEmail] = useState('');
    const [addManagerPassword, setAddManagerPassword] = useState('');
    

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
            props.readAllManagers();
            setFunctionView('');
            setAddManagerName(''); setAddManagerEmail(''); setAddManagerPassword('');
        })
        .catch(err => {
            console.log(err);
        })
    }
    //Delete manager
    const deleteManager = (e, id) => {
        e.preventDefault();
        axios.delete("/api/managers/deleteManager/" + id)
        .then((res) => {
            props.readAllManagers();
        })
        .catch((err) => {
            console.log(err);
        })
    }
    

    return (
        <div className="managers-container">

            <div className="section-nav">
                <div className="breadcrumb">
                    <p>Managers</p>
                </div>
                <div className="functions">
                    <button className="button-create-manager" onClick={() => setFunctionView("create-manager")}>create</button>
                </div>
            </div>

            <div className="functions-container">
                {functionView === "create-manager" &&
                <form className="add-school">
                    <input type="text" value={addManagerName} placeholder="Manager name" onChange={(e) => setAddManagerName(e.target.value)} autoFocus></input>
                    <input type="text" value={addManagerEmail} placeholder="Manager email" onChange={(e) => setAddManagerEmail(e.target.value)}></input>
                    <input type="text" value={addManagerPassword} placeholder="Manager password" onChange={(e) => setAddManagerPassword(e.target.value)}></input>
                    <button onClick={createManager}>Create manager</button>
                    <button onClick={() => setFunctionView("")}>Cancel</button>
                </form>
                }
            </div>

            <div className="managers-info">
                {props.managers.map(manager => 
                <div className="manager-info" key={manager._id}>
                    <h3>{manager.name}</h3>
                    <p>Email: {manager.email}</p>
                    <p>School: {manager.school.schoolName}</p>
                    <button onClick={(e) => deleteManager(e, manager._id)}>Delete manager</button>
                    <br/>
                    <br/>
                </div>
                )}
            </div>

        </div>
    )
}

export default Managers