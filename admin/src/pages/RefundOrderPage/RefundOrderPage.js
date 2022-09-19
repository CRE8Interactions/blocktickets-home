import { useSearchParams } from 'react-router-dom';

import { RefundOrderWrapper } from "../../components";

export default function RefundOrderPage() {

    // get order id from URL
    const [searchParams] = useSearchParams();

    return (
        <RefundOrderWrapper orderId={searchParams.get("order")} />
    )
}