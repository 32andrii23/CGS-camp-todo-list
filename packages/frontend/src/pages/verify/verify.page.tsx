import React from 'react';

import { verifyStyles } from './verify.styles';
import { useUserStore } from '~store/user.store';
import { Link, useLocation } from 'react-router-dom';
import Loader from '~shared/components/loader/loader.component';

const VerifyPage = () => {
	const location = useLocation();

	const { verifyUser, isLoading, error } = useUserStore();

	React.useEffect(() => {
		async function verify() {
			const searchParams = new URLSearchParams(location.search);
			const token = searchParams.get('token');

			if (token) {
				await verifyUser(token);
			}
		}
		verify();
	}, [verifyUser]);

	if (isLoading) {
		return <Loader />;
	}

	if (error) {
		return <main className={verifyStyles}>{error}</main>;
	}

	return (
		<main className={verifyStyles}>
			<div className="verify-container">
				Your account has been verified. You can now
				<Link to="/todos">interact with todos.</Link>
			</div>
		</main>
	);
};

export default VerifyPage;
