import React, { useState } from 'react';
import { Image } from 'antd';

const ImageGridGallery = ({ images }) => {
    const [visible, setVisible] = useState(false);

    const displayImages = images.slice(0, 4);
    const remainingCount = Math.max(0, images.length - 4);

    const handleImageClick = (index) => {
        setVisible(true);
    };

    return (
        <div className="w-full mb-6">
            <div className="flex flex-row relative gap-4 h-fit justify-center">
                <div className="flex flex-col relative w-2/3 gap-4">
                    <img
                        src={displayImages[0]}
                        alt="Main view"
                        className="w-full h-100 object-cover rounded-lg cursor-pointer"
                        onClick={() => handleImageClick(0)}
                    />
                     <img
                        src={displayImages[1]}
                        alt="Main view"
                        className="w-full h-100 object-cover rounded-lg cursor-pointer"
                        onClick={() => handleImageClick(1)}
                    />
                </div>

                <div className="flex flex-col justify-between">
                    {displayImages.slice(1, 4).map((image, index) => (
                        <div key={index} className="relative h-65">
                            <img
                                src={image}
                                alt={`View ${index + 2}`}
                                className={`w-full h-65 object-cover cursor-pointer ${index === 0 ? 'rounded-lg' : ''
                                    } ${index === displayImages.length - 2 ? 'rounded-lg' : ''}`}
                                onClick={() => handleImageClick(index + 1)}
                            />
                            {index === 2 && remainingCount > 0 && (
                                <div
                                    className="absolute inset-0 flex items-center justify-center cursor-pointer rounded-lg"
                                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                                    onClick={() => handleImageClick(index + 1)}
                                >

                                    <span className="text-white text-xl font-semibold">
                                        +{remainingCount}
                                    </span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Image preview */}
            <div style={{ display: 'none' }}>
                <Image.PreviewGroup
                    preview={{
                        visible,
                        onVisibleChange: (vis) => setVisible(vis),
                    }}
                >
                    {images.map((image, index) => (
                        <Image
                            key={index}
                            src={image}
                            alt={`Room view ${index + 1}`}
                            onClick={() => handleImageClick(index)}
                        />
                    ))}
                </Image.PreviewGroup>
            </div>

        </div>
    );
};

export default ImageGridGallery;
