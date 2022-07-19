import { useSearchParams } from "react-router-dom";

import { UserInformationWrapper } from "../../components";

export default function UserInformationPage() {

    // get query from URL
    const [searchParam] = useSearchParams();

    const searchParamObj = Object.fromEntries([...searchParam]);

    return (
        <UserInformationWrapper id={searchParamObj.id} />
    )
}