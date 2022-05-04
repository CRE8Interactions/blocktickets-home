import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { SearchResultsContainer } from '../SearchResultsContainer';

import './searchModal.scss';

export default function SearchModal({ show, setShow, query, setQuery, showResults, results }) {
	const location = useLocation();

	const [
		isSearching,
		setIsSearching
	] = useState('');

	const handleClose = () => {
		setQuery('');
		setIsSearching(false);
		setShow();
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsSearching(true);
	};

	// when location changes, reset query and search results
	useEffect(
		() => {
			setQuery('');
			setIsSearching(false);
		},
		[
			location
		]
	);

	// if query is blanked out, don't show search results until user submits form
	useEffect(
		() => {
			if (query == '') {
				setIsSearching(false);
			}
		},
		[
			query
		]
	);

	return (
		<Modal
			id="search-modal"
			scrollable
			animation={false}
			centered
			fullscreen
			show={show}
			onHide={handleClose}>
			<Modal.Header closeButton className="mb-4">
				<Stack direction="horizontal" gap={2} className="flex-grow-1">
					<Button onClick={handleClose} variant="default" className="m-0 p-0">
						<svg
							title="go back"
							width="8"
							height="12"
							viewBox="0 0 8 12"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M6.94281 0.390524C7.46351 0.911223 7.46351 1.75544 6.94281 2.27614L3.21895 6L6.94281 9.72386C7.46351 10.2446 7.46351 11.0888 6.94281 11.6095C6.42211 12.1302 5.57789 12.1302 5.05719 11.6095L0.390524 6.94281C-0.130175 6.42211 -0.130175 5.57789 0.390524 5.05719L5.05719 0.390524C5.57789 -0.130175 6.42211 -0.130175 6.94281 0.390524Z"
								fill="#777E91"
							/>
						</svg>
					</Button>
					<Form onSubmit={handleSubmit} className="flex-grow-1">
						<Form.Control
							type="text"
							placeholder="Search for events"
							aria-label="Search for events"
							className="form-control--borderless pb-2"
							value={query}
							onChange={(e) => showResults(e.target.value)}
						/>
					</Form>
				</Stack>
			</Modal.Header>
			<Modal.Body>
				{isSearching &&
				query && <SearchResultsContainer query={query} queryResults={results} />}
			</Modal.Body>
		</Modal>
	);
}
