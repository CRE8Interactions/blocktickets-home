import { useParams } from "react-router-dom"

import { PublishWrapper } from "../../components";

export default function PublishPage() {

    const { uuid } = useParams()

    return (
        <>
            <PublishWrapper eventId={uuid} />
        </>
    )
}