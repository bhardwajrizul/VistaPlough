
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'
import { useUserStore } from '../../stores/useUserStore';

import { LogOutIcon, Loader, SettingsIcon, BoxesIcon, UserCogIcon } from 'lucide-react';


const ProfileNavigation = () => {

    const { logout, loading } = useUserStore();


    const location = useLocation();


    return (
        <>

            <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="flex flex-row flex-wrap lg:flex-col h-full gap-4 lg:basis-[35%] lg:min-h-96 rounded-[25px] lg:p-4">

                <Link
                    to="/profile"
                    className={`u-bg-green flex-1 flex flex-row items-center justify-center lg:flex-none text-center lg:mt-4 shadow-[0px_4px_0px_rgba(0,0,0,0.3)] active:translate-y-[4px] active:shadow-[0px_0px_0px_rgba(0,0,0,0.3)] transition-all rounded-xl py-3 u-font-secondary text-md lg:text-lg u-text-white hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2
							  focus:ring-green-800 transition duration-150 ease-in-out disabled:opacity-50 ${location.pathname === '/profile' && "u-bg-accent-light"}`}>
                    <UserCogIcon stroke='white' />
                    General
                </Link>
                <Link
                    to={'/profile/orders'}
                    className={`u-bg-green flex-1 flex flex-row items-center justify-center lg:flex-none text-center lg:mt-1 shadow-[0px_4px_0px_rgba(0,0,0,0.3)] active:translate-y-[4px] active:shadow-[0px_0px_0px_rgba(0,0,0,0.3)] transition-all rounded-xl py-3 u-font-secondary text-lg u-text-white hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2
							  focus:ring-green-800 transition duration-150 ease-in-out disabled:opacity-50 ${location.pathname.includes('orders') && "u-bg-accent-light"}`}>
                    <BoxesIcon className='mr-1' stroke='white' />
                    Orders
                </Link>
                <Link
                    to={'/profile/settings'}
                    className={`u-bg-green flex-1 flex flex-row items-center justify-center lg:flex-none text-center lg:mt-1 shadow-[0px_4px_0px_rgba(0,0,0,0.3)] active:translate-y-[4px] active:shadow-[0px_0px_0px_rgba(0,0,0,0.3)] transition-all rounded-xl py-3 u-font-secondary text-lg u-text-white hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2
                                focus:ring-green-800 transition duration-150 ease-in-out disabled:opacity-50 ${location.pathname.includes('settings') && "u-bg-accent-light"}`}
                >
                    <SettingsIcon className='mr-1' stroke='white' />
                    Settings
                </Link>
                <button
                    onClick={() => logout()}
                    className={`u-bg-black block invisible lg:py-3 h-0 lg:visible lg:h-auto w-full lg:mt-8 shadow-[0px_4px_0px_rgba(0,0,0,0.3)] active:translate-y-[4px] active:shadow-[0px_0px_0px_rgba(0,0,0,0.3)] transition-all rounded-xl u-font-secondary text-lg u-text-white flex flex-row justify-center items-center hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2
							  focus:ring-gray-500 transition duration-150 ease-in-out disabled:opacity-50`}
                    disabled={loading}
                >
                    {
                        loading && <Loader className='mr-2 h-5 w-5 animate-spin stroke-white ' aria-hidden='true' />
                    }
                    <LogOutIcon className='mr-1' stroke="white" />
                    Log Out

                </button>
            </motion.div>
        </>
    )
}

export default ProfileNavigation;