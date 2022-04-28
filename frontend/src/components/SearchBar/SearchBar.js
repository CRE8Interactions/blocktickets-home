import React, { Fragment, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

import { SearchModal } from './SearchModal';
import { SearchDropdown } from './SearchDropdown';

import './searchBar.scss';

export default function SearchBar() {
	const location = useLocation();

	// search modal
	const [
		show,
		setShow
	] = useState(false);

	const handleShow = () => {
		setShow(true);
	};

	// search query
	const [
		query,
		setQuery
	] = useState('');

	// state to display search dropdown
	const [
		isSearching,
		setIsSearching
	] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsSearching(true);
	};

	// when location changes, close the dropdown and modal and reset query
	useEffect(
		() => {
			setIsSearching(false);
			setShow(false);
			setQuery('');
		},
		[
			location
		]
	);

	return (
		<Fragment>
			<Button
				onClick={handleShow}
				variant="default"
				className="btn--icon mobile-tablet-only"
				id="search-mobile"
				aria-label="search">
				<svg
					width="20"
					height="20"
					viewBox="0 0 20 20"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M12.9056 14.3199C11.551 15.3729 9.84871 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 9.84871 15.3729 11.551 14.3199 12.9056L19.7071 18.2929C20.0976 18.6834 20.0976 19.3166 19.7071 19.7071C19.3166 20.0976 18.6834 20.0976 18.2929 19.7071L12.9056 14.3199ZM14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z"
						fill="#777E91"
					/>
				</svg>
			</Button>
			<SearchModal show={show} setShow={setShow} />
			<Form onSubmit={handleSubmit} id="search" className=" d-none d-lg-flex">
				<FormControl
					type="search"
					placeholder="Search for events"
					className="me-2"
					size="sm"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					aria-label="Search for events"
				/>
				<div className="search-icon">
					<svg
						width="20"
						height="20"
						viewBox="0 0 20 20"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M12.4215 13.5999C11.2925 14.4774 9.87401 15 8.33342 15C4.65152 15 1.66675 12.0152 1.66675 8.33332C1.66675 4.65143 4.65152 1.66666 8.33342 1.66666C12.0153 1.66666 15.0001 4.65143 15.0001 8.33332C15.0001 9.87392 14.4775 11.2925 13.6 12.4214L18.0893 16.9107C18.4148 17.2362 18.4148 17.7638 18.0893 18.0892C17.7639 18.4147 17.2363 18.4147 16.9108 18.0892L12.4215 13.5999ZM13.3334 8.33332C13.3334 11.0947 11.0948 13.3333 8.33342 13.3333C5.57199 13.3333 3.33341 11.0947 3.33341 8.33332C3.33341 5.5719 5.57199 3.33332 8.33342 3.33332C11.0948 3.33332 13.3334 5.5719 13.3334 8.33332Z"
							fill="#777E91"
						/>
					</svg>
				</div>
			</Form>
			{isSearching && <SearchDropdown query={query} />}
		</Fragment>
	);
}
