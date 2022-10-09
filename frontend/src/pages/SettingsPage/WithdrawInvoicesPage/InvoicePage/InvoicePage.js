import React, {useEffect, useState} from 'react';
import { getMyEvents } from '../../../../utilities/api';

import { Invoice } from '../../../../components'

export default function InvoicePage() {

    const [details, setDetails] = useState('')

    useEffect(() => {
        getMyEvents()
            .then((res) => setDetails(res.data))
            .catch((err) => console.error(err))
    }, [])

    return (
        <Invoice details={details} />
    );
}
