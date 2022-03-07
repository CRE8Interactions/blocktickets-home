import React, { Fragment, useContext, useEffect } from 'react';

import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';

import authService from '../../utilities/services/auth.service';
import UserContext from '../../context/User/user';

import './myWallet.scss';

export default function MyWallet({ style }) {
	const { setAuthenticated } = useContext(UserContext);

	const logout = () => {
		authService.logoutUser();
		setAuthenticated({});
	};

	return (
		<div className="wallet">
			<ListGroup variant="flush">
				<p className="name pb-2 ">Harrison Cogan</p>
				<ListGroup.Item as={Link} to={''}>
					Upcoming Events
				</ListGroup.Item>
				<ListGroup.Item as={Link} to={''}>
					Collectables
				</ListGroup.Item>
				<ListGroup.Item as={Link} to={''}>
					Settings
				</ListGroup.Item>
				<ListGroup.Item as={Link} to={''}>
					Log out
				</ListGroup.Item>
			</ListGroup>
		</div>
	);
}
