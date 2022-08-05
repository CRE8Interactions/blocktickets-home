import { useSearchParams } from "react-router-dom";

import { TrackingLinkWrapper } from "../../components";

export default function TrackingLinkPage() {

    // get query from URL
    const [searchParam] = useSearchParams();

    const searchParamObj = Object.fromEntries([...searchParam]);

    return (
        <TrackingLinkWrapper id={searchParamObj.id} />
    )
}