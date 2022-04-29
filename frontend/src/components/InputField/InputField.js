import React, { Fragment, useContext, useEffect } from 'react';

import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

import './inputField.scss';

// single inputs
export default function InputField({ size, state, type, placeholder, children, styles }) {
	return (
		<Form className={`input-wrapper input-wrapper-${size} ${styles}`}>
			<FormControl
				className="me-2"
				type={type}
				aria-label={placeholder}
				placeholder={placeholder}
				size={size}
			/>

			<Button className="m-0 btn--input btn--input-default" type="submit" />
			{children}
		</Form>
	);
}
