import React from 'react';

import { MyWallet } from '../../MyWallet';

import './dropdown.scss';

export default function Dropdown({ handleClick }) {
	return (
		<div className="myDropdown">
			<MyWallet handleClick={handleClick} />
		</div>
	);
}
