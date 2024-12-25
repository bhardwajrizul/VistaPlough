
import MetaLogo from '../assets/Images/meta.svg'
import YoutubeLogo from '../assets/Images/youtube.svg'
import TwitterLogo from '../assets/Images/twitter.svg'
import LinkedInLogo from '../assets/Images/linkedin.svg'
import InstaLogo from '../assets/Images/insta.svg'
import LogoFull from '../assets/Images/logo-full.svg'

const Footer= () => {
    return (
        <footer className='u-bg-white mt-10 w-[85%] mx-auto my-4 rounded-[25px] u-border-accent min-h-40 py-5 u-box-shadow'>
            <div className='flex flex-col items-center justify-between gap-5'   >
                <div className='flex flex-row w-full px-4 items-start justify-around gap-5'>
                    <div className='flex flex-col items-center justify-center gap-2'>
                        <p className='u-font-sarasvati text-xl u-text-accent'>
                            Follow Us
                        </p>
                        <a className='u-font-wasted hover:underline text-sm cursor-pointer text-slate-600'>
                            Meta | Facebook
                            <span>
                                <img src={MetaLogo} alt="Meta Logo" className='w-5 ms-1 inline-block' />
                            </span>
                        </a>
                        <a className='u-font-wasted hover:underline text-sm cursor-pointer text-slate-600'>
                            YouTube
                            <span>
                                <img src={YoutubeLogo} alt="Youtube Logo" className='w-5 ms-1 inline-block' />
                            </span>
                        </a>
                        <a className='u-font-wasted hover:underline text-sm cursor-pointer text-slate-600'>
                            Twitter
                            <span>
                                <img src={TwitterLogo} alt="Twitter Logo" className='w-5 ms-1 inline-block' />
                            </span>
                        </a>
                        <a className='u-font-wasted hover:underline text-sm cursor-pointer text-slate-600'>
                            LinkedIn
                            <span>
                                <img src={LinkedInLogo} alt="LinkedIn Logo" className='w-6 ms-1 inline-block' />
                            </span>
                        </a>
                        <a className='u-font-wasted hover:underline text-sm cursor-pointer text-slate-600'>
                            Instagram
                            <span>
                                <img src={InstaLogo} alt="Instagram Logo" className='w-5 ms-1 inline-block' />
                            </span>
                        </a>
                    </div>
                    <div className='flex flex-col items-center justify-center gap-2'>
                        <p className='u-font-sarasvati text-xl u-text-accent'>
                            Support
                        </p>
                        <a className='u-font-wasted hover:underline text-sm cursor-pointer text-slate-600'>
                            Contact Us
                        </a>
                        <a className='u-font-wasted hover:underline text-sm cursor-pointer text-slate-600'>
                            FAQ
                        </a>
                    </div>
                    <div className='flex flex-col items-center justify-center gap-2'>
                        <p className='u-font-sarasvati text-xl u-text-accent'>
                            Corporate
                        </p>
                        <a className='u-font-wasted hover:underline text-sm cursor-pointer text-slate-600'>
                            About Us
                        </a>
                    </div>
                    <div className='flex flex-col items-center justify-center gap-2'>
                        <p className='u-font-sarasvati text-xl u-text-accent'>
                            Policies
                        </p>
                        <a className='u-font-wasted hover:underline text-sm cursor-pointer text-slate-600'>
                            Shipping Policy
                        </a>
                        <a className='u-font-wasted hover:underline text-sm cursor-pointer text-slate-600'>
                            Return and Cancellation
                        </a>
                        <a className='u-font-wasted hover:underline text-sm cursor-pointer text-slate-600'>
                            Privacy Policy
                        </a>
                        <a className='u-font-wasted hover:underline text-sm cursor-pointer text-slate-600'>
                            Terms and Conditions
                        </a>
                    </div>

                    <img src={LogoFull} alt="Company Logo" className='w-32 scale-150' />
                </div>

                <p className='u-font-wasted text-xs text-center u-text-black'>
                    © 2024 Vista Plough Pvt. Ltd. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;