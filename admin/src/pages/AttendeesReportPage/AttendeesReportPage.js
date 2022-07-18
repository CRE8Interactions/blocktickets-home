import { useSearchParams } from 'react-router-dom';

import { AttendeesReportWrapper } from "../../components";

export default function AttendeesReportPage() {

    // get queries from URL
    const [searchParams] = useSearchParams();

    const searchParamsObj = Object.fromEntries([...searchParams]);


    return (
        <AttendeesReportWrapper orderId={searchParamsObj.order} ticketId={searchParamsObj.ticket} />
    )
}