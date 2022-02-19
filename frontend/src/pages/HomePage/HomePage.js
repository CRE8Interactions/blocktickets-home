import React, { useContext, useEffect } from 'react';
// import UserContext from '../../context/User/user';
import { Events, Hero } from '../../components';

export default function HomePage() {
	// const user = useContext(UserContext);

	return (
		<main style={{ padding: '1rem 0' }}>
			<Hero />
			<Events />
		</main>
	);
}
