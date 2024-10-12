import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftCircleIcon, Edit, LogOut } from 'lucide-react';

import { profileStyles } from './profile.styles';
import { useUserStore } from '~store/user.store';
import Button from '~shared/components/button/button.component';
import CustomModal from '~shared/components/modal/modal.component';
import EditProfile from '~components/edit-profile/edit-profile.component';
import { ROUTER_KEYS } from '~shared/keys';

const ProfilePage = () => {
	const [isModalOpen, setIsModalOpen] = React.useState(false);

	const navigate = useNavigate();
	const { user, logout } = useUserStore((state) => state);

	const handleLogout = async () => {
		navigate(ROUTER_KEYS.LOGIN);
		await logout();
	};

	const handleGoBack = () => {
		window.history.back();
	};

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	return (
		<main className={profileStyles}>
			<div className="profile-header">
				<div className="profile-info">
					<div className="profile-picture">
						<span className="profile-picture-letter">
							{user.name[0]}
						</span>
					</div>
					<div>
						<h1>{user.name}</h1>
						<p>{user.email}</p>
					</div>
				</div>
				<div className="profile-actions">
					<Button
						text="Logout"
						icon={<LogOut size={14} />}
						onClick={handleLogout}
					/>
					<Button
						text="Edit"
						icon={<Edit size={14} />}
						onClick={openModal}
					/>
					<CustomModal isVisible={isModalOpen} onClose={closeModal}>
						<EditProfile />
					</CustomModal>
				</div>
			</div>
			<Button
				text="Go back"
				icon={<ArrowLeftCircleIcon size={14} />}
				onClick={handleGoBack}
			/>
		</main>
	);
};

export default ProfilePage;
