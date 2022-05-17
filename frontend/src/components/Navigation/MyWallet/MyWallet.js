import React, { useContext } from 'react';
import { LinkContainer } from 'react-router-bootstrap';

import ListGroup from 'react-bootstrap/ListGroup';
import Nav from 'react-bootstrap/Nav';

import authService from '../../../utilities/services/auth.service';
import UserContext from '../../../context/User/user';

import './myWallet.scss';

export default function MyWallet() {
	const { setAuthenticated, user } = useContext(UserContext);

	const logout = () => {
		authService.logoutUser();
		setAuthenticated({});
	};

	return (
		<div className="wallet">
			<ListGroup variant="flush" as="ul" role="my wallet menu">
				<h5 className="name m-0 pb-3 pb-lg-2">{user?.user?.name}</h5>
				<ListGroup.Item as="li" >
					<LinkContainer to={'/my-events'}>
						<Nav.Link>My Events</Nav.Link>
					</LinkContainer>
				</ListGroup.Item>
				<ListGroup.Item as="li" >
					<LinkContainer to={'/my-transfers'}>
						<Nav.Link>My Transfers</Nav.Link>
					</LinkContainer>
				</ListGroup.Item>
				<ListGroup.Item as="li" >
					<LinkContainer to={'/my-listings'}>
						<Nav.Link>My Listings</Nav.Link>
					</LinkContainer>
				</ListGroup.Item>
				{/* <ListGroup.Item as="li" >
					<LinkContainer to={'/my-collectables'}>
						<Nav.Link>My Collectables</Nav.Link>
					</LinkContainer>
				</ListGroup.Item> */}
				<ListGroup.Item as="li">
					<LinkContainer to={'/settings'} >
						<Nav.Link>Settings</Nav.Link>
					</LinkContainer>
				</ListGroup.Item>
				<ListGroup.Item as="li" onClick={logout}>
					<LinkContainer to={'/'}>
						<Nav.Link>Log out</Nav.Link>
					</LinkContainer>
				</ListGroup.Item>
			</ListGroup>
		</div>
	);
}
