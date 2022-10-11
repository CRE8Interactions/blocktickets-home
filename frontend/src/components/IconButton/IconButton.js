import React from 'react';
import { Link } from 'react-router-dom';

export default function IconButton({ children, styles, variant, btn = '', size, link, isExternal = false }) {

    return (
        <>
            {isExternal ? (
                <a href={link} className={`btn btn-${variant} ${btn && `btn-${btn}`} icon-button ${styles && styles} ${size
                    ? `btn-${size}`
                    : ''} `}>{children}</a>
            ) : (
                <Link
                    to={link}
                    className={`internal btn btn-${variant} ${btn && `btn-${btn}`} icon-button ${styles && styles} ${size
                        ? `btn-${size}`
                        : ''} `}>
                    {children}
                </Link>
            )}
        </>
    );
}
