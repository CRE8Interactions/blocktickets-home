import React, { Fragment, useState } from 'react';
import authService from '../../../utilities/services/auth.service';
import { LinkContainer } from 'react-router-bootstrap';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import { Dropdown } from '../../Dropdown';

import './navButtons.scss';

export default function NavButtons({ styles }) {
	const [
		showMenu,
		setShowMenu
	] = useState(false);

	return (
		<Fragment>
			{!authService.isLoggedIn() && (
				<LinkContainer to="/login" className={`btn btn-secondary text-white ${styles}`}>
					<Nav.Link>Login</Nav.Link>
				</LinkContainer>
			)}
			{authService.isLoggedIn() && (
				<Fragment>
					<Button
						onClick={() => {
							setShowMenu(!showMenu);
						}}
						variant="outline-light"
						className={styles}
						id="btn-wallet">
						My Wallet
					</Button>
					<div className={styles}>{showMenu && <Dropdown showMenu={setShowMenu} />}</div>
				</Fragment>
			)}
		</Fragment>
	);
}
