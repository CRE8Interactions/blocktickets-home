import React from 'react';
import { Link } from 'react-router-dom';

export default function IconButton({ children, styles, variant, btn = '', size, link, isExternal }) {

    return (
        <>
            {isExternal ? (
                <a href={link} target="_blank" rel="noreferrer" className={`btn btn-${variant} ${btn && `btn-${btn}`} icon-button ${styles && styles} ${size
                    ? `btn-${size}`
                    : ''} `}>{children}</a>
            ) : (
                <Link
                    to={link}
                    className={`btn btn-${variant} ${btn && `btn-${btn}`} icon-button ${styles && styles} ${size
                        ? `btn-${size}`
                        : ''} `}>
                    {children}
                </Link>
            )}
        </>
    );
}
