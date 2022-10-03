import { useSearchParams, useParams } from "react-router-dom";

import { TrackingLinkWrapper } from "../../components";

export default function TrackingLinkPage() {

    // get query from URL
    const [searchParam] = useSearchParams();

    const id = searchParam.get("id")

    const { uuid } = useParams()

    return (
        <TrackingLinkWrapper id={id} eventId={uuid} />
    )
}