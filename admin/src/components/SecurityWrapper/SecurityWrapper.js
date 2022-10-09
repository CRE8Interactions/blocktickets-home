import React, { useEffect, useState, useRef } from 'react';

import AuthService from '../../utilities/services/auth.service';

import { emailVaid, updateUserEmail, updateUsersName, resetPassword } from '../../utilities/api';
import { isMatching } from '../../utilities/helpers';

import Card from 'react-bootstrap/Card';

import { Security } from "./Security";

export default function SecurityWrapper() {

    const user = AuthService.getUser()?.user;

    // ref on new password to check pattern matching 
    const passwordEl = useRef();

    const [info, setInfo] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        curEmail: user.email,
        email: '',
        curPassword: '',
        password: ''
    })

    const [error, setError] = useState()

    const [success, setSuccess] = useState([])

    const handleInfo = (e) => {
        setInfo({ ...info, [e.target.name]: e.target.value })
    }

    const handleUpdate = (form) => {
        if (form === 'email') {
            updateUserEmail({ email: info.email })
                .then((res) => {
                    AuthService.setUser(res.data)
                    setSuccess([...success, form])
                })
                .catch((err) => err)
        }

        if (form === 'name') {
            updateUsersName({ firstName: info.firstName, lastName: info.lastName })
                .then((res) => {
                    AuthService.setUser(res.data)
                    setSuccess([...success, form])
                })
                .catch((err) => err)
        }

        if (form === 'password') {
            resetPassword({ password: info.curPassword, newPassword: info.password })
                .then((res) => {
                    setSuccess([...success, form])
                })
                .catch((err) => setError({ field: 'current password', type: 'notExist' }))
        }
    }

    useEffect(() => {
        setError('')

    }, [info.curEmail, info.email, info.curPassword, info.password])

    // validate if curEmail is correct, newEmail is correct, curPassword is correct, newPassword is correct and pattern match
    const handleInput = (e) => {
        const { name } = e.target;

        const email = info.curEmail;
        // TODO: store current password in db 
        const password = "blocktickets"

        switch (name) {
            case 'curEmail':
                if (info.curEmail !== '' && info.curEmail !== email) {
                    setError({ field: 'current email', type: 'notExist' })
                }
                break;
            case 'email':
                emailVaid({ email: info.email })
                    .then(() => console.log('Valid'))
                    .catch((err) => {
                        console.log('Error ', err)
                        setError({ field: 'new email', type: 'alreadyExist' })
                    })
                // if (isMatching(info.curEmail, info.email)) {
                //     setError({ field: 'new email', type: 'sameMatch' })
                // }
                break;
            case 'curPassword':
                if (info.curPassword !== '' && info.curPassword !== password) {
                    // setError({ field: 'current password', type: 'notExist' })
                }
                break;
            case 'password':
                if (isMatching(info.curPassword, info.password)) {
                    // setError({ field: 'new password', type: 'sameMatch' })
                }
                else if (!passwordEl.current.validity.valid) {
                    setError({ field: 'new password', type: 'patternMatch' })
                }
                break;
            default:
                return;
        }
    }

    return (
        <section className='wrapper'>
            <header className="section-header">
                <div className="section-heading section-heading--secondary">
                    <h1>Security</h1>
                </div>
                <p className='section-header-desc'>To update your name, email address or password associated with this account, please fill in the following fields</p>
            </header>
            <Card body className='card--sm'>
                <Security info={info} handleInfo={handleInfo} handleUpdate={handleUpdate} handleInput={handleInput} passwordRef={passwordEl} error={error} success={success} />
            </Card>
        </section>
    );
}
