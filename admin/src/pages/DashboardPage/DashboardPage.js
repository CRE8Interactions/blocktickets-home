import { Outlet } from 'react-router-dom';

import { Sidenav } from '../../components';

export default function DashboardPage() {

    return (
        <>
            <Sidenav />
            <div className='spacer-md'>
                <Outlet />
            </div>
        </>
    )
}