import React, { Fragment, useContext, useEffect } from 'react';

import ListGroup from 'react-bootstrap/ListGroup';
import { LinkContainer } from 'react-router-bootstrap';
import Nav from 'react-bootstrap/Nav';

import authService from '../../utilities/services/auth.service';
import UserContext from '../../context/User/user';

import './myWallet.scss';

export default function MyWallet({ toggle }) {
	const { setAuthenticated } = useContext(UserContext);

	const logout = () => {
		authService.logoutUser();
		setAuthenticated({});
	};

	useEffect(() => {
		const closeMenu = () => {
			console.log('close');
			if (toggle) toggle(false);
		};

		document.querySelector('.nav-link').addEventListener('click', closeMenu);
		return () => {
			document.querySelector('.nav-link').removeEventListener('click', closeMenu);
		};
	}, []);

	return (
		<div className="wallet">
			<ListGroup variant="flush" as="ul">
				<h5 className="name m-0 pb-2 ">Harrison Cogan</h5>
				<ListGroup.Item as="li">
					<LinkContainer to={'/events'}>
						<Nav.Link>Upcoming Events</Nav.Link>
					</LinkContainer>
				</ListGroup.Item>
				<ListGroup.Item as="li">
					<LinkContainer to={'/collectables'}>
						<Nav.Link>Collectables</Nav.Link>
					</LinkContainer>
				</ListGroup.Item>
				<ListGroup.Item as="li">
					<LinkContainer to={'/settings'}>
						<Nav.Link>Settings</Nav.Link>
					</LinkContainer>
				</ListGroup.Item>
				<ListGroup.Item as="li" onClick={logout}>
					<LinkContainer to={'/logout'}>
						<Nav.Link>Log out</Nav.Link>
					</LinkContainer>
				</ListGroup.Item>
			</ListGroup>
		</div>
	);
}
