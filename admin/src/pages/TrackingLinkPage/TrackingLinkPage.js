import { useSearchParams } from "react-router-dom";

import { TrackingLinkWrapper } from "../../components";

export default function TrackingLinkPage() {

    // get query from URL
    const [searchParam] = useSearchParams();

    const id = searchParam.get("id")

    return (
        <TrackingLinkWrapper id={id} />
    )
}