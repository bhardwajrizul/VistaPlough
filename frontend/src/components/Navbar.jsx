import {
	LucideUser,
	UserPlus,
	LogIn,
	SearchIcon,
	HomeIcon,
	StoreIcon,
	ShoppingCartIcon,
	LucideLayoutDashboard,
} from "lucide-react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

import LogoWithLink from './Logo';


import { useState } from "react";



const Navbar = () => {
	const { user } = useUserStore();
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
		<header className='relative  u-box-shadow top-0 left-0 w-[95%] lg:w-[85%] mx-auto rounded-[15px] u-bg-white bg-opacity-90 backdrop-blur-md z-40 transition-all duration-300 u-border-accent'>
			<div className='container mx-auto px-8 py-3'>
				<div className='flex flex-row '>
					{
						<LogoWithLink />
					}

					<form
						onSubmit={handleFormSubmit}
						className="flex flex-row flex-1 items-center gap-2 mx-10 relative">
						<input
							onChange={(e) => setSearchInput(e.target.value)}
							className="u-font-wasted focus:shadow-md w-full u-border-accent outline-none rounded-[10px] ps-4 pe-10 py-2" />
						<button
							type="submit"
							className="absolute right-0 m-2"><SearchIcon className="stroke-yellow-600 hover:translate-y-[-2px] active:translate-y-[0px] transition-all ease-in duration-75" /></button>
					</form>

					<nav className='flex items-center gap-5'>
						{
							location.pathname !== '/products' &&
							<Link
								to={"/products"}
								className='flex flex-row items-center justify-center'>
								<StoreIcon className="mr-1" stroke="#7f5b98" />
								<span className="u-font-itangiuh u-text-tertiary">
									Products
								</span>
							</Link>
						}
						{
							location.pathname === '/products' &&
							<Link
								to={"/"}
								className='flex flex-row items-center justify-center'>
								<HomeIcon className="mr-1" stroke="#7f5b98" />
								<span className="u-font-itangiuh u-text-tertiary">
									Home
								</span>
							</Link>
						}

						{user && (
							<Link
								to={"/cart"}
								className='relative group text-gray-300 hover:u-text-accent transition duration-300 
							ease-in-out'
							>
								<div className="flex flex-row items-center justify-center">
									<ShoppingCartIcon className="mr-1" stroke="green" />
									<span className="u-font-itangiuh u-text-accent">
										Cart
									</span>
								</div>
								{cart.length > 0 && (
									<span
										className='absolute -top-4 -left-4 u-bg-accent text-white rounded-full px-2 py-0.5 
									text-xs group-hover:u-bg-primary transition duration-300 ease-in-out'
									>
										{cart.length}
									</span>
								)}
							</Link>
						)}
						{isAdmin && (
							<Link
								className='u-bg-accent flex flex-row items-center shadow-[0px_4px_0px_rgba(0,0,0,0.3)] active:translate-y-[4px] active:shadow-[0px_0px_0px_rgba(0,0,0,0.3)] transition-all rounded-xl px-4 py-2 u-font-sarasvati text-lg u-text-white '
								to={"/secret-dashboard"}
							>
								<LucideLayoutDashboard className="fill-white stroke-white mr-1" size={22} />
								<span className='hidden u-font-secondary sm:inline u-text-white'>Dashboard</span>
							</Link>
						)}

						{user ? (
							<Link
								to={'/profile'}
								className='flex flex-row items-center u-bg-primary shadow-[0px_4px_0px_rgba(0,0,0,0.3)] active:translate-y-[4px] active:shadow-[0px_0px_0px_rgba(0,0,0,0.3)] transition-all rounded-xl px-4 py-2 u-font-sarasvati text-lg u-text-white '
							>
								<LucideUser className="fill-white stroke-white" size={22} />
								<span className='hidden u-font-secondary text-white sm:inline ml-2'>{user.name.split(" ")[0]}</span>
							</Link>

						) : (
							<>
								<Link
									to={"/signup"}
									className='flex u-font-secondary flex-row items-center u-bg-accent shadow-[0px_4px_0px_rgba(0,0,0,0.3)] active:translate-y-[4px] active:shadow-[0px_0px_0px_rgba(0,0,0,0.3)] transition-all rounded-xl px-4 py-2 u-font-sarasvati text-lg u-text-white'
								>
									<UserPlus className='mr-2 stroke-white' size={22} />
									Sign Up
								</Link>
								<Link
									to={"/login"}
									className='flex flex-row u-font-secondary items-center u-bg-tertiary shadow-[0px_4px_0px_rgba(0,0,0,0.3)] active:translate-y-[4px] active:shadow-[0px_0px_0px_rgba(0,0,0,0.3)] transition-all rounded-xl px-4 py-2 u-font-sarasvati text-lg u-text-white'
								>
									<LogIn className='mr-2 stroke-white' size={22} />
									Login
								</Link>
							</>
						)}
					</nav>
				</div>
			</div>
		</header>
	);
};
export default Navbar;
