import { LazyLoadImage } from "react-lazy-load-image-component";

import logo from '../assets/images/logo.svg';


export default function Logo() {
    return (
        <LazyLoadImage src={logo} alt='jobster logo' className='logo' effect='blur' />
    )
}
