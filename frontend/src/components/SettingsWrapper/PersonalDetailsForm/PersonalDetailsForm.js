import React, { Fragment, useState, useEffect } from 'react';

import { updatePersonalDetails } from '../../../utilities/api';
import authService from '../../../utilities/services/auth.service';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Spinner } from "../../SpinnerContainer/Spinner"

export default function PersonalDetailsForm() {
    let user = sessionStorage.getItem('user');
    user = JSON.parse(user).user;

    const [initialState, setInitialState] = useState()

    const [
        formValid,
        setFormValid
    ] = useState(false);

    const [
        formData,
        setFormData
    ] = useState({});

    const [
        firstName,
        setFirstName
    ] = useState(user.firstName);

    const [
        lastName,
        setLastName
    ] = useState(user.lastName);

    const [
        email,
        setEmail
    ] = useState(user.email);

    const [disabled, setDisabled] = useState(true);

    const [isSaving, setIsSaving] = useState(false)

    // const [
    // 	dob,
    // 	setDob
    // ] = useState(user.dob);

    // const [
    // 	gender,
    // 	setGender
    // ] = useState(user.gender);

    const [show, setShow] = useState(false);

    useEffect(
        () => {
            if (firstName && lastName && email) {
                setFormValid(true);
            }
            else {
                setFormValid(false);
            }
        },
        [
            firstName,
            lastName,
            email
        ]
    );

    useEffect(() => {
        if (formValid && (initialState?.email !== email || initialState?.firstName !== firstName || initialState?.lastName !== lastName)) {
            setDisabled(false)
        }
    }, [formValid, firstName, lastName, email])

    useEffect(() => {
        setInitialState({
            firstName,
            lastName,
            email
        })
        // set default value for gender dropdown
        // let select = document.getElementById('gender');
        // for (let i = 0; i < select.options.length; i++) {
        //     if (select.options[i].value === user.gender) select.options[i].setAttribute('selected', true);
        // }
        if (firstName && lastName && email) {
            setFormValid(true);
        }
        else {
            setFormValid(false);
        }
    }, []);

    const submitForm = () => {
        setIsSaving(true)
        let data = {
            data: {
                email,
                firstName,
                lastName
            }
        };

        updatePersonalDetails(data).then((res) => {
            authService.setUser(res.data);
            setShow(true)
            setIsSaving(false)
        }).catch((err) => {
            console.error(err)
            setIsSaving(false)
        });
    };

    const notificationModal = () => {
        if (show) {
            return (
                <Alert variant="success" onClose={() => setShow(false)} dismissible>
                    <p>
                        Your Personal Details have successfully been updated.
                    </p>
                </Alert>
            );
        }
    }

    return (
        <Fragment>
            <Form className="d-flex-column">
                {notificationModal()}
                <Form.Group className="form-group" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        required
                        name="email"
                        defaultValue={user.email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="form-group" controlId="name">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your first name"
                        required
                        name="firstName"
                        defaultValue={user.firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="form-group" controlId="name">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your last name"
                        required
                        name="lastName"
                        defaultValue={user.lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </Form.Group>
                {/* <Row className="form-group">
					<Col>
						<Form.Group className="form-group" controlId="dob">
							<Form.Label>Birth Date</Form.Label>
							<Form.Control
								type="date"
								name="dob"
								defaultValue={user.dob}
								required
								onChange={(e) => setDob(e.target.value)}
							/>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group className="form-group" controlId="gender">
							<Form.Label>Gender</Form.Label>
							<Form.Select
								name="gender"
								required
								defaultValue={user.gender}
								onChange={(e) => setGender(e.target.value)}>
								<option>Select</option>
								<option value="male">Male</option>
								<option value="female">Female</option>
								<option value="other">Other</option>
							</Form.Select>
						</Form.Group>
					</Col>
				</Row> */}
                <Button disabled={disabled} size="lg" className="icon-button" onClick={submitForm}>
                    {isSaving ? (
                        <Spinner />
                    ) : (
                        'Update'
                    )}
                </Button>
            </Form>
        </Fragment>
    );
}
