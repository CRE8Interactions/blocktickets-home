import { useSearchParams, useParams } from "react-router-dom";

import { CreateTicketWrapper } from "../../components";

export default function CreateTicketPage() {

    // get type query from URL
    const [searchParams] = useSearchParams();
    const type = searchParams.get("type")

    const { uuid } = useParams()

    return (
        <CreateTicketWrapper eventId={uuid} type={type} />
    )
}