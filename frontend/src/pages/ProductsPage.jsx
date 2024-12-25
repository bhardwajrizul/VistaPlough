import { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";

import ProductOverviewCard from "../components/ProductOverviewCard";

const ProductsPage = () => {

    const { fetchAllProducts, products, loading } = useProductStore();

    useEffect(() => {
        fetchAllProducts();
    }, [fetchAllProducts]);

    const renderProducts = products.map((product) => (
        <ProductOverviewCard key={product._id} product={product} />
    ));

    const renderSkeleton = Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className='skeleton w-72 my-4 px-1 h-96 u-border-accent'></div>
    ));

    return (
        <div className="grid grid-cols-3 w-[85%] u-bg-white u-border-accent rounded-[25px] mx-auto gap-4 mt-10 justify-items-center">
            {
                loading
                    ? renderSkeleton
                    : renderProducts
            }
        </div>
    );
}

export default ProductsPage;