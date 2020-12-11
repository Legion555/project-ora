import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const LoginForm = (props) => {
    //UserData
    // eslint-disable-next-line
    const [userData, setUserData] = useContext(UserContext);
    const [errorHandle, setErrorHandle] = useState('');
    //View
    const [view, setView] = useState('login');
    //Login
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    //Register
    const [regName, setRegName] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regPassword, setRegPassword] = useState('');

    //Automatic login
    useEffect(() => {
        const userEmail = localStorage.getItem('userEmail');
        const userPassword = localStorage.getItem('userPassword');
        if (userEmail !== null) {
            const details = {
                email: userEmail,
                password: userPassword
            }
            // login()
            axios.post('/api/users/login', details)
            .then(res => {
                //Get User Data
                axios.get('/api/users', {
                    params: {
                        email: userEmail
                    }
                })
                .then(res => {
                    const newUserData = res.data;
                    setUserData(newUserData);
                    props.setLoggedIn(true);
                })
                .catch(err => {
                    console.log(err);
                });
            })
        }
    // eslint-disable-next-line
    }, []);

    //Login existing user - pass
    const login = (e, email, password) => {
        e.preventDefault();
        const details = {
            email: loginEmail,
            password: loginPassword
        }
        axios.post('/api/users/login', details)
        .then(res => {
            console.log(res.data);
            switch (res.data) {
                case '"email" is not allowed to be empty':
                    setErrorHandle(['email' ,'Email cannot be empty'])
                    break;
                case '"email" length must be at least 6 characters long':
                    setErrorHandle(['email' ,'Email must be at least 6 characters long']);
                    setLoginEmail('');
                    break;
                case '"email" must be a valid email':
                    setErrorHandle(['email' ,'Must be a valid email']);
                    setLoginEmail('');
                    break;
                case 'email-not-found':
                    setErrorHandle(['email' ,'Email not found'])
                    break;
                case '"password" is not allowed to be empty':
                    setErrorHandle(['password' ,'Password cannot be empty']);
                    break;
                case '"password" length must be at least 6 characters long':
                    setErrorHandle(['password' ,'Password is too short']);
                    setLoginPassword('');
                    break;
                case 'invalid-password':
                    setErrorHandle(['password' ,'Invalid password']);
                    setLoginPassword('');
                    break;
                case 'user-not-authorized':
                    setErrorHandle('not-authorized');
                    setLoginEmail(''); setLoginPassword('');
                    break;
                default:
                    const userToken = res.headers["auth-token"];
                    localStorage.setItem('userToken', userToken);
                    localStorage.setItem('userEmail', loginEmail);
                    localStorage.setItem('userPassword', loginPassword);
                    props.setLoggedIn(true);
            }
            //Get User Data
            axios.get('/api/users', {
                params: {
                    email: loginEmail
                }
            })
            .then(res => {
                const newUserData = res.data;
                setUserData(newUserData);
            })
            .catch(err => {
                console.log("Error: " + err);
            })
        })
    }
    //Register new user
    const register = (e) => {
        e.preventDefault();
        const payload = {
            name: regName,
            email: regEmail,
            password: regPassword
        }
        axios.post('/api/users/register', payload)
        .then(res => {
            switch (res.data) {
                case '"name" is not allowed to be empty':
                    setErrorHandle(['name' ,'Name cannot be empty'])
                    break;
                case '"email" is not allowed to be empty':
                    setErrorHandle(['email' ,'Email cannot be empty'])
                    break;
                case '"email" length must be at least 6 characters long':
                    setErrorHandle(['email' ,'Email must be at least 6 characters long']);
                    setRegEmail('');
                    break;
                case '"email" must be a valid email':
                    setErrorHandle(['email' ,'Must be a valid email']);
                    setRegEmail('');
                    break;
                case 'email-duplicate':
                    setErrorHandle(['email' ,'doubleEmails']);
                    setRegEmail('');
                    break;
                case '"password" is not allowed to be empty':
                    setErrorHandle(['password' ,'Password cannot be empty']);
                    break;
                case '"password" length must be at least 6 characters long':
                    setErrorHandle(['password' ,'Password is too short']);
                    setRegPassword('');
                    break;
                default:
                    setErrorHandle('registered');
                    setRegName(''); setRegEmail(''); setRegPassword('');

            }
        })
        .catch(error => {
            console.log(error);
        })
    }
    
    return (
        <div className="auth-container">
            {view === 'login' &&
            <div className="login-container">
                <h1>Login with an existing account</h1>
                <form>
                    <input className={errorHandle[0] === 'email' ? "error" : undefined}  onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder={errorHandle[0] === "email" ? errorHandle[1] : "Email"}  name="email" value={loginEmail}></input>
                    <input className={errorHandle[0] === 'password' ? "error" : undefined}  onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder={errorHandle[0] === "password" ? errorHandle[1] : "Password"} name="password" value={loginPassword}></input>
                    <button onClick={login}>Login</button>
                </form>
                {errorHandle === 'not-authorized' &&
                <p>Not approved yet.<br/>Please wait for Manager's approval.</p>
                }
                <p className="register-link" onClick={() => setView('register')}>Register a new account</p>
            </div>
            }
            {view === 'register' &&
            <div className="register-container">
                <h1>Register a new account</h1>
                {errorHandle !== 'registered' &&
                <form className="input-main">
                    <input className={errorHandle[0] === 'name' ? "error" : undefined} onChange={(e) => setRegName(e.target.value)}
                    placeholder={errorHandle[0] === "name" ? errorHandle[1] : "Name"} name="name" value={regName}></input>
                    <input className={errorHandle[0] === 'email' ? "error" : undefined} onChange={(e) => setRegEmail(e.target.value)}
                    placeholder={errorHandle[0] === "email" ? errorHandle[1] : "Email"} name="email" value={regEmail}></input>
                    <input className={errorHandle[0] === 'password' ? "error" : undefined} onChange={(e) => setRegPassword(e.target.value)}
                    placeholder={errorHandle[0] === "password" ? errorHandle[1] : "Password"} name="password" value={regPassword}></input>
                    <button onClick={register}>Register</button>
                </form>
                }
                {errorHandle === 'registered' &&
                <p>Successfully registered!<br/>Please wait for Manager's approval.</p>
                }
                <p className="login-link" onClick={() => setView('login')}>Login with an existing account</p>
            </div>
            }
        </div>
    )
}

export default LoginForm