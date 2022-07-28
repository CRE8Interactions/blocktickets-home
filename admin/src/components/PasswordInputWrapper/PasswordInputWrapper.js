import React from 'react'

import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

import { PasswordInput } from '../PasswordInput'

export default function PasswordInputWrapper({ value, isValid, handlePassword }) {

    return (
        <>
            <OverlayTrigger
                placement="bottom" trigger='focus'
                overlay={<Tooltip>Password should contain at least <strong>8 characters</strong>, <strong>upper and lowercase letters</strong>, at least <strong>one number</strong> and at least <strong>one special character</strong></Tooltip>}>
                <div>
                    <PasswordInput
                        value={value}
                        isValid={isValid}
                        handlePassword={handlePassword}
                    />
                </div>
            </OverlayTrigger>


        </>
    )
}
