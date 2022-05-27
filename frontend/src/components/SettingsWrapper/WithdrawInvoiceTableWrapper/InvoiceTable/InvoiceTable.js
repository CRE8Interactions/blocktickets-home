import React from 'react';
import moment from 'moment';

import Table from 'react-bootstrap/Table';

import './invoiceTable.scss';

export default function InvoiceTable({ details }) {
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
				{ details && details.map((detail, index) => {
					return (
						<tr key={index}>
							<th scope="row">{ moment(detail?.createdAt).format('M.DD.YYYY') }</th>
							<td>{detail?.event?.name} - {detail?.details?.ticket?.attributes?.name}</td>
							<td>{detail?.tickets.length} Tickets</td>
							<td>${parseFloat(detail?.total).toFixed(2)}</td>
							<td>
								<a href="">Download</a>
							</td>
						</tr>
					)
				})}
			</tbody>
		</Table>
	);
}
