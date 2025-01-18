import { useState } from 'react'
import { motion } from "framer-motion";

import { Flame } from 'lucide-react';

import ProductBorderTop from '../assets/Images/product-border-top.svg'

import { useUserStore } from '../stores/useUserStore';
import { useCartStore } from '../stores/useCartStore';

import { Link } from 'react-router-dom';

const ProductOverviewCard = ({ product }) => {
    const [imageloaded, setImageLoaded] = useState(false);

    const { user } = useUserStore();
    const { addToCart } = useCartStore();

    const formatter = new Intl.NumberFormat('en-IN', {style: 'currency', currency: 'INR'});

    return (
        <motion.div
            id='product-card--container'
            className='mb-4 height-full flex flex-col items-stretch justify-between'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
        >

            <img className='w-full mb-4' src={ProductBorderTop} alt="Decoration Top Border" />
            {!imageloaded && <div className="skeleton aspect-square w-[85%] mx-auto u-border-accent"></div>}
            <div className='relative w-full image-elements-container'>
                <div
                    className='w-full relative image-container'>
                    <Link to={`/products/${product._id}`}>
                        <img
                            className={`${imageloaded ? 'block w-[85%] cursor-pointer' : 'hidden'}  relative mx-auto relative aspect-square u-border-accent rounded-[15px]`}
                            src={product.images[0]}
                            alt={product.name}
                            onLoad={() => setImageLoaded(true)} />
                    </Link>
                </div>
                {
                    imageloaded &&
                    <div className='absolute top-5 left-10 u-bg-tertiary py-1 px-3 rounded-full u-border-accent u-text-white u-font-itangiuh text-xs'>
                        {product.discount}% off
                    </div>
                }
                {
                    product.isFeatured &&
                    <div className='absolute top-4 right-10 z-10 rounded-full  text-xs u-bg-tertiary p-1 u-border-accent'>
                        <Flame className='inline-block ms-1 fill-red-700 stroke-orange-600' size={20} />
                    </div>
                }
            </div>
            <Link to={`/products/${product._id}`}>
                <h2 className='u-font-sarasvati u-font-sb text-start mt-4 mx-8 text-2xl u-text-black'>{product.name}</h2>
            </Link>
            <div className='flex flex-row justify-between items-end w-full'>
                <div className='ms-8 flex flex-col justify-start w-full'>
                    <p className='mt-2 u-font-wasted text-lg text-slate-600 line-through'>{formatter.format(product.price + 1)}</p>
                    <p className='u-font-wasted text-xl text-tertiary'>{formatter.format(product.price - (product.price * (product.discount / 100)))}</p>
                </div>
                {
                    product.stock
                        ? (
                            user ? (
                                <button
                                    onClick={() => addToCart(product)}
                                    className='h-fit u-bg-green shadow-[0px_4px_0px_rgba(0,0,0,0.3)] active:translate-y-[4px] active:shadow-[0px_0px_0px_rgba(0,0,0,0.3)] transition-all rounded-xl me-8 px-4 py-2 u-font-secondary text-sm u-text-white whitespace-nowrap'>
                                    Add to Cart
                                </button>
                            ) : (
                                <Link to={`/products/${product._id}`} className='h-fit u-bg-green shadow-[0px_4px_0px_rgba(0,0,0,0.3)] active:translate-y-[4px] active:shadow-[0px_0px_0px_rgba(0,0,0,0.3)] transition-all rounded-xl me-8 px-4 py-2 u-font-secondary text-sm u-text-white whitespace-nowrap'>
                                    Show More
                                </Link>
                            )
                        ) : (
                            <p className='u-font-wasted text-xl text-red-500'>Out of Stock</p>
                        )
                }

            </div>

            <img
                src={ProductBorderTop}
                className='rotate-180 w-full mt-4'
                alt="Decoration Bottom Border" />
        </motion.div>
    )
}

export default ProductOverviewCard;
