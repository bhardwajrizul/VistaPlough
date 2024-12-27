import BorderTop from '../assets/Images/border-top.svg';
import BorderBottom from '../assets/Images/border-bottom.svg'
import ArrowRight from '../assets/Images/arrow-right.svg'
import Bee from '../assets/Images/bee.svg'
import Flower from '../assets/Images/flower.svg'
import Heart from '../assets/Images/heart.svg'
import WillowBranch from '../assets/Images/willow branch.svg'
import PurpleTwig from '../assets/Images/purple twig.svg'

import { Link } from 'react-router-dom';

const Promise = () => {
    return (
        <div id='promise' className='mt-0 py-12 w-[85%] mx-auto min-h-lvh flex flex-col items-center justify-between gap-5'>
            <div id='promise-heading' className='w-full h-fit px-2 py-1 bg-white rounded-[15px] u-border-accent flex flex-col items-center justify-center shadow-[0px_2px_4px_rgba(0,0,0,0.25)] '>
                <img src={BorderTop} alt="Decoration Border Top" />
                <h1 className='u-font-sarasvati text-4xl u-text-accent u-text-shadow my-[-10px]'>Our Promise</h1>
                <img src={BorderBottom} alt="Decoration Border Bottom" />
            </div>
            <div id='promise-section' className=' overflow-hidden relative bg-white w-full h-fit rounded-[15px] u-border-accent py-10 flex flex-col items-center justify-between shadow-[0px_2px_4px_rgba(0,0,0,0.25)]'>
                <div id='cards-container' className='mb-10 w-[85%] grow flex flex-col justify-around gap-5'>
                    <div className='flex flex-row gap-5 justify-center items-stretch'>
                        <div id='card-1' className='u-bg-secondary rounded-[15px] flex-1 flex flex-col justify-center items-center gap-1 p-4 py-5 u-border-accent shadow-[0px_2px_0px_rgba(0,0,0,0.3)] hover:translate-y-[-2px] hover:shadow-[0px_4px_0px_rgba(0,0,0,0.3)] transition-all'>
                            <img src={Bee} alt="Pure and natural image" className='w-16' />
                            <h2 className='u-font-sarasvati font-bold  text-3xl u-text-accent u-text-shadow'>
                                Pure and Natural
                            </h2>
                            <p className='u-font-itangiuh font-bold text-xl px-3 text-center u-text-accent u-text-shadow'>

                                Free from chemicals and additives. <br></br> It embodies the richness of nature.
                            </p>
                        </div>
                    </div>
                    <div className='flex flex-row gap-5 justify-center items-stretch'>
                        <div id='card-2' className='u-bg-secondary rounded-[15px] flex-1 flex flex-col justify-center items-center gap-1 p-4 py-5 u-border-accent shadow-[0px_2px_0px_rgba(0,0,0,0.3)] hover:translate-y-[-2px] hover:shadow-[0px_4px_0px_rgba(0,0,0,0.3)] transition-all'>
                            <img src={Flower} alt="Homemade Goodness Image" className='w-12' />
                            <h2 className='font-bold  u-font-sarasvati text-3xl u-text-tertiary u-text-shadow'>
                                Homemade Goodness
                            </h2>
                            <p className='u-font-itangiuh font-bold text-xl px-3 text-center u-text-tertiary u-text-shadow'>
                                Each item is lovingly prepared using <br></br> traditional methods to ensure authenticity.
                            </p>
                        </div>
                    </div>
                    <div className='flex flex-row gap-5 justify-center items-stretch'>
                        <div id='card-3' className='u-bg-secondary rounded-[15px] flex-1 flex flex-col justify-center items-center gap-1 p-4 py-5 u-border-accent shadow-[0px_2px_0px_rgba(0,0,0,0.3)] hover:translate-y-[-2px] hover:shadow-[0px_4px_0px_rgba(0,0,0,0.3)] transition-all'>
                            <img src={Heart} alt="Healthy and Delicious Image" className='w-12' />
                            <h2 className='font-bold  u-font-sarasvati text-3xl u-text-primary u-text-shadow'>
                                Healthy and Delicious
                            </h2>
                            <p className='u-font-itangiuh font-bold  text-xl px-3 text-center u-text-primary u-text-shadow'>
                                Packed with nutrients and flavor. <br></br> Our product is perfect for every household.
                            </p>
                        </div>
                    </div>
                </div>
                <div id='heading-with-btn' className='w-[85%] h-20 u-bg-secondary rounded-[15px] flex flex-row justify-around u-border-accent items-center gap-5 px-6 py-12 shadow-[0px_2px_0px_rgba(0,0,0,0.3)]'>
                    <p className='u-font-itangiuh text-md text-center text-slate-600 u-text-shadow'>
                        We are committed to delivering health, heritage, and happiness to your doorstep.  With Vista Plough, you {"don't"} just buy a product—you embrace a tradition.

                    </p>
                    <Link
                        to='/products'
                        className='u-bg-tertiary shadow-[0px_4px_0px_rgba(0,0,0,0.3)] active:translate-y-[4px] active:shadow-[0px_0px_0px_rgba(0,0,0,0.3)] transition-all rounded-xl px-4 py-2 u-font-sarasvati text-lg u-text-white whitespace-nowrap'>
                        Visit Shop <span>
                            <img src={ArrowRight} alt='arrow-right' className='inline-block w-3 me-2' />
                        </span>
                    </Link>
                </div>
                <img className='absolute start-0 w-36 bottom-0' src={WillowBranch} alt="Decoraion Image" />
                <img className='absolute end-0 w-36 top-0 skew-180' src={PurpleTwig} alt="Decoraion Image" />

            </div>
        </div>
    )
}

export default Promise;