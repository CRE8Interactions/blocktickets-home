
import { useParams } from 'react-router-dom';

import OrdersWrapper from "./../../components/OrdersWrapper/OrdersWrapper";

export default function AllOrdersPage() {

    const { uuid } = useParams()

    return (
        <OrdersWrapper eventId={uuid} />
    )
}