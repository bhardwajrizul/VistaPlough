import { Fragment, useState } from 'react'

import MiniImage from './MiniImage';
import MainImage from './MainImage';


const ImagePreview = ({ imagesURLs }) => {


    const [selectedImage, setSelectedImage] = useState(imagesURLs[0]);

    const renderMiniImages = (imagesURLs) => {
        const renderedImages = imagesURLs.map((imageURL) => {
            return (
                <div className={`w-full mb-2 relative z-10 ${selectedImage === imageURL && 'scale-[95%] focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition duration-150 ease-in-out'}`} key={imageURL}>
                    {
                        selectedImage === imageURL && 
                        <div className={`absolute top-0 rounded-[10px] left-0 w-full h-full u-bg-black w-full h-full z-10 ${selectedImage === imageURL ? 'opacity-50' : 'opacity-0 z-0'} `} />
                    }
                    <MiniImage src={imageURL} updateSelectedImage={setSelectedImage} />
                </div>
            )
        })
        return renderedImages;
    }

    return (
        <Fragment>
            <div className="images-mini-preview-container basis-[18%] flex flex-col px-0 h-full u-bg-white">
                {renderMiniImages(imagesURLs)}
            </div>
            <div className="image-main-container flex-1">
                <MainImage src={selectedImage} />
            </div>
        </Fragment>
    )
}

export default ImagePreview;