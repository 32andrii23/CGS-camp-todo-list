import React from 'react';
import { Link } from 'react-router-dom';

import Navbar from '~components/navbar/navbar.component';
import { useUserStore } from '~store/user.store';
import { withAuthStyles } from './withAuth.styles';

const WithAuth = ({ children }: { children: React.ReactNode }) => {
	const { isAuthenticated } = useUserStore();

	return (
		<>
			{isAuthenticated ? (
				<Navbar>{children}</Navbar>
			) : (
				<div className={withAuthStyles}>
					<div className="error-container">
						<h1>You are not logged in.</h1>
						<Link to="/login">Login</Link>
					</div>
				</div>
			)}
		</>
	);
};

export default WithAuth;
