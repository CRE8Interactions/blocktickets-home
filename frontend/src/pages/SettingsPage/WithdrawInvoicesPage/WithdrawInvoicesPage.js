import React, { useEffect, useState } from 'react';
import { getMyEvents } from '../../../utilities/api';

import { WithdrawInvoiceTableWrapper } from '../../../components';

export default function WithdrawInvoicesPage() {
	const [details, setDetails] = useState('')

	useEffect(() => {
		getMyEvents()
			.then((res) => setDetails(res.data))
			.catch((err) => console.error(err))
	}, [])

	return <WithdrawInvoiceTableWrapper details={details} />;
}
