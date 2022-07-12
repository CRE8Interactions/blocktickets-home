import { useSearchParams } from 'react-router-dom';

import { RefundTicketWrapper } from "../../components";

export default function RefundTicketPage() {

    // get queries from URL
    const [searchParams] = useSearchParams();

    const searchParamsObj = Object.fromEntries([...searchParams]);


    return (
        <RefundTicketWrapper orderId={searchParamsObj.order} ticketId={searchParamsObj.ticket} />
    )
}