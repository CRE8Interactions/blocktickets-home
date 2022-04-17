import React, { Fragment, useContext, useEffect } from 'react';

import ListGroup from 'react-bootstrap/ListGroup';
import { LinkContainer } from 'react-router-bootstrap';
import Nav from 'react-bootstrap/Nav';

import authService from '../../utilities/services/auth.service';
import UserContext from '../../context/User/user';

import './myWallet.scss';

export default function MyWallet({ showMenu }) {
	const { setAuthenticated, user } = useContext(UserContext);

	const logout = () => {
		authService.logoutUser();
		setAuthenticated({});
	};

	const handleClick = () => {
		if (showMenu) {
			showMenu(false);
		}
		else return;
	};

	return (
		<div className="wallet">
			<ListGroup variant="flush" as="ul" role="my wallet menu">
				<h5 className="name m-0 pb-2 ">Harrison Cogan</h5>
				<ListGroup.Item as="li" onClick={handleClick}>
					<LinkContainer to={'/upcoming-events'}>
						<Nav.Link>Upcoming Events</Nav.Link>
					</LinkContainer>
				</ListGroup.Item>
				<ListGroup.Item as="li" onClick={handleClick}>
					<LinkContainer to={'/collectables'}>
						<Nav.Link>Collectables</Nav.Link>
					</LinkContainer>
				</ListGroup.Item>
				<ListGroup.Item as="li">
					<LinkContainer to={'/settings'} onClick={handleClick}>
						<Nav.Link>Settings</Nav.Link>
					</LinkContainer>
				</ListGroup.Item>
				<ListGroup.Item as="li" onClick={logout}>
					<LinkContainer to={'/logout'} onClick={handleClick}>
						<Nav.Link>Log out</Nav.Link>
					</LinkContainer>
				</ListGroup.Item>
			</ListGroup>
		</div>
	);
}
