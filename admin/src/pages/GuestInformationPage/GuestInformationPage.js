import { useParams } from "react-router-dom";

import { GuestInformationWrapper } from "../../components";

export default function GuestInformationPage() {

    const { uuid } = useParams();

    return (
        <GuestInformationWrapper eventId={uuid} />
    )
}