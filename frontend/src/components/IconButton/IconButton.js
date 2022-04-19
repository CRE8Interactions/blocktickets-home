import React from 'react';
import { Link } from 'react-router-dom';

export default function IconButton({ children, styles, variant, btn, size, link }) {
	return (
		<Link
			to={`${link}`}
			className={`btn btn-${variant} d-flex btn-${btn} icon-button ${styles && styles} ${size
				? `btn-${size}`
				: ''} `}>
			{children}
		</Link>
	);
}
