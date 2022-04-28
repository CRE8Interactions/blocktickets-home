import React from 'react';

import { MyWallet } from './../MyWallet';

import './dropdown.scss';

export default function Dropdown({ showMenu, reference }) {
	return (
		<div ref={reference} className="myDropdown">
			<MyWallet showMenu={showMenu} />
		</div>
	);
}
