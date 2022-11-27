import { useState } from 'react';
import { FormRow } from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../features/user/userSlice';
import { toast } from 'react-toastify';


export default function Profile() {
    const { isLoading, user } = useSelector((store) => store.user);
    const dispatch = useDispatch();

    const [userData, setUserData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        lastName: user?.lastName || '',
        location: user?.location || '',
    });

    function onHandleSubmit(e) {
        e.preventDefault();


        const { name, email, lastName, location } = userData;

        if (!name || !email || !lastName || !location) {
            toast.error('Please Fill Out All Fields');
            return;
        }

        dispatch(updateUser({ name, email, lastName, location }));
    };

    function onHandleChange(e) {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

    return (
        <Wrapper>
            <form className='form' onSubmit={onHandleSubmit}>
                <h3>profile</h3>

                <div className='form-center'>
                    <FormRow
                        type='text'
                        name='name'
                        value={userData.name}
                        handleChange={onHandleChange}
                    />
                    <FormRow
                        type='text'
                        labelText='last name'
                        name='lastName'
                        value={userData.lastName}
                        handleChange={onHandleChange}
                    />
                    <FormRow
                        type='email'
                        name='email'
                        value={userData.email}
                        handleChange={onHandleChange}
                    />
                    <FormRow
                        type='text'
                        name='location'
                        value={userData.location}
                        handleChange={onHandleChange}
                    />
                    <button className='btn btn-block' type='submit' disabled={isLoading}>
                        {isLoading ? 'Please Wait...' : 'save changes'}
                    </button>
                </div>
            </form>
        </Wrapper>
    );
}
