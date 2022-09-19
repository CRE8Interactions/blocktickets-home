import { useParams, useSearchParams } from 'react-router-dom';

import { RefundOrderWrapper } from "../../components";

export default function RefundOrderPage() {

    // get order id from URL
    const [searchParams] = useSearchParams();

    const { uuid } = useParams()

    return (
        <RefundOrderWrapper orderId={searchParams.get("order")} eventId={uuid} />
    )
}