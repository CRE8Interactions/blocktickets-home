import React, { useState, useLayoutEffect } from 'react';

export default function InfoIcon({ variant, size }) {


    const [width, setWidth] = useState()
    const [height, setHeight] = useState()

    useLayoutEffect(() => {
        getSize()

    }, [])

    const getSize = () => {
        switch (size) {
            case 'lg':
                setWidth(20);
                setHeight(20);
                break;

            default:
                setWidth(16);
                setHeight(17);
                break;
        }
    }
    const getColor = () => {
        switch (variant) {
            case 'dark':
                return '#23262F'

            default:
                return '#777E90'
        }
    }
    return (
        <svg width={width} height={height} viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.6663 8.00993C14.6663 11.6918 11.6816 14.6766 7.99967 14.6766C4.31778 14.6766 1.33301 11.6918 1.33301 8.00993C1.33301 4.32803 4.31778 1.34326 7.99967 1.34326C11.6816 1.34326 14.6663 4.32803 14.6663 8.00993ZM7.99967 7.34326C8.36786 7.34326 8.66634 7.64174 8.66634 8.00993V11.3439C8.66634 11.712 8.36786 12.0105 7.99967 12.0105C7.63148 12.0105 7.33301 11.712 7.33301 11.3439V8.00993C7.33301 7.64174 7.63148 7.34326 7.99967 7.34326ZM7.99967 6.00993C8.36786 6.00993 8.66634 5.71145 8.66634 5.34326C8.66634 4.97507 8.36786 4.6766 7.99967 4.6766C7.63148 4.6766 7.33301 4.97507 7.33301 5.34326C7.33301 5.71145 7.63148 6.00993 7.99967 6.00993Z"
                fill={getColor()}
            />
        </svg>
    );
}
