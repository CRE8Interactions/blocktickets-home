import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

export default function BackButton({ handleGoBack, size = "lg" }) {
    const navigate = useNavigate();

    const onClick = () => {
        return handleGoBack ? handleGoBack() : navigate(-1);
    };
    return (
        <Button
            onClick={onClick}
            className='btn-back'
            variant='outline-light'
            size={size}>
            Back
        </Button>
    );
}
