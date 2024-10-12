import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

import { forgotPasswordStyles } from './forgot-password.styles';
import CustomForm from '~shared/components/form/form.component';
import { CustomInput } from '~shared/components/input/input.component';
import { forgotPasswordSchema } from '~shared/validations/forgot-password.validation';
import { useUserStore } from '~store/user.store';
import { userStoreResponseMessages } from '~shared/response-messages';

type ForgotPasswordType = { email?: string };

const LoginPage = () => {
	const { forgotPassword } = useUserStore();

	const [active, setActive] = useState(false);

	const {
		handleSubmit,
		reset,
		register,
		formState: { errors },
	} = useForm<ForgotPasswordType>({
		resolver: yupResolver(forgotPasswordSchema),
	});

	const onSubmit = async (data: ForgotPasswordType) => {
		const response = await forgotPassword(data.email);
		if (response === userStoreResponseMessages.forgotPassword.error) {
			toast.error(userStoreResponseMessages.forgotPassword.error);
		} else {
			reset();
			setActive(true);
			setTimeout(() => setActive(false), 2000);
		}
	};

	useEffect(() => {
		const timeoutId = setTimeout(() => setActive(false), 2000);
		return () => clearTimeout(timeoutId);
	}, []);

	return (
		<main className={forgotPasswordStyles}>
			<div className="forgot-password-container">
				<h1>Send password reset link</h1>
				<CustomForm
					handleSubmit={handleSubmit}
					onSubmit={onSubmit}
					buttonText="Send reset link"
					buttonIcon={<Mail size={14} />}
				>
					<CustomInput
						id="email"
						{...register('email')}
						placeholder="Email"
						label="Email"
						type="email"
					/>
					<div className="error">{errors.email?.message}</div>
				</CustomForm>
				<div className="forgot-password-link">
					Go back?
					<Link to="/login">Click here</Link>
				</div>
			</div>
			<div
				className={`forgot-password-overlay ${active ? 'active' : ''}`}
			>
				Check your email for a link to reset your password.
			</div>
		</main>
	);
};

export default LoginPage;
