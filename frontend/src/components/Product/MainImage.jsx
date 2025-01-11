import { Fragment, useState } from 'react';

const MainImage = ({ src }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    return (
        <Fragment>
            {!imageLoaded && <div className="skeleton mx-8 aspect-square u-border-accent"></div>}
            <div className="w-full h-full u-bg-white ps-2 lg:px-8">
                <img
                    src={src}
                    alt="product image"
                    className={`${imageLoaded ? 'block w-full' : 'hidden'} rounded-[25px] aspect-square u-border-accent`}
                    onLoad={() => setImageLoaded(true)} />
            </div>
        </Fragment>
    )
}

export default MainImage;
