import React, { useEffect, useState } from "react";
import { DashboardWrapper } from "../../components";
import { getEvent, getOrders, getEventStats } from "../../utilities/api";
import { Routes, Route, useParams } from 'react-router-dom';

export default function MyEventsPage() {
    let { uuid } = useParams();
    const [event, setEvent] = useState()
    const [orders, setOrders] = useState()
    const [stats, setStats] = useState()

    useEffect(() => {
        getEvent(uuid)
        .then((res) => {
            setEvent(res.data)
        })
        .catch(err => console.error(err))

        getOrders(uuid)
            .then((res) => setOrders(res.data))
            .catch((err) => console.error(err))

        getEventStats(uuid)
            .then((res) => setStats(res.data))
            .catch((err) => console.error(err))
    }, [])
    return (
        <DashboardWrapper event={event} orders={orders} stats={stats} />
    )
}