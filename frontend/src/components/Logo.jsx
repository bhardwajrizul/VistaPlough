import { Fragment, useState } from "react";
import LogoImage from '../assets/Images/logo.webp'

import { Link } from 'react-router-dom';


const NavbarLogoWithLink = () => {
    const [logoLoaded, setLogoLoaded] = useState(false);
    return (
        <Fragment>
            <Link
                className='flex items-center justify-center '
                to='/'>
                {
                    // skeleton on Image not loaded otherwise Image
                    !logoLoaded &&
                    <div className="skeleton w-36 h-[80%] rounded-full u-border-accent"></div>
                }
                <img
                    src={LogoImage}
                    alt="Vista Plow Logo"
                    className={`w-[50px] rounded-full ${!logoLoaded ? 'hidden' : 'inline-block'}`}
                    onLoad={() => setLogoLoaded(true)} />
            </Link>
        </Fragment>
    );
}

export default NavbarLogoWithLink;