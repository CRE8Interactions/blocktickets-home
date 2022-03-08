import React, { Fragment, useState } from 'react';
import authService from '../../../utilities/services/auth.service';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
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
				<Link to="/login" className={`btn btn-primary ${styles}`}>
					Login
				</Link>
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
					<div className={styles}>{showMenu && <Dropdown />}</div>
				</Fragment>
			)}
		</Fragment>
	);
}
