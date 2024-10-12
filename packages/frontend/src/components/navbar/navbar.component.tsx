import React from 'react';
import { Link } from 'react-router-dom';

import { navbarStyles } from './navbar.styles';
import { useUserStore } from '~store/user.store';

const Navbar = ({ children }: { children: React.ReactNode }) => {
	const { user } = useUserStore();

	return (
		<div className={navbarStyles}>
			<div className="navbar">
				<div className="todo-logo">
					<Link to="/todos">
						<h1>TODOS</h1>
					</Link>
				</div>
				<Link to="/profile">
					<div className="navbar-profile-picture">
						{user?.name[0]}
					</div>
				</Link>
			</div>
			{children}
		</div>
	);
};

export default Navbar;
