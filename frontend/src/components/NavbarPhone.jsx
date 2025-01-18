import { LucideUser, UserPlus, LogIn, SearchIcon } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { HomeIcon, StoreIcon, ShoppingCartIcon, LucideLayoutDashboard, Loader, ListIcon, LogOutIcon } from "lucide-react";


import LogoWithLink from './Logo';

import { useState } from "react";



const Navbar = () => {


    const { user, logout, loading } = useUserStore();
    const isAdmin = user?.role === "admin";
    const { cart } = useCartStore();


    const location = useLocation();

    const [searchInput, setSearchInput] = useState('');

    const navigate = useNavigate();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        navigate(`/products?s=${searchInput}`);
    }

    return (
        <header className='relative mt-4 u-box-shadow top-0 left-0 w-[95%] lg:w-[85%] mx-auto rounded-[15px] u-bg-white bg-opacity-90 backdrop-blur-md z-40 transition-all duration-300 u-border-accent'>
            <div className='container mx-auto px-2 lg:px-8 py-3'>
                <div className='flex flex-row '>
                    {
                        <LogoWithLink />
                    }

                    <form
                        onSubmit={handleFormSubmit}
                        className="flex flex-row flex-1 items-center gap-2 ms-2 lg:mx-10 relative">
                        <input
                            onChange={(e) => setSearchInput(e.target.value)}
                            className="u-font-wasted focus:shadow-md w-full u-border-accent outline-none rounded-[10px] ps-4 pe-10 py-2" />
                        <button
                            type="submit"
                            className="absolute right-0 m-2"><SearchIcon className="stroke-yellow-600 hover:translate-y-[-2px] active:translate-y-[0px] transition-all ease-in duration-75" /></button>
                    </form>


                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn bg-transparent ms-2">
                            <ListIcon className="stroke-green-600" size={18} />
                        </div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            <li>
                                {
                                    location.pathname !== '/products' &&
                                    <Link
                                        to={"/products"}
                                        className='flex flex-row items-center justify-start'>
                                        <StoreIcon stroke="#7f5b98" />
                                        <span className="u-font-itangiuh u-text-tertiary mt-1">
                                            Products
                                        </span>
                                    </Link>
                                }
                                {
                                    location.pathname === '/products' &&
                                    <Link
                                        to={"/"}
                                        className='flex flex-row items-center justify-start'>
                                        <HomeIcon stroke="#7f5b98"   />
                                        <span className="u-font-itangiuh u-text-tertiary">
                                            Home
                                        </span>
                                    </Link>
                                }
                            </li>
                            <li>
                                {user && (
                                    <Link
                                        to={"/cart"}
                                        className='relative flex items-center justify-start group text-gray-300 hover:u-text-accent transition duration-300 
							ease-in-out '
                                    >
                                        <ShoppingCartIcon stroke="green" />
                                        <span className="u-font-itangiuh u-text-accent">
                                            Cart
                                        </span>
                                        {cart.length > 0 && (
                                            <span
                                                className='absolute -top-1 -left-1 u-bg-accent text-white rounded-full px-2 py-0.5 
									text-xs group-hover:u-bg-primary transition duration-300 ease-in-out'
                                            >
                                                {cart.length}
                                            </span>
                                        )}
                                    </Link>
                                )}
                            </li>
                            <li>
                                {isAdmin && (
                                    <Link
                                        className='u-bg-accent shadow-[0px_4px_0px_rgba(0,0,0,0.3)] active:translate-y-[4px] active:shadow-[0px_0px_0px_rgba(0,0,0,0.3)] transition-all rounded-xl px-4 py-2 u-font-sarasvati text-lg u-text-white '
                                        to={"/secret-dashboard"}
                                    >
                                        <LucideLayoutDashboard className="fill-white stroke-white" size={22} />
                                        <span className='sm:inline u-font-secondary u-text-white'>Dashboard</span>
                                    </Link>
                                )}
                            </li>
                            <li>
                                {user ? (
                                    <>
                                        <Link
                                            to={'/profile'}
                                            className='my-2 flex flex-row items-center u-bg-primary shadow-[0px_4px_0px_rgba(0,0,0,0.3)] active:translate-y-[4px] active:shadow-[0px_0px_0px_rgba(0,0,0,0.3)] transition-all rounded-xl px-4 py-2 u-font-sarasvati text-lg u-text-white '
                                        >
                                            <LucideUser className="fill-white stroke-white" size={22} />
                                            <span className='text-white u-font-secondary sm:inline'>{user.name.split(" ")[0]}</span>
                                        </Link>
                                        <button
                                            onClick={() => logout()}
                                            className={`u-bg-black block w-full lg:mt-8 shadow-[0px_4px_0px_rgba(0,0,0,0.3)] active:translate-y-[4px] active:shadow-[0px_0px_0px_rgba(0,0,0,0.3)] transition-all rounded-xl u-font-secondary text-lg u-text-white flex flex-row justify-start items-center hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2
							  focus:ring-gray-500 transition duration-150 ease-in-out disabled:opacity-50 ${location.pathname === '/profile' && "visible"}`}
                                            disabled={loading}
                                        >
                                            {
                                                loading && <Loader className='mr-2 h-5 w-5 animate-spin stroke-white ' aria-hidden='true' />
                                            }
                                            <LogOutIcon stroke="white" />
                                            Log Out
                                            
                                        </button>
                                    </>

                                ) : (
                                    <>
                                        <Link
                                            to={"/signup"}
                                            className='u-font-secondary flex flex-row items-center u-bg-accent shadow-[0px_4px_0px_rgba(0,0,0,0.3)] active:translate-y-[4px] active:shadow-[0px_0px_0px_rgba(0,0,0,0.3)] transition-all rounded-xl px-4 py-2 text-lg u-text-white'
                                        >
                                            <UserPlus className='mr-2 stroke-white' size={22} />
                                            Sign Up
                                        </Link>
                                        <Link
                                            to={"/login"}
                                            className='u-font-secondary my-2 lg:my-0 flex flex-row items-center u-bg-tertiary shadow-[0px_4px_0px_rgba(0,0,0,0.3)] active:translate-y-[4px] active:shadow-[0px_0px_0px_rgba(0,0,0,0.3)] transition-all rounded-xl px-4 py-2 u-font-sarasvati text-lg u-text-white'
                                        >
                                            <LogIn className='mr-2 stroke-white' size={22} />
                                            Login
                                        </Link>
                                    </>
                                )}
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </header>
    );
};
export default Navbar;
