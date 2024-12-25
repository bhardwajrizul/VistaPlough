import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import ProductOverviewCard from "./ProductOverviewCard";

import BorderTop from '../assets/Images/border-top.svg';
import BorderBottom from '../assets/Images/border-bottom.svg';

const FeaturedProducts = ({ featuredProducts }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [itemsPerPage, setItemsPerPage] = useState(3);


	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 640) setItemsPerPage(1);
			else if (window.innerWidth < 1024) setItemsPerPage(2);
			else setItemsPerPage(3);
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const nextSlide = () => {
		setCurrentIndex((prevIndex) => prevIndex + itemsPerPage);
	};

	const prevSlide = () => {
		setCurrentIndex((prevIndex) => prevIndex - itemsPerPage);
	};

	const isStartDisabled = currentIndex === 0;
	const isEndDisabled = currentIndex >= featuredProducts.length - itemsPerPage;

	return (
		<div className='w-[85%] mx-auto py-3'>
			<div className='container'>
				<div id='promise-heading' className='w-full h-fit px-2 py-1 bg-white rounded-[25px] u-border-accent flex flex-col items-center justify-center shadow-[0px_2px_4px_rgba(0,0,0,0.25)] '>
					<img src={BorderTop} alt="Decoration Border Top" />
					<h1 className='u-font-sarasvati text-4xl u-text-accent u-text-shadow my-[-10px]'>Featured Products</h1>
					<img src={BorderBottom} alt="Decoration Border Bottom" />
				</div>
				<div className='relative u-bg-white pt-8 mt-8 u-border-accent rounded-[25px] u-box-shadow'>
					<div className='overflow-hidden'>
						<div
							className='flex transition-transform duration-300 ease-in-out'
							style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
						>
							{
								featuredProducts?.map((product) => (
									<div key={product._id} className={`w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-2`}>
										<ProductOverviewCard product={product} />
									</div>
								))
							}
						</div>
					</div>
					<button
						onClick={prevSlide}
						disabled={isStartDisabled}
						className={`absolute top-1/2 -left-4 transform -translate-y-1/2 p-2 rounded-full transition-colors duration-300 ${isStartDisabled ? "bg-gray-400 cursor-not-allowed" : "u-bg-accent hover:u-bg-accent-light"
							}`}
					>
						<ChevronLeft className='w-6 h-6' />
					</button>

					<button
						onClick={nextSlide}
						disabled={isEndDisabled}
						className={`absolute top-1/2 -right-4 transform -translate-y-1/2 p-2 rounded-full transition-colors duration-300 ${isEndDisabled ? "bg-gray-400 cursor-not-allowed" : "u-bg-accent hover:u-bg-accent-light"
							}`}
					>
						<ChevronRight className='w-6 h-6' />
					</button>
				</div>
			</div>
		</div>
	);
};
export default FeaturedProducts;
