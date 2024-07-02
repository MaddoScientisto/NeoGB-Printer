import React from 'react';

function Button({ text, onClick, href, download, className }) {
	return (
		<a className={`button ${className}`} onClick={onClick} href={href} download={download}>
			{text}
		</a>
	);
}

export default Button;
