import React from 'react'

import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

import { PasswordInput } from '../PasswordInput'

export default function PasswordInputWrapper({ value, reference, isValid, handlePassword }) {

    return (
        <>
            <OverlayTrigger
                placement="bottom" trigger='focus'
                overlay={<Tooltip>Password should contain at least <strong>6 characters</strong></Tooltip>}>
                <div>
                    <PasswordInput
                        reference={reference}
                        value={value}
                        isValid={isValid}
                        handlePassword={handlePassword}
                    />
                </div>
            </OverlayTrigger>


        </>
    )
}
