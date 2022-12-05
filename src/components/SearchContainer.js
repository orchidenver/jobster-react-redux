import { useState, useMemo } from 'react';
import { FormRow, FormRowSelect } from '.';
import Wrapper from '../assets/wrappers/SearchContainer';
import { useSelector, useDispatch } from 'react-redux';
import { handleChange, clearFilters } from '../features/allJobs/allJobsSlice';

export default function SearchContainer() {
    const { isLoading, search, searchStatus, searchType, sort, sortOptions } =
        useSelector((store) => store.allJobs);
    const { jobTypeOptions, statusOptions } = useSelector((store) => store.job);
    const dispatch = useDispatch();
    const [localSearch, setLocalSearch] = useState('');

    function onHandleSearch(e) {
        dispatch(handleChange({ name: e.target.name, value: e.target.value }));
    }

    function omHandleSubmit(e) {
        e.preventDefault();
        dispatch(clearFilters());
    }

    const debounce = () => {
        let timeoutID;

        // return fn as value
        return (e) => {
            setLocalSearch(e.target.value);
            clearTimeout(timeoutID);
            timeoutID = setTimeout(() => {
                dispatch(handleChange({ name: e.target.name, value: e.target.value }));
            }, 1000);
        };
    };

    const optimizedDebounce = useMemo(() => debounce(), []);

    return (
        <Wrapper>
            <form className='form'>
                <h4>search form</h4>
                <div className='form-center'>
                    <FormRow
                        type='text'
                        name='search'
                        value={localSearch}
                        handleChange={optimizedDebounce}
                    />
                    <FormRowSelect
                        labelText='status'
                        name='searchStatus'
                        value={searchStatus}
                        handleChange={onHandleSearch}
                        list={['all', ...statusOptions]}
                    />
                    <FormRowSelect
                        labelText='type'
                        name='searchType'
                        value={searchType}
                        handleChange={onHandleSearch}
                        list={['all', ...jobTypeOptions]}
                    />
                    <FormRowSelect
                        name='sort'
                        value={sort}
                        handleChange={onHandleSearch}
                        list={sortOptions}
                    />
                    <button
                        className='btn btn-block btn-danger'
                        disabled={isLoading}
                        onClick={omHandleSubmit}
                    >
                        clear filters
                    </button>
                </div>
            </form>
        </Wrapper>
    );
}
