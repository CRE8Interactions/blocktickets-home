import { useParams } from "react-router-dom"

import { DetailsWrapper } from "../../components";

export default function DetailsPage() {

    const { id } = useParams()

    return (
        <>
            <DetailsWrapper eventId={id} />
        </>
    )
}