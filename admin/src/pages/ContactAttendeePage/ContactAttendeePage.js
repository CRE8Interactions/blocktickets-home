import { useSearchParams } from "react-router-dom";

import { ContactAttendeeWrapper } from "../../components";

export default function ContactAttendeePage() {

    // get query from URL
    const [searchParam] = useSearchParams();

    const id = searchParam.get("id");

    return (
        <ContactAttendeeWrapper id={id} />
    )
}