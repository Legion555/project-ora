import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
//Material-UI imports
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const LoginForm = (props) => {
    //UserData
    // eslint-disable-next-line
    const [userData, setUserData] = useContext(UserContext);
    const [errorHandle, setErrorHandle] = useState('');
    //View
    // eslint-disable-next-line
    const [view, setView] = useState('login');
    //Login
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    //Register
    // const [regName, setRegName] = useState('');
    // const [regEmail, setRegEmail] = useState('');
    // const [regPassword, setRegPassword] = useState('');

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
    // const login = (e, email, password) => {
    //     e.preventDefault();
    //     const details = {
    //         email: email,
    //         password: password
    //     }
    //     axios.post('/api/users/login', details)
    //     .then(res => {
    //         switch (res.data) {
    //             case '"email" is not allowed to be empty':
    //                 setErrorHandle(['email' ,'Email cannot be empty'])
    //                 break;
    //             case '"email" length must be at least 6 characters long':
    //                 setErrorHandle(['email' ,'Email must be at least 6 characters long']);
    //                 setLoginEmail('');
    //                 break;
    //             case '"email" must be a valid email':
    //                 setErrorHandle(['email' ,'Must be a valid email']);
    //                 setLoginEmail('');
    //                 break;
    //             case 'email-not-found':
    //                 setErrorHandle(['email' ,'Email not found'])
    //                 break;
    //             case '"password" is not allowed to be empty':
    //                 setErrorHandle(['password' ,'Password cannot be empty']);
    //                 break;
    //             case '"password" length must be at least 6 characters long':
    //                 setErrorHandle(['password' ,'Password is too short']);
    //                 setLoginPassword('');
    //                 break;
    //             case 'invalid-password':
    //                 setErrorHandle(['password' ,'Invalid password']);
    //                 setLoginPassword('');
    //                 break;
    //             case 'user-not-authorized':
    //                 setErrorHandle('not-authorized');
    //                 setLoginEmail(''); setLoginPassword('');
    //                 break;
    //             default:
    //                 const userToken = res.headers["auth-token"];
    //                 localStorage.setItem('userToken', userToken);
    //                 localStorage.setItem('userEmail', loginEmail);
    //                 localStorage.setItem('userPassword', loginPassword);
    //                 props.setLoggedIn(true);
    //         }
    //         //Get User Data
    //         axios.get('/api/users', {
    //             params: {
    //                 email: loginEmail
    //             }
    //         })
    //         .then(res => {
    //             const newUserData = res.data;
    //             setUserData(newUserData);
    //         })
    //         .catch(err => {
    //             console.log("Error: " + err);
    //         })
    //     })
    // }
    const loginAdmin = (e) => {
        e.preventDefault();
        const details = {
            email: 'legion@gmail.com',
            password: 'legion555'
        }
        axios.post('/api/users/login', details)
        .then(res => {
            axios.get('/api/users', {
                params: {
                    email: 'legion@gmail.com'
                }
            })
            .then(res => {
                const newUserData = res.data;
                setUserData(newUserData);
                props.setView('admin');
            })
        })
    }
    const loginManager = (e) => {
        e.preventDefault();
        const details = {
            email: 'testmanager@gmail.com',
            password: 'testmanager123'
        }
        axios.post('/api/users/login', details)
        .then(res => {
            axios.get('/api/users', {
                params: {
                    email: 'testmanager@gmail.com'
                }
            })
            .then(res => {
                const newUserData = res.data;
                setUserData(newUserData);
                props.setView('manager');
            })
        })
    }
    // const loginTeacher = (e) => {
    //     e.preventDefault();
    //     const details = {
    //         email: 'testteacher1@gmail.com',
    //         password: 'testteacher1123'
    //     }
    //     axios.post('/api/users/login', details)
    //     .then(res => {
    //         axios.get('/api/users', {
    //             params: {
    //                 email: 'testteacher1@gmail.com'
    //             }
    //         })
    //         .then(res => {
    //             const newUserData = res.data;
    //             setUserData(newUserData);
    //             props.setView('teacher');
    //         })
    //     })
    // }

    //Register new user
    // const register = (e) => {
    //     e.preventDefault();
    //     const payload = {
    //         name: regName,
    //         email: regEmail,
    //         password: regPassword
    //     }
    //     axios.post('/api/users/register', payload)
    //     .then(res => {
    //         switch (res.data) {
    //             case '"name" is not allowed to be empty':
    //                 setErrorHandle(['name' ,'Name cannot be empty'])
    //                 break;
    //             case '"email" is not allowed to be empty':
    //                 setErrorHandle(['email' ,'Email cannot be empty'])
    //                 break;
    //             case '"email" length must be at least 6 characters long':
    //                 setErrorHandle(['email' ,'Email must be at least 6 characters long']);
    //                 setRegEmail('');
    //                 break;
    //             case '"email" must be a valid email':
    //                 setErrorHandle(['email' ,'Must be a valid email']);
    //                 setRegEmail('');
    //                 break;
    //             case 'email-duplicate':
    //                 setErrorHandle(['email' ,'doubleEmails']);
    //                 setRegEmail('');
    //                 break;
    //             case '"password" is not allowed to be empty':
    //                 setErrorHandle(['password' ,'Password cannot be empty']);
    //                 break;
    //             case '"password" length must be at least 6 characters long':
    //                 setErrorHandle(['password' ,'Password is too short']);
    //                 setRegPassword('');
    //                 break;
    //             default:
    //                 setErrorHandle('registered');
    //                 setRegName(''); setRegEmail(''); setRegPassword('');

    //         }
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     })
    // }
    
    return (
        <div  className="auth-wrapper">
            <div className="auth-container">
                <div>
                    <Button fullWidth variant="contained" color="primary" onClick={loginAdmin}>
                        Login as admin
                    </Button>
                </div><br/>
                <div>
                    <Button fullWidth variant="contained" color="primary" onClick={loginManager}>
                        Login as manager
                    </Button>
                </div><br/>
                {/* <div>
                    <Button fullWidth variant="contained" color="primary" onClick={loginTeacher}>
                        Login as teacher
                    </Button>
                </div> */}
                <br/><br/>
                {/* {view === 'login' &&
                <div className="login-container">
                    <h1>Login</h1>
                    <form>
                        <TextField fullWidth className={errorHandle[0] === 'email' ? "input error" : "input"} label={errorHandle[0] === "email" ? errorHandle[1] : "Email"} 
                        onChange={(e) => setLoginEmail(e.target.value)} value={loginEmail}/>
                        <TextField fullWidth className={errorHandle[0] === 'password' ? "error" : undefined} label={errorHandle[0] === "password" ? errorHandle[1] : "Password"} 
                        onChange={(e) => setLoginPassword(e.target.value)} value={loginPassword}/>
                        
                        <Button fullWidth variant="contained" size="small" color="primary" onClick={(e) => login(e, loginEmail, loginPassword)}>
                            Login
                        </Button>
                    </form>
                    {errorHandle === 'not-authorized' &&
                    <p>Not approved yet.<br/>Please wait for Manager's approval.</p>
                    }
                    <Button variant="outlined" color="default" onClick={() => setView('register')}>
                        Not registered? Click here to register a new account.
                    </Button>
                </div>
                } */}
                {/* {view === 'register' &&
                <div className="register-container">
                    <h1>Register a new account</h1>
                    {errorHandle !== 'registered' &&
                    <form className="input-main">
                        <TextField fullWidth className={errorHandle[0] === 'name' ? "error" : undefined} label={errorHandle[0] === "name" ? errorHandle[1] : "Name"} 
                        onChange={(e) => setRegName(e.target.value)} value={regName}/>
                        <TextField fullWidth className={errorHandle[0] === 'email' ? "error" : undefined} label={errorHandle[0] === "email" ? errorHandle[1] : "Email"} 
                        onChange={(e) => setRegEmail(e.target.value)} value={regEmail}/>
                        <TextField fullWidth className={errorHandle[0] === 'password' ? "error" : undefined} label={errorHandle[0] === "password" ? errorHandle[1] : "Password"} 
                        onChange={(e) => setRegPassword(e.target.value)} value={regPassword}/>
                        
                        <Button fullWidth variant="contained" size="small" color="primary" onClick={(e) => register(e, loginEmail, loginPassword)}>
                            Login
                        </Button>
                    </form>
                    }
                    {errorHandle === 'registered' &&
                    <p>Successfully registered!<br/>Please wait for Manager's approval.</p>
                    }
                    <Button fullWidth variant="contained" color="primary" onClick={() => setView('login')}>
                        Login with an existing account
                    </Button>
                </div>
                } */}
            </div>
        </div>
    )
}

export default LoginForm