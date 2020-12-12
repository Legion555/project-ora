import { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const Classes = (props) => {
    const userToken = localStorage.getItem('userToken');
    //STATE
    //UserData
    // eslint-disable-next-line
    const [userData, setUserData] = useContext(UserContext);
    //Add class
    const [addClassName, setAddClassName] = useState('');
    const [addClassBook, setAddClassBook] = useState('');

    //FUNCTIONS
    const createClass = (e) => {
        e.preventDefault();
        const userToken = localStorage.getItem('userToken');
        const payload = {
            name: addClassName,
            book: addClassBook,
            localTeacherName: userData.name,
            localTeacherId: userData._id
        }
        //Create new class document
        axios.post('/api/classes/create', payload, {
        headers: {
            'auth-token': userToken
        }
        })
        .then(res => {
            //Add class to teacher document for reference
            const newClasses = userData.classes;
            const _class = {
              "name": addClassName,
              "id": res.data,
              "teacherId": userData._id,
              "date": Date.now()
            }
            newClasses.push(_class);
            const payload = {
                userId: userData._id,
                classes: newClasses
            }
            axios.put("/api/teachers/addClass", payload, {
            headers: {
                'auth-token': userToken
            }
            })
            .then(res => {
                //Update data on client
                props.readAllClasses();
            })
            .catch(err => {
                console.log(err);
            })
        })
        .catch(err => {
            console.log(err);
        })
    }
    const deleteClass = (id) => {
        //Remove class document
        axios.delete("/api/classes/delete/" + id)
        .then((res) => {
            // const newClasses = userData.classes;
            // const filteredClasses = newClasses.filter(_class => _class._id !== id);
            // axios.put("/api/teachers/deleteClass", filteredClasses, {
            //     headers: {
            //         'auth-token': userToken
            //     }
            //     })
            //     .then(res => {
            //         props.readAllClasses();
            //         console.log(userData);
            //     })
            //     .catch(err => {
            //         console.log(err);
            //     })
            //Remove class from teacher document for reference
            const newClasses = userData.classes;
            const filteredClasses = newClasses.filter(_class => _class.id !== id);
            console.log(filteredClasses);
            const payload = {
                userId: userData._id,
                classes: filteredClasses
            }
            axios.put("/api/teachers/deleteClass", payload, {
            headers: {
                'auth-token': userToken
            }
            })
            .then(res => {
                props.readAllClasses();
            })
            .catch(err => {
                console.log(err);
            })
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const getClassData = (id) => {
        const userToken = localStorage.getItem('userToken');
        axios.get('./api/classes/' + id, {
        headers: {
            'auth-token': userToken
        }
        })
        .then((res) => {
            console.log(res.data[0]);
            props.setClassData(res.data[0]);
            props.setView('class');
        })

        .catch((error) => {
            console.error("Error: " + error)
        })
    }

    return (
        <div className="classes-container">
            <form className="add-class">
                <input type="text" value={addClassName} placeholder="Class name" onChange={(e) => setAddClassName(e.target.value)}></input>
                <input type="text" value={addClassBook} placeholder="Class book" onChange={(e) => setAddClassBook(e.target.value)}></input>
                <button onClick={createClass}>Add class</button>
            </form>
            <div className="class-cards">
                {props.classes.map(_class => 
                <div className="class-card" key={_class._id}>
                    <h3>{_class.name}</h3>
                    <p>Book: {_class.book}</p>
                    <p>Local Teacher: {_class.localTeacherName}</p>
                    <button onClick={(id) => getClassData(_class._id)}>View class</button><br/>
                    <button onClick={(id) => deleteClass(_class._id)} className="delete-class-button">Delete class</button>
                </div>
                )}
            </div>
        </div>
    )
}

export default Classes