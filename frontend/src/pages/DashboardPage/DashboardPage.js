import React, { useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidenav } from '../../components';
import UserContext from '../../context/User/user';
import './DashboardPage.scss';
import { getMyOrganizations } from '../../utilities/api';
import OrganizationContext from '../../context/Organization/Organization';
import { CreateOrg } from '../../components';

export default function DashboardPage() {
	const token = useContext(UserContext)
	const [orgs, setOrgData] = useState([])
	const headers = new Headers();

	useEffect(async () => {
		getOrg()
	}, [])

	const getOrg = async () => {
		const orgs = await getMyOrganizations()
			.then(res => setOrgData(res.data))
			.catch(err => console.error(err))
	}

	const showOrgForm = (orgs) => {
		if (orgs.length >= 1) {
			return <Outlet />
		} else {
			return <CreateOrg />
		}
	}

	return (
		<div className="row">
			<Sidenav />
			<main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
				<div className="d-flex justify-content-between flex-wrap flex-md-nowrap pt-3 pb-2 mb-3">
					<OrganizationContext.Provider value={{ orgs }}>
						{showOrgForm(orgs)}
					</OrganizationContext.Provider>
				</div>
			</main>
		</div>
	);
}