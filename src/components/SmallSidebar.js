import Wrapper from '../assets/wrappers/SmallSidebar';
import { FaTimes } from 'react-icons/fa';
import Logo from './Logo';
import NavLinks from './NavLinks';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar } from '../features/user/userSlice';


export default function SmallSidebar() {
    const { isSidebarOpen } = useSelector((store) => store.user);
    const dispatch = useDispatch();

    function onToggleHandler() {
        dispatch(toggleSidebar());
    }

    return (
        <Wrapper>
            <div className={isSidebarOpen ? 'sidebar-container show-sidebar' : 'sidebar-container'}>
                <div className='content'>
                    <button type='button' className='close-btn' onClick={onToggleHandler}>
                        <FaTimes />
                    </button>
                    <header>
                        <Logo />
                    </header>
                    <NavLinks toggleSidebar={onToggleHandler} />
                </div>
            </div>
        </Wrapper>
    );
}
