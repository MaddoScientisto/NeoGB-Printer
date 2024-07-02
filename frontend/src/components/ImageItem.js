import React from 'react';

function ImageItem({ image, onClick }) {
	return (
		<figure className="gallery__item" id={`Content${image.ImageName}`}>
			<img
				src={`thumb/${image.ImageName}.png`}
				className="gallery__img"
				alt={image.ImageName}
				onClick={onClick}
			/>
			<div className="preview_caption">{image.ImageName}</div>
		</figure>
	);
}

export default ImageItem;
