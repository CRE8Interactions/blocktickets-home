import { useSearchParams, useParams } from "react-router-dom";

import { GuestInformationWrapper } from "../../components";

export default function GuestInformationPage() {

    // get query from URL
    const [searchParam] = useSearchParams();

    const { uuid } = useParams();

    const id = searchParam.get("id");

    return (
        <GuestInformationWrapper id={id} eventId={uuid} />
    )
}