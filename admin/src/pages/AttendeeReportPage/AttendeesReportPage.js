import { useSearchParams } from 'react-router-dom';

import { AttendeeReportWrapper } from "../../components";

export default function AttendeeReportPage() {

    // get queries from URL
    const [searchParams] = useSearchParams();

    const searchParamsObj = Object.fromEntries([...searchParams]);


    return (
        <AttendeeReportWrapper orderId={searchParamsObj.order} ticketId={searchParamsObj.ticket} />
    )
}