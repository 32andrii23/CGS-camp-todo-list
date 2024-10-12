import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { loginStyles } from './login.styles';
import CustomForm from '~shared/components/form/form.component';
import { CustomInput } from '~shared/components/input/input.component';
import { loginSchema } from '~shared/validations/login.validation';
import { useUserStore } from '~store/user.store';
import { userStoreResponseMessages } from '~shared/response-messages';
import { ROUTER_KEYS } from '~shared/keys';

type LoginDataType = {
	email?: string;
	password?: string;
};

const LoginPage = () => {
	const navigate = useNavigate();

	const { login } = useUserStore();

	const {
		handleSubmit,
		reset,
		register,
		formState: { errors },
	} = useForm<LoginDataType>({
		resolver: yupResolver(loginSchema),
	});

	const onSubmit = async (data: LoginDataType) => {
		const response = await login(data);
		if (response === userStoreResponseMessages.login.error) {
			toast.error(userStoreResponseMessages.login.error);
		} else {
			reset();
			navigate(ROUTER_KEYS.TODOS);
		}
	};

	return (
		<main className={loginStyles}>
			<div className="login-container">
				<h1>Log in to your account</h1>
				<CustomForm
					handleSubmit={handleSubmit}
					onSubmit={onSubmit}
					buttonText="Login"
					buttonIcon={<User size={14} />}
				>
					<CustomInput
						id="email"
						{...register('email')}
						placeholder="Email"
						label="Email"
						type="email"
					/>
					<div className="error">{errors.email?.message}</div>
					<CustomInput
						id="password"
						{...register('password')}
						placeholder="Password"
						label="Password"
						type="password"
					/>
					<div className="error">{errors.password?.message}</div>
				</CustomForm>
				<div className="login-link">
					Forgot password?
					<Link to="/forgot-password">Click here</Link>
				</div>
				<div className="login-link">
					Don't have an account?
					<Link to="/register">Register</Link>
				</div>
			</div>
		</main>
	);
};

export default LoginPage;
