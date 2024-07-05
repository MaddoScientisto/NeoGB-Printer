import React, { useEffect, useRef } from 'react';

const mergeRGBChannels = ({ red, green, blue }) => {
	const width = red.width;
	const height = red.height;
	
	// Create new ImageData for the merged RGB
	const mergedImageData = new ImageData(width, height);
	
	for (let i = 0; i < red.data.length; i += 4) {
		// Extract the intensity from each color's ImageData and use it as the color value for that channel
		mergedImageData.data[i] = red.data[i]; // Red channel
		mergedImageData.data[i + 1] = green.data[i]; // Green channel
		mergedImageData.data[i + 2] = blue.data[i]; // Blue channel
		mergedImageData.data[i + 3] = 255; // Alpha channel, fully opaque
	}
	
	return mergedImageData;
};

function MergedCanvas({ selectedColors }) {
	const canvasRef = useRef(null);
	
	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');
		const imagePromises = ['Red', 'Green', 'Blue'].map(color => {
			if (selectedColors[color]) {
				return loadImage(`thumb/${selectedColors[color]}.png`);
			}
			return Promise.resolve(null);
		});
		
		Promise.all(imagePromises).then(images => {
			const [redImage, greenImage, blueImage] = images;
			const width = redImage ? redImage.width : greenImage ? greenImage.width : blueImage.width;
			const height = redImage ? redImage.height : greenImage ? greenImage.height : blueImage.height;
			
			const redCanvas = document.createElement('canvas');
			const greenCanvas = document.createElement('canvas');
			const blueCanvas = document.createElement('canvas');
			
			redCanvas.width = greenCanvas.width = blueCanvas.width = width;
			redCanvas.height = greenCanvas.height = blueCanvas.height = height;
			
			const redCtx = redCanvas.getContext('2d');
			const greenCtx = greenCanvas.getContext('2d');
			const blueCtx = blueCanvas.getContext('2d');
			
			if (redImage) redCtx.drawImage(redImage, 0, 0, width, height);
			if (greenImage) greenCtx.drawImage(greenImage, 0, 0, width, height);
			if (blueImage) blueCtx.drawImage(blueImage, 0, 0, width, height);
			
			const mergedImageData = mergeRGBChannels({
				red: redCtx.getImageData(0, 0, width, height),
				green: greenCtx.getImageData(0, 0, width, height),
				blue: blueCtx.getImageData(0, 0, width, height),
			});
			
			ctx.putImageData(mergedImageData, 0, 0);
		});
	}, [selectedColors]);
	
	const loadImage = (src) => {
		return new Promise((resolve, reject) => {
			const img = new Image();
			img.crossOrigin = "Anonymous";
			img.onload = () => resolve(img);
			img.onerror = reject;
			img.src = src;
		});
	};
	
	const downloadImage = (scale) => {
		const canvas = canvasRef.current;
		const link = document.createElement('a');
		link.href = canvas.toDataURL();
		link.download = `merged_image_x${scale}.png`;
		link.click();
	};
	
	return (
		<div className="fixed-container">
			<canvas ref={canvasRef}
							className="rgb_canvas"
			/>
			<div className="button-container">
				{[1, 4, 6].map(scale => (
					<button key={scale}
									onClick={() => downloadImage(scale)}
									className="download-button"
					>
						x{scale}
					</button>
				))}
			</div>
		</div>
	);
}

export default MergedCanvas;
