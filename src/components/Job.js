import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Job';
import JobInfo from './JobInfo';
import { useDispatch } from 'react-redux';
import { deleteJob, setEditJob } from '../features/job/jobSlice';
import moment from 'moment';

export default function Job({
    _id,
    position,
    company,
    jobLocation,
    jobType,
    createdAt,
    status,
}) {
    const dispatch = useDispatch();

    const date = moment(createdAt).format('MMM Do, YYYY');

    function onDeleteJobHandler() {
        dispatch(deleteJob(_id));
    }

    function onEditJobHandler() {
        dispatch(
            setEditJob({
                editJobId: _id,
                position,
                company,
                jobLocation,
                jobType,
                status,
            }));
    }

    return (
        <Wrapper>
            <header>
                <div className='main-icon'>{company.charAt(0)}</div>
                <div className='info'>
                    <h5>{position}</h5>
                    <p>{company}</p>
                </div>
            </header>
            <div className='content'>
                <div className='content-center'>
                    <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
                    <JobInfo icon={<FaCalendarAlt />} text={date} />
                    <JobInfo icon={<FaBriefcase />} text={jobType} />
                    <div className={`status ${status}`}>{status}</div>
                </div>
                <footer>
                    <div className='actions'>
                        <Link
                            to='/add-job'
                            className='btn edit-btn'
                            onClick={onEditJobHandler}
                        >
                            Edit
                        </Link>
                        <button
                            type='button'
                            className='btn delete-btn'
                            onClick={onDeleteJobHandler}
                        >
                            Delete
                        </button>
                    </div>
                </footer>
            </div>
        </Wrapper>
    );
}
