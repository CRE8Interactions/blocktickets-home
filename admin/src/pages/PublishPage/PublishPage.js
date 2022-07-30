import { useParams } from "react-router-dom"

import { PublishWrapper } from "../../components";

export default function PublishPage() {

    const { id } = useParams()

    return (
        <>
            <PublishWrapper eventId={id} />
        </>
    )
}