import React from 'react';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';

export default function CopyButton({ link }) {

    const copy = () => {
        /* Copy the text */
        navigator.clipboard.writeText(link);
    }

    return (
        <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Copy</Tooltip>}>
            <Button variant="default" className="p-0" onClick={copy}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 5H14C14.5523 5 15 5.44772 15 6V7H17V6C17 4.34315 15.6569 3 14 3H6C4.34315 3 3 4.34315 3 6V14C3 15.6569 4.34315 17 6 17H7V15H6C5.44772 15 5 14.5523 5 14V6C5 5.44772 5.44772 5 6 5Z" fill="#777E91" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M18 9H10C9.44772 9 9 9.44772 9 10V18C9 18.5523 9.44772 19 10 19H18C18.5523 19 19 18.5523 19 18V10C19 9.44772 18.5523 9 18 9ZM10 7C8.34315 7 7 8.34315 7 10V18C7 19.6569 8.34315 21 10 21H18C19.6569 21 21 19.6569 21 18V10C21 8.34315 19.6569 7 18 7H10Z" fill="#777E91" />
                </svg>
            </Button>
        </OverlayTrigger>
    );
}
