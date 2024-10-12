import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { KeyRound } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { resetPasswordStyles } from './reset-password.styles';
import CustomForm from '~shared/components/form/form.component';
import { UserType } from '~/types/user.type';
import { CustomInput } from '~shared/components/input/input.component';
import { resetPasswordSchema } from '~shared/validations/reset-password.validation';
import { useUserStore } from '~store/user.store';
import { ROUTER_KEYS } from '~shared/keys';

type ResetPasswordDataType = Partial<UserType & { confirmPassword: string }>;

const ResetPasswordPage = () => {
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const token = searchParams.get('token');

	const navigate = useNavigate();

	const { resetPassword } = useUserStore();

	const {
		handleSubmit,
		reset,
		register,
		formState: { errors },
	} = useForm<ResetPasswordDataType>({
		resolver: yupResolver(resetPasswordSchema),
	});

	const onSubmit = async (data: ResetPasswordDataType) => {
		await resetPassword(token, data.password);
		reset();
		navigate(ROUTER_KEYS.LOGIN);
	};

	return (
		<main className={resetPasswordStyles}>
			<div className="reset-password-container">
				<h1>Reset your password</h1>
				<CustomForm
					handleSubmit={handleSubmit}
					onSubmit={onSubmit}
					buttonText="Reset password"
					buttonIcon={<KeyRound size={14} />}
				>
					<CustomInput
						id="password"
						{...register('password')}
						placeholder="Password"
						label="Password"
						type="password"
					/>
					<div className="error">{errors.password?.message}</div>
					<CustomInput
						id="confirmPassword"
						{...register('confirmPassword')}
						placeholder="Confirm password"
						label="Confirm password"
						type="password"
					/>
					<div className="error">
						{errors.confirmPassword?.message}
					</div>
				</CustomForm>
				<div className="reset-password-link">
					Go back?
					<Link to="/login">Click here</Link>
				</div>
			</div>
		</main>
	);
};

export default ResetPasswordPage;
