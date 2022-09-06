import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

import { getEventStats } from "../../utilities/api";

import { DashboardWrapper } from "../../components";

export default function MyEventsPage() {
    let { uuid } = useParams();

    const [stats, setStats] = useState()
    const [range, setRange] = useState({
        timePeriod: '24_hrs',
        type: 'primary'
    })

    useEffect(() => {
        getEventStats(uuid, range.timePeriod)
            .then((res) => setStats(res.data))
            .catch((err) => console.error(err))
    }, [range])

    return (
        <DashboardWrapper stats={stats} setRange={setRange} />
    )
}