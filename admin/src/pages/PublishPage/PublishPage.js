import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEvent } from "../../utilities/api";

import { PublishWrapper } from "../../components";

export default function PublishPage() {

    const { uuid } = useParams();

    const [event, setEvent] = useState();

    useEffect(() => {
        getEvent(uuid)
            .then((res) => setEvent(res.data))
            .catch((err) => console.error(err))
    }, [uuid])

    return (
        <PublishWrapper eventId={uuid} event={event} />
    )
}