import { useParams } from "react-router-dom"

import { BasicInfoWrapper } from "../../components";

export default function BasicInfoPage() {

    const { id } = useParams()

    return (
        <>
            <BasicInfoWrapper eventId={id} />
        </>
    )
}