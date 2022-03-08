import React, { Fragment, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import './iconButton.scss';

export default function IconButton({ children, styles, variant, color }) {
	return (
		<Button className={styles} variant={variant}>
			<Link to={'tickets/1'}>
				<span className={`d-flex btn--tickets icon-button ${color}`}>{children}</span>
			</Link>
		</Button>
	);
}
