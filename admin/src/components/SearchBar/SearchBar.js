import React, { Fragment, useEffect } from 'react';

import { searchEvents } from '../../utilities/api';
import { useOnOutsideClick } from '../../utilities/hooks';

import Form from 'react-bootstrap/Form';

import './searchBar.scss';

export default function SearchBar({ query, setQuery, handleSearch, size = "lg", placeholder }) {
    const { ref, isComponentVisible, setIsComponentVisible } = useOnOutsideClick(false);

    // when no query
    useEffect(
        () => {
            if (query == '') {
                reset();
            }
        },
        [
            query
        ]
    );

    // when dropdown isn't shown
    useEffect(
        () => {
            if (!isComponentVisible) {
                reset();
            }
        },
        [
            isComponentVisible
        ]
    );

    const reset = () => {
        setIsComponentVisible(false);
        setQuery('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsComponentVisible(true);
    };

    return (
        <Fragment>
            <Form onSubmit={handleSubmit} ref={ref} className="search  d-flex">
                <div className="search-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12.4215 13.5999C11.2925 14.4774 9.87401 15 8.33342 15C4.65152 15 1.66675 12.0152 1.66675 8.33332C1.66675 4.65143 4.65152 1.66666 8.33342 1.66666C12.0153 1.66666 15.0001 4.65143 15.0001 8.33332C15.0001 9.87392 14.4775 11.2925 13.6 12.4214L18.0893 16.9107C18.4148 17.2362 18.4148 17.7638 18.0893 18.0892C17.7639 18.4147 17.2363 18.4147 16.9108 18.0892L12.4215 13.5999ZM13.3334 8.33332C13.3334 11.0947 11.0948 13.3333 8.33342 13.3333C5.57199 13.3333 3.33341 11.0947 3.33341 8.33332C3.33341 5.5719 5.57199 3.33332 8.33342 3.33332C11.0948 3.33332 13.3334 5.5719 13.3334 8.33332Z"
                            fill="#777E91"
                        />
                    </svg>
                </div>
                <Form.Control
                    type="text"
                    placeholder={placeholder}
                    size={size}
                    value={query}
                    onChange={(e) => handleSearch(e.target.value)}
                    aria-label={placeholder}
                />
            </Form>
        </Fragment>
    );
}
