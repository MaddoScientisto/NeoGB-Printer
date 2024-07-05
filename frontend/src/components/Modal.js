import React, { useEffect, useRef } from 'react'
import Button from './Button';

function Modal({ image, onClose, onDelete }) {
	
	const canvasRef = useRef(null);
	
	useEffect(() => {
		if (image && canvasRef.current) {
			const ctx = canvasRef.current.getContext('2d');
			ctx.imageSmoothingEnabled = false;
			
			const img = new Image();
			img.src = `thumb/${image.ImageName}.png`;
			img.onload = () => {
				// const aspectRatio = img.width / img.height;
				// const modalContent = canvasRef.current.parentElement;
				// const maxHeight = modalContent.clientHeight * 0.8; // 80% of the modal content height
				// const maxWidth = modalContent.clientWidth * 0.8; // 80% of the modal content width
				//
				// let canvasWidth, canvasHeight;
				//
				// if (aspectRatio > 1) {
				// 	// Landscape orientation
				// 	canvasWidth = Math.min(img.width, maxWidth);
				// 	canvasHeight = canvasWidth / aspectRatio;
				// } else {
				// 	// Portrait or square orientation
				// 	canvasHeight = Math.min(img.height, maxHeight);
				// 	canvasWidth = canvasHeight * aspectRatio;
				// }
				//
				// canvasRef.current.width = img.width;
				// canvasRef.current.height = img.height;
				// canvasRef.current.style.width = `${canvasWidth}px`;
				// canvasRef.current.style.height = `${canvasHeight}px`;
				//
				// ctx.clearRect(0, 0, img.width, img.height);
				// ctx.drawImage(img, 0, 0, img.width, img.height);
				canvasRef.current.width = img.width;
				canvasRef.current.height = img.height;
				ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
				ctx.drawImage(img, 0, 0);
			};
		}
	}, [image]);
	
	
	return (
		<div id="myModal" className="modal" >
			<span className="close" onClick={onClose}>×</span>
			<canvas ref={canvasRef} id="modalContent" className="gallery__canvas"></canvas>
			<div id="caption">
				{image.bmp === 1 && <Button text="BMP" href={`download/${image.ImageName}.bmp`} download={`${image.ImageName}.bmp`} />}
				{image.png === 1 && <Button text="PNG" href={`download/${image.ImageName}.png`} download={`${image.ImageName}.png`} />}
				<Button text="Delete" onClick={() => onDelete(image.ImageName)} className="button-red" />
			</div>
		</div>
	);
}

export default Modal;
