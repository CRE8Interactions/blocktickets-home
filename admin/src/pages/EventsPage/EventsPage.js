import React, { useState, useContext } from 'react';

import OrganizationContext from '../../context/Organization/Organization';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import { SearchBar } from '../../components';
import ShowTable from '../../components/Tables/Events/ShowTable';

export default function EventsPage() {
	const [
		key,
		setKey
	] = useState('home');

	const [
		show,
		setShow
	] = useState(false);
	const [
		step,
		setStep
	] = useState();
	const [
		event,
		setEvent
	] = useState();
	const handleClose = () => setShow(false);
	const handleShow = () => {
		setStep(1);
		setShow(true);
	};
	const fullscreen = useState(true);
	const orgs = useContext(OrganizationContext);

	const addTickets = (event) => {
		setStep(3);
		setShow(true);
		setEvent(event);
	};

	return (
		<div className="spacer-md">
			<div className="d-flex justify-content-between align-items-center pt-3 pb-2 mb-3 section-heading">
				<h1>Events</h1>
				<SearchBar />
			</div>
			<Tabs variant="pills" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
				<Tab eventKey="Published" title="Published">
					<ShowTable handleTicketShow={addTickets} />
				</Tab>
				<Tab eventKey="Draft" title="Draft" />
				<Tab eventKey="Past" title="Past" />
			</Tabs>

			{/* <CreateEvent
				show={show}
				handleClose={handleClose}
				fullscreen={fullscreen}
				orgs={orgs}
				step={step}
				myEvent={event}
			/> */}
		</div>
	);
}
