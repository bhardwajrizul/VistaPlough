import { useEffect } from "react";
import { useParams } from "react-router";
import { useProductStore } from "../stores/useProductStore";

import Product from "../components/Product/Product";

const ProductPage = () => {

    const { pid } = useParams();
    const { product, fetchProductById, loading } = useProductStore();

    useEffect(() => {
        fetchProductById(pid);
    }, [fetchProductById, pid]);


    const skeleton = (
        <div className="flex flex-col gap-4 flex-row items-center justify-center my-10">
            <div className="relative flex items-center justify-center">
                <div className='w-20 h-20 border-yellow-500 border-t-2 animate-spin rounded-full abolsute top-0 left-0' />
            </div>
            <h1 className="text-center text-lg u-font-sarasvati col-span-3 py-10">
                Great Choice...
            </h1>
        </div>
    )

    if (loading || !product) return skeleton;

    return (
        <div className="w-[95%] lg:w-[85%] mx-auto my-10">
            <Product productData={product} />
        </div>
    )
}

export default ProductPage;