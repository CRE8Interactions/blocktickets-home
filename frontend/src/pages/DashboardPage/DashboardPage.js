import React, { useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidenav } from '../../components';
import UserContext from '../../context/User/user';
import authService from '../../utilities/services/auth.service';
import './DashboardPage.scss';
import { getMyOrganizations, createOrganization } from '../../utilities/api';
import OrganizationContext from '../../context/Organization/Organization';
import { CreateOrg } from '../../components';

export default function DashboardPage() {
	const token = useContext(UserContext)
	const [orgs, setOrgData] = useState([])
	const [sideNavEnabled, setSideNavEnabled] = useState(false)
	const headers = new Headers();

	useEffect(async () => {
		if (!authService.isOrganizer()) return
		getOrg()
	}, [])

	const getOrg = async () => {
		const orgs = await getMyOrganizations()
			.then(res => { setOrgData(res.data); res.data.length > 0 ? setSideNavEnabled(true) : setSideNavEnabled(false) })
			.catch(err => console.error(err))
	}

	const createOrg = async (data) => {
		await createOrganization(data)
			.then(res => getOrg())
			.catch(err => console.error(err))
	}

	const showOrgForm = (orgs) => {
		if (orgs.length >= 1) {
			return <Outlet />
		} else if (authService.isOrganizer()) {
			return <CreateOrg submission={createOrg} />
		}
	}

	return (
		<div className="row">
			{
				authService.isOrganizer() &&
				<Sidenav enabled={sideNavEnabled} />
			}
			<main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
				<div className="d-flex justify-content-between flex-wrap flex-md-nowrap pt-3 pb-2 mb-3 db-container">
					<OrganizationContext.Provider value={{ orgs }}>
						{showOrgForm(orgs)}
					</OrganizationContext.Provider>
				</div>
			</main>
		</div>
	);
}