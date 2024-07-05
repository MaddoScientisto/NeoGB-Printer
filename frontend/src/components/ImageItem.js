import React from 'react';

function ImageItem({ image, onClick, onColorClick, selectedColors }) {
	const isHighlighted = (color) =>
		selectedColors[color] === image.ImageName;
	
	return (
		<figure className="gallery__item" id={`Content${image.ImageName}`}>
			<img
				src={`thumb/${image.ImageName}.png`}
				className="gallery__img"
				alt={image.ImageName}
				onClick={onClick}
			/>
			<div className="preview_caption">{image.ImageName}
				<div className="button-group">
					{['Red', 'Green', 'Blue'].map(color => (
						<button
							key={color}
							className={`color-button ${color.toLowerCase()}-button ${isHighlighted(color) ? 'highlighted' : ''}`}
							onClick={() => onColorClick(image.ImageName, color)}
						>
							{color.substring(0,1)}
						</button>
					))}
				</div>
			</div>
		</figure>
	);
}

export default ImageItem;
