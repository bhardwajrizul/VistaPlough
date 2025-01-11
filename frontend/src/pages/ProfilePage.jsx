import { Fragment } from 'react';
import { Outlet } from 'react-router';
import ProfileNavigation from '../components/Profile/ProfileNavgation';

const ProfilePage = () => {

    return (
        <Fragment>
            <h1 className="text-center mt-8 u-font-sarasvati text-4xl u-text-accent u-text-shadow">
                Your Profile
            </h1>
            <div className="w-[95%] lg:w-[85%] mx-auto min-h-screen u-bg-white u-border-accent rounded-[25px] u-box-shadow my-8">
                <div className="hero-content flex-col lg:flex-row justify-between items-start h-full">

                    <ProfileNavigation />
                    <Outlet />
                </div>
            </div>
        </Fragment>
    )
}

export default ProfilePage;