import React, { Fragment, useContext, useEffect } from 'react';

import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

import './inputField.scss';

export default function InputField({ state, type, placeholder }) {
	return (
		<Form className="input-wrapper my-4">
			<FormControl type={type} aria-label={placeholder} placeholder={placeholder} />
			<Button className="btn--icon btn--input btn--input-default" type="submit" />
		</Form>
	);
}
