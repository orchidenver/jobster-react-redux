import { Link } from 'react-router-dom';
import { LazyLoadImage } from "react-lazy-load-image-component";

import img from '../assets/images/not-found.svg';
import Wrapper from '../assets/wrappers/ErrorPage';

export default function Error() {
    return (
        <Wrapper className='full-page'>
            <div>
                <LazyLoadImage src={img} alt='not found' effect='blur' />
                <h3>PAGE NOT FOUND</h3>
                <p>Try go back to the homepage</p>
                <Link to='/'>back home</Link>
            </div>
        </Wrapper>
    )
}
