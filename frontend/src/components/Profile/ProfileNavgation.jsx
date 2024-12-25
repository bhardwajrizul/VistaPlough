
import { Loader } from 'lucide-react'
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'
import { useUserStore } from '../../stores/useUserStore';

const ProfileNavigation = () => {



    const location = useLocation();

    const { logout, loading } = useUserStore();

    return (
        <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex flex-col h-full gap-4 basis-[35%] min-h-96 rounded-[25px] p-4">
            <h1 className="text-center u-font-sarasvati text-4xl u-text-accent u-text-shadow">
                Your Profile
            </h1>
            <Link
                to="/profile"
                className={`u-bg-tertiary text-center mt-4 shadow-[0px_4px_0px_rgba(0,0,0,0.3)] active:translate-y-[4px] active:shadow-[0px_0px_0px_rgba(0,0,0,0.3)] transition-all rounded-xl py-3 u-font-sarasvati text-lg u-text-white hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2
							  focus:ring-purple-200 transition duration-150 ease-in-out disabled:opacity-50 ${location.pathname === '/profile' && "u-bg-tertiary-light u-text-black"}`}>
                General
            </Link>
            <Link
                to={'/profile/orders'}
                className={`u-bg-tertiary text-center mt-1 shadow-[0px_4px_0px_rgba(0,0,0,0.3)] active:translate-y-[4px] active:shadow-[0px_0px_0px_rgba(0,0,0,0.3)] transition-all rounded-xl py-3 u-font-sarasvati text-lg u-text-white hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2
							  focus:ring-purple-200 transition duration-150 ease-in-out disabled:opacity-50 ${location.pathname.includes('orders') && "u-bg-tertiary-light u-text-black"}`}>
                Orders
            </Link>
            <Link
                to={'/profile/settings'}
                className={`u-bg-tertiary text-center mt-1 shadow-[0px_4px_0px_rgba(0,0,0,0.3)] active:translate-y-[4px] active:shadow-[0px_0px_0px_rgba(0,0,0,0.3)] transition-all rounded-xl py-3 u-font-sarasvati text-lg u-text-white hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2
                                focus:ring-purple-200 transition duration-150 ease-in-out disabled:opacity-50 ${location.pathname.includes('settings') && "u-bg-tertiary-light u-text-black"}`}
            >
                Settings
            </Link>
            <button
                onClick={() => logout()}
                className={`u-bg-black mt-8 shadow-[0px_4px_0px_rgba(0,0,0,0.3)] active:translate-y-[4px] active:shadow-[0px_0px_0px_rgba(0,0,0,0.3)] transition-all rounded-xl py-3 u-font-sarasvati text-lg u-text-white flex flex-row justify-center items-center hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2
							  focus:ring-gray-500 transition duration-150 ease-in-out disabled:opacity-50`}
                disabled={loading}
            >
                {
                    loading && <Loader className='mr-2 h-5 w-5 animate-spin stroke-white ' aria-hidden='true' />
                }
                Log Out
            </button>
        </motion.div>
    )
}

export default ProfileNavigation;