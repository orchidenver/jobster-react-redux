import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Logo } from '../components';
import FormRow from '../components/FormRow';
import Wrapper from '../assets/wrappers/RegisterPage';
import { toast } from 'react-toastify';

import { useSelector, useDispatch } from 'react-redux';
import { loginUser, registerUser } from '../features/user/userSlice';

const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true,
};

export default function Register() {
    const [values, setValues] = useState(initialState);
    const dispatch = useDispatch();
    const { isLoading, user } = useSelector((store) => store.user);
    const navigate = useNavigate();

    useEffect(() => {
        let navUser;

        if (user) {
            navUser = setTimeout(() => {
                navigate('/');
            }, 3000);
        }

        return () => { clearTimeout(navUser) };
    }, [user, navigate]);

    function onHandleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        console.log(`${name}:${value}`);

        setValues({ ...values, [e.target.name]: e.target.value });
    }

    function onSubmitChange(e) {
        e.preventDefault();

        const { name, email, password, isMember } = values;

        if (!email || !password || (!isMember && !name)) {
            toast.warning('Please Fill Out All Fields');
            return;
        }

        isMember ?
            dispatch(loginUser({ email, password })) :
            dispatch(registerUser({ name, email, password }));
    }

    function onToggleMember() {
        setValues({ ...values, isMember: !values.isMember });
    }

    return (
        <Wrapper className='full-page'>
            <form className='form' onSubmit={onSubmitChange}>
                <Logo />
                <h3>{values.isMember ? 'Login' : 'Register'}</h3>
                {!values.isMember && (
                    <FormRow
                        type='text'
                        name='name'
                        value={values.name}
                        handleChange={onHandleChange}
                    />
                )}
                <FormRow
                    type='email'
                    name='email'
                    value={values.email}
                    handleChange={onHandleChange}
                />
                <FormRow
                    type='password'
                    name='password'
                    value={values.password}
                    handleChange={onHandleChange}
                />
                <button type='submit' className='btn btn-block' disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'submit'}
                </button>
                <p>
                    {values.isMember ? 'Not a member yet?' : 'Already a member?'}

                    <button type='button' onClick={onToggleMember} className='member-btn'>
                        {values.isMember ? 'Register' : 'Login'}
                    </button>
                </p>
            </form>
        </Wrapper>
    );
}
