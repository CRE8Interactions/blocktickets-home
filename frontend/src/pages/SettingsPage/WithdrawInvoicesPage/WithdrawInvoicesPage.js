import React, { useEffect, useState } from 'react';
import { getMyEvents } from '../../../utilities/api';

import { WithdrawInvoicesWrapper } from '../../../components';


export default function WithdrawInvoicesPage() {
    const [details, setDetails] = useState('')

    useEffect(() => {
        getMyEvents()
            .then((res) => setDetails(res.data))
            .catch((err) => console.error(err))
    }, [])

    return <WithdrawInvoicesWrapper details={details} />;
}
