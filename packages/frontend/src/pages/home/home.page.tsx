import React from 'react';
import { useNavigate } from 'react-router-dom';
import { List, LogIn, User } from 'lucide-react';

import { homeStyles } from './home.styles';
import Button from '~shared/components/button/button.component';
import { ROUTER_KEYS } from '~shared/keys';

const HomePage = () => {
	const navigation = useNavigate();

	const navigateLogin = () => {
		navigation(ROUTER_KEYS.LOGIN);
	};

	const navigateRegister = () => {
		navigation(ROUTER_KEYS.REGISTER);
	};

	const navigateTodos = () => {
		navigation(ROUTER_KEYS.TODOS);
	};

	return (
		<main className={homeStyles}>
			<div className="home-container">
				<h1>
					Welcome to <span className="home-title">Todos</span>.
				</h1>
				<Button
					text="Login"
					icon={<LogIn size={14} />}
					onClick={navigateLogin}
				/>
				<Button
					text="Register"
					icon={<User size={14} />}
					onClick={navigateRegister}
				/>
				<Button
					text="Todos"
					icon={<List size={14} />}
					onClick={navigateTodos}
				/>
			</div>
		</main>
	);
};

export default HomePage;
