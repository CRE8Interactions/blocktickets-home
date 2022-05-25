import React from 'react';

import { MyWallet } from '../../MyWallet';

import './dropdown.scss';

export default function Dropdown({ reference, handleClick }) {
	return (
		<div className="myDropdown" ref={reference}>
			<MyWallet handleClick={handleClick} />
		</div>
	);
}
