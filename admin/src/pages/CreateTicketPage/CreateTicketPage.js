import React, { useState, useEffect } from 'react';
import { useSearchParams, useParams } from "react-router-dom";

import { getEvent } from '../../utilities/api';

import { CreateTicketWrapper } from "../../components";

export default function CreateTicketPage() {

    // get type query from URL
    const [searchParams] = useSearchParams();

    const type = searchParams.get("type")

    const { uuid } = useParams()

    const [event, setEvent] = useState();

    useEffect(() => {
        getEvent(uuid)
            .then((res) => setEvent(res.data))
            .catch((err) => console.error(err))
    }, [uuid])

    return (
        <CreateTicketWrapper eventId={uuid} type={type} event={event} />
    )
}