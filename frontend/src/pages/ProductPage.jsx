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
        <div className="flex gap-4 flex-row items-center justify-center my-10">
            <div className="flex w-[85%] flex-col gap-4">
                <div className="skeleton h-[90vh] w-full"></div>
            </div>
        </div>
    )

    if (loading || !product) return skeleton;

    return (
        <div className="w-[85%] mx-auto my-10">
            <Product productData={product} />
        </div>
    )
}

export default ProductPage;