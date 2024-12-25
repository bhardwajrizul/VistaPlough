import { Fragment } from 'react';
import { Outlet } from 'react-router';
import ProfileNavigation from '../components/Profile/ProfileNavgation';

const ProfilePage = () => {

    return (
        <Fragment>
        <div className="w-[85%] mx-auto min-h-screen u-bg-white u-border-accent rounded-[25px] u-box-shadow my-8">
            <div className="hero-content flex-col lg:flex-row justify-between items-start h-full">
                <ProfileNavigation />
                <Outlet />
            </div>
        </div>
    </Fragment>
    )
}

export default ProfilePage;