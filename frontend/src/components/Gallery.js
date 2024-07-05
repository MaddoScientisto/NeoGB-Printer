import React, { useState } from 'react'
import ImageItem from './ImageItem';
import MergedCanvas from './MergedCanvas';

function Gallery({ images, onImageClick, selectedColors, setSelectedColors }) {
	
	const handleColorClick = (imageName, color) => {
		setSelectedColors(prevState => {
			const newState = { ...prevState };
			if (newState[color] === imageName) {
				newState[color] = null;
			} else {
				newState[color] = imageName;
			}
			return newState;
		});
	};
	
	return (
		<div className="gallery">
			{images && images.length > 0 && images.map((image, index) => (
				<ImageItem key={index}
									 image={image}
									 onClick={() => onImageClick(image)}
									 onColorClick={handleColorClick}
									 selectedColors={selectedColors}
				/>
			))}
			
		</div>
	);
}

export default Gallery;
