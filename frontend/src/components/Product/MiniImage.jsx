import { Fragment, useState } from "react";



const MiniImage = ({ src, updateSelectedImage } ) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <Fragment>
            {!imageLoaded && <div className="skeleton aspect-square w-full u-border-accent"></div>}
            <img
                src={src}
                alt="product image"
                onClick={() => updateSelectedImage(src)}
                className={`${imageLoaded ? 'block w-full' : 'hidden'} u-border-accent rounded-[10px] aspect-square  cursor-pointer `}
                onLoad={() => setImageLoaded(true)} />
        </Fragment>
    )
}

export default MiniImage;