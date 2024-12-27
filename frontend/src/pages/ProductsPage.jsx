import { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";

import { motion } from 'framer-motion';

import ProductOverviewCard from "../components/ProductOverviewCard";
import { useSearchParams, Link } from "react-router-dom";

const ProductsPage = () => {

    const [query] = useSearchParams();
    const searchQuery = query.get('s') || '';

    const { fetchAllProducts, products, loading } = useProductStore();

    useEffect(() => {
        fetchAllProducts(searchQuery);
    }, [fetchAllProducts, searchQuery]);

    const renderProducts = products.map((product) => (
        <ProductOverviewCard key={product._id} product={product} />
    ));

    const renderSkeleton = Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className='skeleton rounded-[10px] w-72 my-4 px-1 h-96 u-border-accent'></div>
    ));

    return (
        <div className="grid grid-cols-3 w-[85%] u-bg-white u-border-accent rounded-[15px] mx-auto gap-4 mt-10 justify-items-center">
            {
                loading
                    ? renderSkeleton
                    : renderProducts
            }
            {
                !loading && products.length === 0 && <div className='text-center text-lg u-font-sarasvati col-span-3 py-10'>
                    <motion.h1
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: .5, delay: 0.1 }}
                    >
                        No results found for {searchQuery}
                    </motion.h1>
                    <Link
                        to="/products"
                        className='u-text-white px-2 py-2 rounded-[10px] u-border-accent u-box-shadow  u-bg-accent  hover:u-text-primary-dark hover:u-font-bold'
                    >
                        See other products
                    </Link>
                </div>
            }
        </div>
    );
}

export default ProductsPage;