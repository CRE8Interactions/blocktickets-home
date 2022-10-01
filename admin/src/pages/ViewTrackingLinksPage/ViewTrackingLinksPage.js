import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getPromoStats } from '../../utilities/api';

import { TrackingLinksWrapper } from "../../components";

export default function ViewTrackingLinksPage() {

    const { uuid } = useParams()

    const [promos, setPromos] = useState([])

    useEffect(() => {
        getPromoStats(uuid)
            .then((res) => setPromos(res.data))
            .catch((err) => console.error(err))

    }, [uuid])

    return (
        <TrackingLinksWrapper promos={promos} />
    )
}