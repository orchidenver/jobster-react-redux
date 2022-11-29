import { useEffect } from 'react';
import { FormRow, FormRowSelect } from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { handleChange, clearValues, createJob } from '../../features/job/jobSlice';

export default function AddJob() {
    const {
        isLoading,
        position,
        company,
        jobLocation,
        jobType,
        jobTypeOptions,
        status,
        statusOptions,
        isEditing,
        editJobId,
    } = useSelector((store) => store.job);
    const { user } = useSelector((store) => store.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isEditing) {
            dispatch(handleChange({ name: 'jobLocation', value: user.location }));
        }
    }, []);

    function onHandleSubmit(e) {
        e.preventDefault();

        if (!position || !company || !jobLocation) {
            toast.error('Please Fill Out All Fields');
            return;
        }

        dispatch(createJob({ position, company, jobLocation, jobType, status }));
    };

    function onHandleJobInput(e) {
        const name = e.target.name;
        const value = e.target.value;

        dispatch(handleChange({ name, value }));
    };

    return (
        <Wrapper>
            <form className='form'>
                <h3>{isEditing ? 'edit job' : 'add job'}</h3>

                <div className='form-center'>
                    <FormRow
                        type='text'
                        name='position'
                        value={position}
                        handleChange={onHandleJobInput}
                    />
                    <FormRow
                        type='text'
                        name='company'
                        value={company}
                        handleChange={onHandleJobInput}
                    />
                    <FormRow
                        type='text'
                        labelText='job location'
                        name='jobLocation'
                        value={jobLocation}
                        handleChange={onHandleJobInput}
                    />
                    <FormRowSelect
                        name='status'
                        value={status}
                        handleChange={onHandleJobInput}
                        list={statusOptions}
                    />
                    <FormRowSelect
                        name='jobType'
                        labelText='job type'
                        value={jobType}
                        handleChange={onHandleJobInput}
                        list={jobTypeOptions}
                    />
                    {/* job type */}

                    {/* btn container */}
                    <div className='btn-container'>
                        <button
                            type='button'
                            className='btn btn-block clear-btn'
                            onClick={() => dispatch(clearValues())}
                        >
                            clear
                        </button>
                        <button
                            type='submit'
                            className='btn btn-block submit-btn'
                            onClick={onHandleSubmit}
                            disabled={isLoading}
                        >
                            submit
                        </button>
                    </div>
                </div>
            </form>
        </Wrapper>
    );
}
