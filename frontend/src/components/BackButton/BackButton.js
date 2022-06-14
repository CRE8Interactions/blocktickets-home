import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

export default function BackButton({ handleGoBack, marginBottom = 0, variant = 'outline-light' }) {
    const navigate = useNavigate();

    const onClick = () => {
        return handleGoBack ? handleGoBack() : navigate(-1);
    };
    return (
        <Button
            onClick={onClick}
            className={`d-flex icon-button mt-0 mb-${marginBottom}  btn btn-back`}
            variant={variant}
            size="sm">
            Back
        </Button>
    );
}
