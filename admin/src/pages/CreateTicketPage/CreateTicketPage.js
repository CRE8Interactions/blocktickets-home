import { useSearchParams, useParams } from "react-router-dom";

import { CreateTicketWrapper } from "../../components";

export default function CreateTicketPage() {

    // get queries from URL
    const [searchParam] = useSearchParams();

    const searchParamObj = Object.fromEntries([...searchParam]);

    const { uuid } = useParams()

    return (
        <CreateTicketWrapper eventId={uuid} id={searchParamObj.id} />
    )
}