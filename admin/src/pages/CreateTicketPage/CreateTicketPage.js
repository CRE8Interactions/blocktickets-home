import { useSearchParams } from "react-router-dom";

import { CreateTicketWrapper } from "../../components";

export default function CreateTicketPage() {

    // get queries from URL
    const [searchParam] = useSearchParams();

    const searchParamObj = Object.fromEntries([...searchParam]);

    return (
        <>
            <CreateTicketWrapper id={searchParamObj.id} />
        </>
    )
}