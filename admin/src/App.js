import { useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import Router from './Router';

import authService from './utilities/services/auth.service';
import UserContext from './context/User/User';
import OrganizationContext from './context/Organization/Organization';
import { getMyOrganizations, createOrganization } from './utilities/api';

import { Navigation, CreateOrg } from './components';

function App() {
	const user = authService.getUser();
	const [
		authenticated,
		setAuthenticated
	] = useState(false);
	const [
		orgs,
		setOrgData
	] = useState([]);
	const [
		sideNavEnabled,
		setSideNavEnabled
	] = useState(false);
	const myOrgs = useContext(OrganizationContext);

	// useEffect(() => {
	// 	if (user) getOrg();
	// }, []);

	const getOrg = () => {
		myOrgs
			.getOrgs()
			.then((res) => {
				setOrgData(res.data);
				res.data.length === 0 ? setSideNavEnabled(false) : setSideNavEnabled(true);
			})
			.catch((err) => console.error(err));
	};

	const createOrg = async (data) => {
		await createOrganization(data).then((res) => getOrg()).catch((err) => console.error(err));
	};

	const showHome = (orgs) => {
		if (orgs && orgs.length === 0) {
			return <CreateOrg submission={createOrg} />;
		}
		else {
			return <Outlet />;
		}
	};

	return (
		<div className="App">
			<UserContext.Provider value={{ authenticated, setAuthenticated, user }}>
				<Navigation />
				<div className="container">
					<Router />
				</div>
			</UserContext.Provider>
		</div>
	);
}

export default App;
