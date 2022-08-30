import { useSearchParams } from "react-router-dom";

import { UserInformationWrapper } from "../../components";

export default function UserInformationPage() {

    // get query from URL
    const [searchParam] = useSearchParams();

    const id = searchParam.id;

    return (
        <UserInformationWrapper id={id} />
    )
}