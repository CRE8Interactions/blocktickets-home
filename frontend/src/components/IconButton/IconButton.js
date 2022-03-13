import React, { Fragment, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import './iconButton.scss';

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
