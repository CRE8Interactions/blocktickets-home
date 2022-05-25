import React, { Fragment } from 'react';

import authService from '../../../utilities/services/auth.service';
import { useOnOutsideClick } from '../../../utilities/hooks';

import Button from 'react-bootstrap/Button';

import { Dropdown } from './Dropdown';

export default function MyWalletButton({ styles }) {
	const { ref, isComponentVisible, setIsComponentVisible } = useOnOutsideClick(false);

	const handleClick = () => {
		setIsComponentVisible(!isComponentVisible);
	};
	return (
		<Fragment>
			{authService.isLoggedIn() && (
				<Fragment>
					<Button onClick={handleClick} variant="outline-light" className={styles} ref={ref}>
						My Wallet
					</Button>
					{isComponentVisible && <Dropdown reference={ref} handleClick={handleClick} />}
				</Fragment>
			)}
		</Fragment>
	);
}
