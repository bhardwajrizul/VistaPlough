import { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";


import Hero from "../components/Hero";
import Promise from "../components/Promise";

// import CategoryItem from "../components/CategoryItem";
// const categories = [
// 	{ href: "/jeans", name: "Jeans", imageUrl: "/jeans.jpg" },
// 	{ href: "/t-shirts", name: "T-shirts", imageUrl: "/tshirts.jpg" },
// 	{ href: "/shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
// 	{ href: "/glasses", name: "Glasses", imageUrl: "/glasses.png" },
// 	{ href: "/jackets", name: "Jackets", imageUrl: "/jackets.jpg" },
// 	{ href: "/suits", name: "Suits", imageUrl: "/suits.jpg" },
// 	{ href: "/bags", name: "Bags", imageUrl: "/bags.jpg" },
// ];

const HomePage = () => {


	const { fetchFeaturedProducts, products, isLoading } = useProductStore();

	useEffect(() => {
		fetchFeaturedProducts();
	}, [fetchFeaturedProducts]);

	return (
		<div className='relative min-h-screen text-white overflow-hidden'>
			<div className='relative z-10 max-w-7xl mx-auto'>
				<Hero />
				<Promise />

				{!isLoading && products.length > 0 && <FeaturedProducts featuredProducts={products} />}
			</div>
		</div>
	);
};
export default HomePage;
