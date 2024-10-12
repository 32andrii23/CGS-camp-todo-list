import { CirclePlus } from 'lucide-react';
import * as React from 'react';

import TodoContainer from '~/components/todo-container/todo-container.component';
import Button from '~shared/components/button/button.component';
import { todosStyles } from './todos.styles';
import CustomModal from '~shared/components/modal/modal.component';
import CreateTodo from '~components/create-todo/create-todo.component';
import Filters from '~components/filters/filters.component';

const TodosPage: React.FunctionComponent = () => {
	const [isModalOpen, setModalOpen] = React.useState(false);

	const openModal = () => setModalOpen(true);
	const closeModal = () => setModalOpen(false);

	return (
		<main className={todosStyles}>
			<h1>Browse your todos</h1>
			<div className="action-btn">
				<Button
					text="Create Todo"
					icon={<CirclePlus size={14} />}
					onClick={openModal}
				/>
				<CustomModal isVisible={isModalOpen} onClose={closeModal}>
					<CreateTodo />
				</CustomModal>
			</div>
			<Filters />
			<TodoContainer />
		</main>
	);
};

export default TodosPage;
