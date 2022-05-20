import React, { useContext } from 'react';
import { LinkContainer } from 'react-router-bootstrap';

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
			<ul role="my wallet menu">
				<h5 className="name m-0 pb-3 pb-lg-2">{user?.user?.name}</h5>
				<li className="list-item">
					<LinkContainer to={'/my-events'}>
						<Nav.Link>My events</Nav.Link>
					</LinkContainer>
				</li>
				<li className="list-item">
					<LinkContainer to={'/my-listings'}>
						<Nav.Link>My listings</Nav.Link>
					</LinkContainer>
				</li>
				<li className="list-item">
					<LinkContainer to={'/my-transfers'}>
						<Nav.Link>My transfers</Nav.Link>
					</LinkContainer>
				</li>
				{/* <li >
					<LinkContainer to={'/my-collectables'}>
						<Nav.Link>My Collectables</Nav.Link>
					</LinkContainer>
				</li> */}
				<li className="list-item">
					<LinkContainer to={'/settings'} >
						<Nav.Link>Settings</Nav.Link>
					</LinkContainer>
				</li>
				<hr/>
				<li className="list-item" onClick={logout}>
					<LinkContainer to={'/'}>
						<Nav.Link>Log out</Nav.Link>
					</LinkContainer>
				</li>
			</ul>
		</div>
	);
}
