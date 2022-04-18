import React from 'react';

import Alert from 'react-bootstrap/Alert';

import './error.scss';

export default function Error({ type }) {
	const getErrorType = (type) => {
		switch (type) {
			case 'phone':
				return 'Phone number is not valid';

			case 'code':
				return 'Code entered is incorrect';

			default:
				return;
		}
	};
	return (
		<Alert variant={'danger'} className="gap-4 mt-3">
			<div className="icon">
				<svg
					width="32"
					height="33"
					viewBox="0 0 32 33"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M16 27.167C21.891 27.167 26.6667 22.3914 26.6667 16.5003C26.6667 10.6093 21.891 5.83366 16 5.83366C10.109 5.83366 5.33332 10.6093 5.33332 16.5003C5.33332 22.3914 10.109 27.167 16 27.167ZM16 29.8337C23.3638 29.8337 29.3333 23.8641 29.3333 16.5003C29.3333 9.13653 23.3638 3.16699 16 3.16699C8.63619 3.16699 2.66666 9.13653 2.66666 16.5003C2.66666 23.8641 8.63619 29.8337 16 29.8337Z"
						fill="currentColor"
					/>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M16 9.83301C15.2636 9.83301 14.6667 10.43 14.6667 11.1663C14.6667 11.9027 15.2636 12.4997 16 12.4997C16.7364 12.4997 17.3333 11.9027 17.3333 11.1663C17.3333 10.43 16.7364 9.83301 16 9.83301ZM16 15.1663C15.2636 15.1663 14.6667 15.7633 14.6667 16.4997V21.833C14.6667 22.5694 15.2636 23.1663 16 23.1663C16.7364 23.1663 17.3333 22.5694 17.3333 21.833V16.4997C17.3333 15.7633 16.7364 15.1663 16 15.1663Z"
						fill="currentColor"
					/>
				</svg>
			</div>
			<div className="body">
				<h1 className="normal mb-0 fw-medium">{getErrorType(type)}</h1>
			</div>
		</Alert>
	);
}
