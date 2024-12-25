
const LoadingSpinner = () => {
	return (
		<div className='flex items-center justify-center min-h-screen u-bg-secondary'>
			<div className='relative flex flex-col items-center justify-center'>
				<div className="relative flex items-center justify-center">
					<div className='w-20 h-20 border-yellow-300 border-2 rounded-full absolute top-0 left-0' />
					<div className='w-20 h-20 border-yellow-500 border-t-2 animate-spin rounded-full abolsute top-0 left-0' />
				</div>
				<div className='text-center u-font-wasted text-2xl mt-4'>Loading...</div>
				<a href='/'
				className='u-bg-accent mt-8 shadow-[0px_4px_0px_rgba(0,0,0,0.3)] active:translate-y-[4px] active:shadow-[0px_0px_0px_rgba(0,0,0,0.3)] transition-all rounded-xl px-8 py-3 u-font-sarasvati text-2xl u-text-white '				
				>
					Back to Home
				</a>
			</div>
		</div>
	);
};

export default LoadingSpinner;
