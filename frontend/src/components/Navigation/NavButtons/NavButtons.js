import React, { Fragment, useState } from 'react';
import authService from '../../../utilities/services/auth.service';

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
				<Button href="/login" variant="primary" className={styles}>
					Login
				</Button>
			)}
			{authService.isLoggedIn() && (
				<Fragment>
					<Button
						onClick={() => {
							setShowMenu(!showMenu);
						}}
						variant="outline-light"
						className={styles}>
						My Wallet
					</Button>
					<div className={styles}>{showMenu && <Dropdown />}</div>
				</Fragment>
			)}
		</Fragment>
	);
}
