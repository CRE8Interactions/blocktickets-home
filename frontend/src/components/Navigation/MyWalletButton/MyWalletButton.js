import React, { Fragment } from 'react';

import authService from '../../../utilities/services/auth.service';
import { useOnOutsideClick } from '../../../utilities/hooks';

import Button from 'react-bootstrap/Button';

import { Dropdown } from './Dropdown';

export default function MyWalletButton({ styles }) {
	const { ref, isComponentVisible, setIsComponentVisible } = useOnOutsideClick(false);

	return (
		<Fragment>
			{authService.isLoggedIn() && (
				<Fragment>
					<Button
						onClick={() => setIsComponentVisible(!isComponentVisible)}
						variant="outline-light"
						className={styles}
						ref={ref}>
						My Wallet
					</Button>
					{isComponentVisible && <Dropdown />}
				</Fragment>
			)}
		</Fragment>
	);
}
