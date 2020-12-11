import axios from 'axios';

const Teachers = (props) => {
    //STATE

    //FUNCTIONS
    const authorizeUser = (e, id) => {
        e.preventDefault();
        axios.put("/api/teachers/authTeacher/" + id)
        .then((res) => {
            console.log(res.data);
            props.readAllTeachers();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className="teachers-container">
            <div className="teacher-cards">
                {props.teachers.map(teacher => 
                <div className="class-card" key={teacher._id}>
                    <h3>{teacher.name}</h3>
                    <p>Auth status: {teacher.isAuthed ? "Authorized" : "Unauthorized"}</p>
                    <button onClick={(e) => authorizeUser(e, teacher._id)}>Authorize</button>
                </div>
                )}
            </div>
        </div>
    )
}

export default Teachers