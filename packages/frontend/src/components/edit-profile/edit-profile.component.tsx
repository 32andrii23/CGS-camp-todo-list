import { yupResolver } from '@hookform/resolvers/yup';
import { Save } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { UserType } from '~/types/user.type';
import CustomForm from '~shared/components/form/form.component';
import { CustomInput } from '~shared/components/input/input.component';
import { editProfileSchema } from '~shared/validations/edit-profile.validation';
import { useUserStore } from '~store/user.store';
import { editProfileStyles } from './edit-profile.styles';

type EditProfileType = Partial<UserType & { confirmPassword: string }>;

const EditProfile = () => {
	const navigate = useNavigate();

	const { user } = useUserStore((state) => state);
	const { updateUser } = useUserStore((state) => state);

	const {
		handleSubmit,
		reset,
		register,
		setValue,
		watch,
		formState: { errors },
	} = useForm<EditProfileType>({
		resolver: yupResolver(editProfileSchema),
		defaultValues: {
			name: user?.name ?? '',
			email: user?.email ?? '',
		},
	});

	const onSubmit = async (data: EditProfileType) => {
		await updateUser(data, user?.id.toString());
		reset();
		navigate(0);
	};

	return (
		<div className={editProfileStyles}>
			<h1 className="edit-profile-title">Edit Profile</h1>
			<CustomForm
				handleSubmit={handleSubmit}
				onSubmit={onSubmit}
				buttonText="Save Changes"
				buttonIcon={<Save size={14} />}
			>
				<CustomInput
					id="name"
					{...register('name')}
					placeholder="Name"
					label="Name"
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
			</CustomForm>
		</div>
	);
};

export default EditProfile;
