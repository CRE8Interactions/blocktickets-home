import React, { Fragment, useContext, useEffect } from 'react';

import { MyWallet } from './../MyWallet';

import './dropdown.scss';

export default function Dropdown({ showMenu }) {
	return (
		<div className="myDropdown">
			<MyWallet showMenu={showMenu} />
		</div>
	);
}
