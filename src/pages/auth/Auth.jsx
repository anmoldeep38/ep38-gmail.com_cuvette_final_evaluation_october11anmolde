import '../../styles/Auth.css'

import { useState } from 'react';
import { useDispatch } from 'react-redux'

import { createAccount, login } from '../../redux/slices/AuthSlice'

function Login() {
    const [activeTab, setActiveTab] = useState('signup');
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirm_password: ""
    })
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password: ''
    });
    const dispatch = useDispatch()

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    }

    function handleUserInput(e) {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
        setErrors({ ...errors, [name]: '' })
    }

    async function signup(event) {
        event.preventDefault();

        let formIsValid = true;
        const newErrors = { ...errors };

        if (activeTab === 'signup') {
            if (!data.name) {
                formIsValid = false;
                newErrors.name = 'Name is required';
            }
            if (!data.confirm_password) {
                formIsValid = false;
                newErrors.confirm_password = 'Confirm Password is required';
            }
            if (data.password !== data.confirm_password) {
                formIsValid = false;
                newErrors.password = 'Passwords do not match';
                newErrors.confirm_password = 'Passwords do not match';
            }
        }

        if (!data.email) {
            formIsValid = false;
            newErrors.email = 'Email is required';
        }

        if (!data.password) {
            formIsValid = false;
            newErrors.password = 'Password is required';
        }

        if (formIsValid) {
            let response;

            if (activeTab === 'signup') {
                response = await dispatch(createAccount(data));
            } else {
                response = await dispatch(login(data));
            }

            if (response.payload?.success) {
                setData({
                    name: '',
                    email: '',
                    password: '',
                    confirm_password: ''
                });
            }
        } else {
            setErrors(newErrors);
        }
    }

    return (
        <div className='auth-container'>
            <div className='main-container'>
                <h1 className='title'>QUIZZIE</h1>
                <div className='button-group'>
                    <span
                        className={activeTab === 'signup' ? 'signup active' : 'signup'}
                        onClick={() => handleTabClick('signup')}
                    >
                        Sign Up
                    </span>

                    <span
                        className={activeTab === 'login' ? 'login active' : 'login'}
                        onClick={() => handleTabClick('login')}
                    >
                        Log In
                    </span>
                </div>
                <div className='form-container'>
                    <form onSubmit={signup} className='form'>
                        {activeTab === 'signup' && (
                            <div className='name'>
                                <label htmlFor='name' className='label'>
                                    Name
                                </label>
                                <input
                                    type='text'
                                    name='name'
                                    id='name'
                                    className={`input ${errors.name ? 'input-error' : ''}`}
                                    autoComplete='off'
                                    onChange={handleUserInput}
                                    placeholder={'' || errors.name}
                                    value={data.name}
                                />
                            </div>
                        )}
                        <div className='email'>
                            <label htmlFor='email' className='label'>
                                Email
                            </label>
                            <input
                                type='email'
                                name='email'
                                id='email'
                                className={`input ${errors.email ? 'input-error' : ''}`}
                                autoComplete='off'
                                onChange={handleUserInput}
                                placeholder={'' || errors.email}
                                value={data.email}
                            />
                        </div>
                        <div className='password'>
                            <label htmlFor='password' className='label'>
                                Password
                            </label>
                            <input
                                type={`${errors.password ? 'text' : 'password'}`}
                                name='password'
                                id='password'
                                className={`input ${errors.password ? 'input-error' : ''}`}
                                autoComplete='off'
                                onChange={handleUserInput}
                                placeholder={'' || errors.password}
                                value={data.password}
                            />
                        </div>
                        {activeTab === 'signup' && (
                            <div className='confirm-password'>
                                <label htmlFor='confirm-password' className='label'>
                                    Confirm Password
                                </label>
                                <input
                                    type={`${errors.password ? 'text' : 'password'}`}
                                    name='confirm_password'
                                    id='confirm-password'
                                    className={`input ${errors.confirm_password ? 'input-error' : ''}`}
                                    autoComplete='off'
                                    onChange={handleUserInput}
                                    placeholder={'' || errors.confirm_password}
                                    value={data.confirm_password}
                                />
                            </div>
                        )}
                        <button type='submit' className='button'>
                            {activeTab === 'signup' ? 'Sign Up' : 'Log In'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login
