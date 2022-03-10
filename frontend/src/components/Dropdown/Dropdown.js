import React, { Fragment, useContext, useEffect } from 'react';

import { MyWallet } from './../MyWallet';

import './dropdown.scss';

export default function Dropdown({ toggle }) {
	return (
		<div className="myDropdown">
			<MyWallet setShowMenu={toggle} />
		</div>
	);
}
