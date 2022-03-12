import React, { Fragment, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import './iconButton.scss';

export default function IconButton({ children, styles, variant, btn, size, color, link }) {
	return (
		<Button className={styles} variant={variant} size={size}>
			<Link to={`${link}`}>
				<span className={`d-flex btn--${btn} icon-button ${color}`}>{children}</span>
			</Link>
		</Button>
	);
}
