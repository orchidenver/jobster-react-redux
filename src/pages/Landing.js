import { Helmet } from 'react-helmet';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from 'react-router-dom';

import Wrapper from '../assets/wrappers/LandingPage';
import { Logo } from '../components';

import main from '../assets/images/main.svg';


export default function Landing() {
    return (
        <>
            <Helmet>
                <meta name="description" content="Web site created using create-react-app" />
                <title>Jobster. Starter page</title>
            </Helmet>
            <Wrapper>
                <nav>
                    <Logo />
                </nav>
                <div className='container page'>
                    <div className='info'>
                        <h1>
                            job <span>tracking</span> app
                        </h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, quaerat voluptatem eaque est praesentium animi commodi quis fugit? Quaerat id cum tempora dolorum nisi odit voluptatum atque commodi doloremque quisquam.</p>
                        <Link to='/register' className='btn btn-hero'>
                            Login / Register
                        </Link>
                    </div>
                    <LazyLoadImage src={main} alt='job hunt' className='img main-img' effect='blur' />
                </div>
            </Wrapper>
        </>
    )
}

