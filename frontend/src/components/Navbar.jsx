import { LucideUser, UserPlus, LogIn } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

import LogoWithLink from './Logo';

import HomeImage from '../assets/Images/home.svg';
import ShopImage from '../assets/Images/shop.svg';
import CartImage from '../assets/Images/cart.svg';



const Navbar = () => {
	const { user } = useUserStore();
	const isAdmin = user?.role === "admin";
	const { cart } = useCartStore();

	const location = useLocation();

	return (
		<header className='relative u-box-shadow top-0 left-0 w-[85%] mx-auto rounded-[25px] u-bg-white bg-opacity-90 backdrop-blur-md z-40 transition-all duration-300 u-border-accent'>
			<div className='container mx-auto px-8 py-3'>
				<div className='flex flex-wrap justify-between items-center'>
					<LogoWithLink />

					<nav className='flex flex-wrap items-center gap-5'>
						{
							location.pathname !== '/products' &&
							<Link
								to={"/products"}
								className='flex flex-row items-center justify-center'>
								<img src={ShopImage} alt='Home' className='w-8 h-8 inline-block' />
								<span className="u-font-itangiuh u-text-tertiary mt-1">
									Products
								</span>
							</Link>
						}
						{
							location.pathname === '/products' &&
							<Link
								to={"/"}
								className='flex flex-row items-center justify-center'>
								<img src={HomeImage} alt='Home' className='w-8 h-8 inline-block' />
								<span className="u-font-itangiuh u-text-tertiary mt-1">
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
								<div>
									<img src={CartImage} alt='Cart' className='w-8 h-8 inline-block' />
									<span className="u-font-itangiuh u-text-accent mt-2">
										Cart
									</span>
								</div>
								{cart.length > 0 && (
									<span
										className='absolute -top-2 -left-2 u-bg-accent text-white rounded-full px-2 py-0.5 
									text-xs group-hover:u-bg-primary transition duration-300 ease-in-out'
									>
										{cart.length}
									</span>
								)}
							</Link>
						)}
						{isAdmin && (
							<Link
								className='u-bg-accent shadow-[0px_4px_0px_rgba(0,0,0,0.3)] active:translate-y-[4px] active:shadow-[0px_0px_0px_rgba(0,0,0,0.3)] transition-all rounded-xl px-4 py-2 u-font-sarasvati text-lg u-text-white '
								to={"/secret-dashboard"}
							>
								<span className='hidden sm:inline u-text-white'>Dashboard</span>
							</Link>
						)}

						{user ? (
							<Link
								to={'/profile'}
								className='flex flex-row items-center u-bg-primary shadow-[0px_4px_0px_rgba(0,0,0,0.3)] active:translate-y-[4px] active:shadow-[0px_0px_0px_rgba(0,0,0,0.3)] transition-all rounded-xl px-4 py-2 u-font-sarasvati text-lg u-text-white '
							>
								<LucideUser className="fill-white stroke-white" size={22} />
								<span className='hidden text-white sm:inline ml-2 pt-1'>{user.name.split(" ")[0]}</span>
							</Link>

						) : (
							<>
								<Link
									to={"/signup"}
									className='flex flex-row items-center u-bg-accent shadow-[0px_4px_0px_rgba(0,0,0,0.3)] active:translate-y-[4px] active:shadow-[0px_0px_0px_rgba(0,0,0,0.3)] transition-all rounded-xl px-4 py-2 u-font-sarasvati text-lg u-text-white'
								>
									<UserPlus className='mr-2 stroke-white' size={22} />
									Sign Up
								</Link>
								<Link
									to={"/login"}
									className='flex flex-row items-center u-bg-tertiary shadow-[0px_4px_0px_rgba(0,0,0,0.3)] active:translate-y-[4px] active:shadow-[0px_0px_0px_rgba(0,0,0,0.3)] transition-all rounded-xl px-4 py-2 u-font-sarasvati text-lg u-text-white'
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
