import React from 'react';

import Table from 'react-bootstrap/Table';

import './invoiceTable.scss';

export default function InvoiceTable() {
	return (
		<Table bordered id="invoice-table">
			<thead>
				<tr>
					<th scope="col">Date</th>
					<th scope="col">Description</th>
					<th scope="col">Quantity</th>
					<th scope="col">Total</th>
					<th scope="col">Invoice</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th scope="row">2.25.22</th>
					<td>Olivia Rodrigo Concert - Resale x 2 Tickets</td>
					<td>2 Tickets</td>
					<td>2 Tickets</td>
					<td>
						<a href="">Download</a>
					</td>
				</tr>
				<tr>
					<th scope="row">2.25.22</th>
					<td>
						Olivia Rodrigo Concert - Resale x 2 TicketsOlivia Rodrigo Concert - Resale x
						2 Tickets
					</td>
					<td>2 Tickets</td>
					<td>2 Tickets</td>
					<td>
						<a href="">Download</a>
					</td>
				</tr>
				<tr>
					<th scope="row">2.25.22</th>
					<td>Olivia Rodrigo Concert - Resale x 2 Tickets</td>
					<td>2 Tickets</td>
					<td>2 Tickets</td>
					<td>
						<a href="">Download</a>
					</td>
				</tr>
			</tbody>
		</Table>
	);
}
