import React, { Fragment, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';

import authService from '../../../utilities/services/auth.service';
import { useOnOutsideClick } from '../../../utilities/hooks';

import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';

import { Dropdown } from '../../Dropdown';

import './navButtons.scss';

export default function NavButtons({ styles }) {
	const { ref, isComponentVisible, setIsComponentVisible } = useOnOutsideClick(false);

	const handleClick = () => {
		setIsComponentVisible(!isComponentVisible);
	};

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
						onClick={handleClick}
						variant="outline-light"
						className={styles}
						id="btn-wallet"
						ref={ref}>
						My Wallet
					</Button>
					<div className={styles}>
						{isComponentVisible && (
							<Dropdown reference={ref} setMenu={setIsComponentVisible} />
						)}
					</div>
				</Fragment>
			)}
		</Fragment>
	);
}
