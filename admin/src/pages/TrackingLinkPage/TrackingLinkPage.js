import { useParams } from "react-router-dom";

import { TrackingLinkWrapper } from "../../components";

export default function TrackingLinkPage() {

    const { uuid } = useParams()

    return (
        <TrackingLinkWrapper eventId={uuid} />
    )
}