import { useParams } from 'react-router-dom';

import { AttendeesListWrapper } from "../../components";

export default function AttendeesListPage() {

    const { uuid } = useParams()

    return (
        <AttendeesListWrapper eventId={uuid} />
    )
}