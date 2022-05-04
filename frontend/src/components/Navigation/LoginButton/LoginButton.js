import React, { Fragment } from 'react';
import { LinkContainer } from 'react-router-bootstrap';

import authService from '../../../utilities/services/auth.service';

import Nav from 'react-bootstrap/Nav';

import './loginButton.scss';

export default function LoginButton({ styles }) {
	return (
		<Fragment>
			{!authService.isLoggedIn() && (
				<LinkContainer
					to="/login"
					id="login-btn"
					className={`btn btn-secondary text-white ${styles}`}>
					<Nav.Link>Login</Nav.Link>
				</LinkContainer>
			)}
		</Fragment>
	);
}
