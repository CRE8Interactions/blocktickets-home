import React from 'react';
import { Link } from 'react-router-dom';

export default function IconButton({ children, styles, variant, btn = '', size, link, relative }) {
	return (
		<Link
			to={link}
			relative={relative}
			className={`btn btn-${variant} ${btn && `btn-${btn}`} icon-button ${styles && styles} ${size
				? `btn-${size}`
				: ''} `}>
			{children}
		</Link>
	);
}
