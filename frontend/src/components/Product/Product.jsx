import { motion } from "framer-motion";

import { useUserStore } from "../../stores/useUserStore";
import { useCartStore } from "../../stores/useCartStore";

import ImagePreview from "./ImagePreview";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const Product = ({ productData }) => {

    const { user } = useUserStore();
    const { addToCart } = useCartStore();

    const formatter = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
    });

    return (
        <motion.div
            className="w-full relative u-bg-white rounded-[25px] p-4 u-border-accent u-box-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
        >


            <div className="w-full relative flex flex-col lg:flex-row justify-around items-start pb-4 lg:py-4 flex-warp">
                <div className="sticky top-0 images-container basis-[55%] py-4 flex flex-row justify-center items-start">
                    <ImagePreview imagesURLs={productData.images} />
                </div>
                <div className="product-details-container rounded-[25px] py-10 u-border-accent u-box-shadow lg:basis-[45%] u-bg-secondary px-10 mt-4"> 
                    <div className="buy-now-parent flex flex-col">
                        <div className="flex flex-row justify-start gap-4 items-center">
                            <h1 className="u-font-secondary text-3xl mb-2 mt-2 u-text-accent u-text-shadow text-start">
                                {productData.name}
                            </h1>
                        </div>

                        <div className="flex flex-row justify-start gap-4 mt-2 items-center">

                            <p className="u-font-wasted text-2xl text-tertiary">
                                {formatter.format(Math.floor(productData.price - (productData.price * (productData.discount / 100)) + 1))}
                            </p>
                            <p className="u-font-wasted text-lg text-slate-600 line-through">
                                {formatter.format(Math.floor(productData.price + 1))}
                            </p>

                            <div className="u-bg-tertiary text-xs u-font-itangiuh text-white u-border-accent px-2 py-2   rounded-full">
                                <span className="u-font-wasted text-xs text-white">
                                    Save&nbsp;
                                </span>
                                {productData.discount}%
                            </div>
                        </div>
                        <p className="u-font-wasted text-xs text-slate-600">
                            MRP (Incl. of all taxes)
                        </p>
                        <div>
                            <h2 className="u-font-itangiuh text-2xl text-start mt-4 u-text-accent">
                                About this item
                            </h2>
                            <p className="u-font-wasted text-xl text-start text-slate-600">
                                {productData.description}
                            </p>
                        </div>
                    </div>
                    <div className="buy-now-container-sticky mt-4 w-full flex flex-row justify-center items-center">
                        {
                            !user &&
                            <Link
                                to='/login'
                                className='flex w-full flex-row text-center justify-center items-center u-bg-black shadow-[0px_4px_0px_rgba(0,0,0,0.3)] active:translate-y-[4px] active:shadow-[0px_0px_0px_rgba(0,0,0,0.3)] transition-all rounded-xl px-4 py-2 u-font-sarasvati text-lg u-text-white'
                            >
                                <ShoppingBag className='mr-2 stroke-white' size={20} />
                                Please login to continue
                            </Link>
                        }
                        {
                            user &&
                            <button
                                onClick={() => addToCart(productData)}
                                className='flex flex-row text-center w-full justify-center items-center u-bg-tertiary shadow-[0px_4px_0px_rgba(0,0,0,0.3)] active:translate-y-[4px] active:shadow-[0px_0px_0px_rgba(0,0,0,0.3)] transition-all rounded-xl px-4 py-2 u-font-sarasvati text-lg u-text-white'
                            >
                                <ShoppingBag className='mr-2 stroke-white' size={22} />
                                Add to Cart
                            </button>
                        }
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default Product;