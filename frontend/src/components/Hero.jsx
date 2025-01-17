
import ArrowRight from "../assets/Images/arrow-right.svg";
import TwigWithLeaves from "../assets/Images/red-twig-with-leaves.svg";
import JaggeryImages from "../assets/Images/Rotating Images Frame.svg";
import { Link } from "react-router-dom";

const Hero = () => {
    return (
        <div id='hero' className='w-[95%] lg:w-[85%] h-auto lg:h-96 u-bg-white u-box-shadow mx-auto overflow-hidden mt-8 rounded-[15px] u-border-accent flex flex-row relative shadow-[0px_2px_4px_rgba(0,0,0,0.25)] '>
            <div id='hero-left' className='z-10 lg:w-[60%] lg:h-full flex flex-col lg:items-start lg:justify-around  py-10 px-2 lg:p-10 gap-8 lg:gap-0'>
                <h1 className='u-font-sarasvati lg:text-start text-center lg:text-4xl text-3xl u-text-shadow '>
                    Welcome to&nbsp;
                    <span className='underline block lg:inline-block u-text-accent'>
                        Vista Plough Pvt. Ltd.
                    </span>
                </h1>
                <p className='u-font-itangiuh text-xl text-slate-600 text-center lg:text-start'>
                    At Vista Plough, we bring you the essence of tradition wrapped in purity and care. Our&nbsp;
                    <span className='u-text-tertiary'>
                        pure Jaggery&nbsp;
                    </span>
                    and other traditional delicacies, are homemade with love and crafted to perfection.
                </p>
                <Link
                    to='/products'
                    className='u-bg-accent relative z-10 text-center shadow-[0px_4px_0px_rgba(0,0,0,0.3)] active:translate-y-[4px] active:shadow-[0px_0px_0px_rgba(0,0,0,0.3)] transition-all rounded-xl px-8 py-3 u-font-sarasvati text-2xl u-text-white '
                    >
                    Show Products <span>
                        <img src={ArrowRight} alt='arrow-right' className='inline-block w-4 ms-2' />
                    </span>
                </Link>
            </div>
            <img src={TwigWithLeaves} alt="Decoration" className='absolute w-16 lg:w-48 right-0 lg:left-[55%] bottom-0 -translate-x-1/2' />
            <div id='hero-right' className='relative lg:w-[40%] h-full overflow-hidden'>
                <img className='jaggery-image'
                    src={JaggeryImages}
                    alt="Jaggery Images" />
            </div>
        </div>
    );
}

export default Hero;