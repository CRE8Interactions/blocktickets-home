import React, { Fragment } from 'react';

import authService from '../../../utilities/services/auth.service';
import { useOnOutsideClick } from '../../../utilities/hooks';

import Button from 'react-bootstrap/Button';

import { Dropdown } from './Dropdown';

export default function MyWalletButton({ styles }) {
    const { ref, isComponentVisible, setIsComponentVisible } = useOnOutsideClick(false);

    const handleClick = () => {
        setIsComponentVisible(!isComponentVisible);
    };
    return (
        <Fragment>
            {authService.isLoggedIn() && (
                <div ref={ref}>
                    <Button onClick={handleClick} variant="outline-light" className={styles}>
                        My wallet
                    </Button>
                    {isComponentVisible && <Dropdown handleClick={handleClick} />}
                </div>
            )}
        </Fragment>
    );
}
