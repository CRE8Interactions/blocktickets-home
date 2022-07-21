import { useSearchParams } from "react-router-dom";

import { ContactAttendeeWrapper } from "../../components";

export default function ContactAttendeePage() {

    // get query from URL
    const [searchParam] = useSearchParams();

    const searchParamObj = Object.fromEntries([...searchParam]);

    return (
        <ContactAttendeeWrapper id={searchParamObj.id} />
    )
}