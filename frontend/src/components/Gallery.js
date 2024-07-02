import React from 'react';
import ImageItem from './ImageItem';

function Gallery({ images, onImageClick }) {
	return (
		<div className="gallery">
			{images && images.length > 0 && images.map((image, index) => (
				<ImageItem key={index} image={image} onClick={() => onImageClick(image)} />
			))}
		</div>
	);
}

export default Gallery;
