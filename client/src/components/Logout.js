import { FaPowerOff } from 'react-icons/fa';

const Logout = (props) => {
    const logout = () => {
        localStorage.clear();
        props.setView('authentication')
    }

    return (
        <div className="logout">
            <p onClick={logout}><FaPowerOff /></p>
        </div>
    )
}

export default Logout