import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LogIn, Mail, Lock, ArrowRight, Loader } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { login, loading } = useUserStore();

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(email, password);
		login(email, password);
	};

	return (
		<div className='flex flex-col justify-center pt-2 sm:px-6 lg:px-8'>
			<motion.div
				className='sm:mx-auto sm:w-full sm:max-w-md'
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
			>
				<h2 className='mt-6 text-center text-3xl u-font-sarasvati u-text-accent u-text-shadow'>
				Login to your account</h2>
			</motion.div>

			<motion.div
				className='mt-8 sm:mx-auto sm:w-[95%] sm:max-w-md'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.2 }}
			>
				<div className='u-bg-white mx-auto w-[95%] u-box-shadow u-border-accent py-8 px-4 rounded-[25px] sm:px-10'>
					<form onSubmit={handleSubmit} className='space-y-6'>
						<div>
							<label htmlFor='email' className='block text-slate-600 text-xl u-font-wasted'>
								Email address
							</label>
							<div className='relative rounded-[25px]'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<Mail className='h-5 w-5 text-gray-400' aria-hidden='true' />
								</div>
								<input
									id='email'
									type='email'
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className='block u-font-wasted w-full px-3 py-2 pl-10 u-bg-white u-border-accent border-gray-600 rounded-md shadow-sm
									 placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm'
									placeholder='you@example.com'
								/>
							</div>
						</div>

						<div>
							<label htmlFor='password' className='block text-slate-600 text-xl u-font-wasted'>
								Password
							</label>
							<div className='relative rounded-[25px]'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<Lock className='h-5 w-5 text-gray-400' aria-hidden='true' />
								</div>
								<input
									id='password'
									type='password'
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className='block u-font-wasted u-font-wasted w-full px-3 py-2 pl-10 u-bg-white u-border-accent border-gray-600 rounded-md shadow-sm
									 placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm'
									placeholder='••••••••••••••••'
								/>
							</div>
						</div>

						<button
							type='submit'
							className='u-bg-tertiary shadow-[0px_4px_0px_rgba(0,0,0,0.3)] active:translate-y-[4px] active:shadow-[0px_0px_0px_rgba(0,0,0,0.3)] transition-all rounded-xl px-8 py-2 u-font-secondary text-2xl u-text-white w-full flex justify-center items-center
							hover:u-bg-accent-light focus:outline-none focus:ring-2 focus:ring-offset-2
							focus:ring-purple-800 transition duration-150 ease-in-out disabled:opacity-50'
							disabled={loading}
						>
							{loading ? (
								<>
									<Loader className='mr-2 h-6 w-6 animate-spin' aria-hidden='true' />
									Loading...
								</>
							) : (
								<>
									<LogIn className='stroke-white mt-1 mr-2 h-6 w-6' aria-hidden='true' />
									Login
								</>
							)}
						</button>
					</form>

					<p className='mt-8 text-center text-md u-font-wasted text-slate-600'>
						Not a member?{" "}
						<Link to='/signup' className='font-medium u-text-black hover:text-slate-600 underline'>
							Sign up now <ArrowRight className='inline h-4 w-4' />
						</Link>
					</p>
				</div>
			</motion.div>
		</div>
	);
};
export default LoginPage;
