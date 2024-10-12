import React from 'react';
import { useParams } from 'react-router-dom';
import { CircleArrowLeft, Edit, Trash } from 'lucide-react';

import Button from '~shared/components/button/button.component';
import { useTodoStore } from '~store/todo.store';
import { todoPageStyles } from './todo.styles';
import Loader from '~shared/components/loader/loader.component';
import { completionIcons } from '~shared/styles/icons';
import { useUserStore } from '~store/user.store';

const TodoPage: React.FC = () => {
	const { id } = useParams<{ id: string }>();

	const { todos, isLoading, error } = useTodoStore((state) => ({
		todos: state.todos,
		isLoading: state.isLoading,
		error: state.error,
	}));
	const { getTodoById, deleteTodo } = useTodoStore((state) => ({
		getTodoById: state.getTodoById,
		deleteTodo: state.deleteTodo,
	}));
	const { user } = useUserStore((state) => state);
	const userId = user?.id;

	const todo = todos.find((t) => t.id == id);
	const isOwner = Number(todo?.userId) === userId;

	React.useEffect(() => {
		const fetchTodo = async () => {
			if (id) {
				await getTodoById(id);
			}
		};

		fetchTodo();
	}, [id, getTodoById]);

	if (isLoading) {
		return <Loader />;
	}

	if (error) {
		return <div>{error}</div>;
	}

	const handleDeleteClick = () => {
		deleteTodo(todo.id);
		navigateBack();
	};

	const navigateBack = () => {
		window.history.back();
	};

	const handleEditClick = () => {
		window.location.href = `/todos/${todo.id}/edit`;
	};

	return (
		<main className={todoPageStyles}>
			<h1>{todo?.title}</h1>
			<p className="description">{todo?.description}</p>
			<div className="status">
				<div className="status-item">
					<span>Status:</span>
					{completionIcons[todo?.completed.toString()]}
				</div>
				<div className="status-item">
					<span>Private:</span>
					{completionIcons[todo?.private.toString()]}
				</div>
			</div>
			<div className="actions">
				{isOwner && (
					<>
						<Button
							text="Edit"
							icon={<Edit size={14} />}
							onClick={handleEditClick}
						/>
						<Button
							text="Delete"
							icon={<Trash size={14} />}
							onClick={handleDeleteClick}
						/>
					</>
				)}
			</div>
			<Button
				text="Back"
				icon={<CircleArrowLeft size={14} />}
				onClick={navigateBack}
			/>
		</main>
	);
};

export default TodoPage;
