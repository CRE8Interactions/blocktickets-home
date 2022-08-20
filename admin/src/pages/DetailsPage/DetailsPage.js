import { useParams } from "react-router-dom"

import { DetailsWrapper } from "../../components";

export default function DetailsPage() {

    const { uuid } = useParams()

    return (
        <DetailsWrapper eventId={uuid} />
    )
}