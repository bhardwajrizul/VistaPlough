
import ArrowRight from "../assets/Images/arrow-right.svg";
import TwigWithLeaves from "../assets/Images/red-twig-with-leaves.svg";
import JaggeryImages from "../assets/Images/Rotating Images Frame.svg";
import { Link } from "react-router-dom";

const Hero = () => {
    return (
        <div id='hero' className='w-[85%] min-h-[70vh] h-96 u-bg-white u-box-shadow mx-auto overflow-hidden mt-8 rounded-[25px] u-border-accent flex flex-row relative shadow-[0px_2px_4px_rgba(0,0,0,0.25)] '>
            <div id='hero-left' className='w-[60%] h-full flex flex-col items-start justify-around p-10 gap-0'>
                <h1 className='u-font-sarasvati text-4xl u-text-shadow'>
                    Welcome to&nbsp;
                    <span className='underline u-text-accent'>
                        Vista Plough Pvt. Ltd.
                    </span>
                </h1>
                <p className='u-font-itangiuh text-xl text-slate-600 '>
                    At Vista Plough, we bring you the essence of tradition wrapped in purity and care. Our&nbsp;
                    <span className='u-text-tertiary'>
                        pure Jaggery&nbsp;
                    </span>
                    and other traditional delicacies, are homemade with love and crafted to perfection.
                </p>
                <Link
                    to='/products'
                    className='u-bg-accent shadow-[0px_4px_0px_rgba(0,0,0,0.3)] active:translate-y-[4px] active:shadow-[0px_0px_0px_rgba(0,0,0,0.3)] transition-all rounded-xl px-8 py-3 u-font-sarasvati text-2xl u-text-white '
                    >
                    Show Products <span>
                        <img src={ArrowRight} alt='arrow-right' className='inline-block w-4 ms-2' />
                    </span>
                </Link>
            </div>
            <img src={TwigWithLeaves} alt="Decoration" className='absolute w-72 left-[55%] bottom-0 -translate-x-1/2 z-10' />
            <div id='hero-right' className='w-[40%] h-full relative overflow-hidden'>
                <img className='jaggery-image'
                    src={JaggeryImages}
                    alt="Jaggery Images" />
            </div>
        </div>
    );
}

export default Hero;