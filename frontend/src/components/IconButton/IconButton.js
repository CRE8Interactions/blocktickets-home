import React, { Fragment, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './iconButton.scss';

export default function IconButton({ children, styles, variant, btn, background, size, link }) {
	return (
		<Link
			to={`${link}`}
			className={`btn btn-${variant} d-flex btn-${btn} icon-button ${styles && styles} ${size
				? `btn-${size}`
				: ''} ${background && `btn-${background} `} `}>
			{children}
		</Link>
	);
}
