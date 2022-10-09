import { useParams } from "react-router-dom";

import { GuestListWrapper } from "../../components";

export default function ViewGuestListPage() {

    const { uuid } = useParams();

    return (
        <GuestListWrapper eventId={uuid} />
    )
}