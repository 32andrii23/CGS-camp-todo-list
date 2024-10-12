import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { registerStyles } from './register.styles';
import CustomForm from '~shared/components/form/form.component';
import { UserType } from '~/types/user.type';
import { registerSchema } from '~shared/validations/register.validation';
import { CustomInput } from '~shared/components/input/input.component';
import { useUserStore } from '~store/user.store';
import { userStoreResponseMessages } from '~shared/response-messages';
import { ROUTER_KEYS } from '~shared/keys';

type RegisterDataType = Partial<UserType>;

const RegisterPage = () => {
	const navigate = useNavigate();

	const { register: registerUser } = useUserStore();

	const {
		handleSubmit,
		reset,
		register,
		formState: { errors },
	} = useForm<RegisterDataType>({
		resolver: yupResolver(registerSchema),
	});

	const onSubmit = async (data: RegisterDataType) => {
		const response = await registerUser(data);
		if (response === userStoreResponseMessages.register.error) {
			toast.error(userStoreResponseMessages.register.error);
		} else {
			reset();
			navigate(ROUTER_KEYS.LOGIN);
		}
	};

	return (
		<main className={registerStyles}>
			<div className="register-container">
				<h1>Create a new account</h1>
				<CustomForm
					handleSubmit={handleSubmit}
					onSubmit={onSubmit}
					buttonText="Register"
					buttonIcon={<User size={14} />}
				>
					<CustomInput
						id="name"
						{...register('name')}
						placeholder="Name"
						label="Name"
						type="text"
					/>
					<div className="error">{errors.name?.message}</div>
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
				<div className="register-link">
					Already have an account? <Link to="/login">Login</Link>
				</div>
			</div>
		</main>
	);
};

export default RegisterPage;
