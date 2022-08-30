import { useSearchParams } from "react-router-dom";

import { GuestInformationWrapper } from "../../components";

export default function GuestInformationPage() {

    // get query from URL
    const [searchParam] = useSearchParams();

    const id = searchParam.id;

    return (
        <GuestInformationWrapper id={id} />
    )
}