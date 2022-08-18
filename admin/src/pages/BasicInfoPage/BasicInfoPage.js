import { useParams } from "react-router-dom"

import { BasicInfoWrapper } from "../../components";

export default function BasicInfoPage() {

    const { uuid } = useParams()

    return (
        <>
            <BasicInfoWrapper eventId={uuid} />
        </>
    )
}