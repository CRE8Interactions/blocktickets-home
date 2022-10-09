import React, { useState } from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { EyeIcon } from "./EyeIcon";
import { EyeIconSlash } from "./EyeIconSlash";

export default function PasswordInput({ name = "password", value, isValid, handlePassword, onBlur, reference, placeholder = "Password" }) {

    const [show, setShow] = useState(false)

    return (
        <div className={`input-wrapper ${!isValid ? 'input-wrapper-error' : ''}`}>

            <Form.Control
                ref={reference}
                type={show ? 'text' : 'password'}
                name={name}
                placeholder={placeholder}
                pattern="[A-Za-z0-9]{6,}"
                value={value}
                onBlur={onBlur}
                onChange={handlePassword}
                required
            ></Form.Control>



            <Button variant="link" onClick={() => setShow(!show)}>

                {show ? (
                    <EyeIconSlash />
                ) : (
                    <EyeIcon />
                )}
            </Button>
        </div>
    )
}
