import React from 'react';
import { Expand, Trash } from 'lucide-react';

import Button from '~shared/components/button/button.component';
import { todoActionsStyles } from './todo-actions.styles';
import Switch from '~shared/components/switch/switch.component';
import { useTodoStore } from '~store/todo.store';
import { TodoType } from '~/types/todos.type';
import { useUserStore } from '~store/user.store';

interface TodoActionsProps {
	todo: TodoType;
}

const TodoActions: React.FC<TodoActionsProps> = ({ todo }) => {
	const { deleteTodo, updateTodo } = useTodoStore((state) => ({
		deleteTodo: state.deleteTodo,
		updateTodo: state.updateTodo,
	}));

	const { user } = useUserStore((state) => state);
	const userId = user?.id;

	const isOwner = Number(todo?.userId) === userId;

	const handleViewClick = () => {
		window.location.href = `/todos/${todo.id}`;
	};

	const handleDeleteClick = () => {
		deleteTodo(todo.id);
	};

	const handleToggleCompleted = (newCompleted: boolean) => {
		updateTodo(todo.id, { completed: newCompleted });
	};

	return (
		<div className={todoActionsStyles}>
			<Button
				text="View"
				icon={<Expand size={14} />}
				onClick={handleViewClick}
			/>
			{isOwner && (
				<>
					<Button
						text="Delete"
						icon={<Trash size={14} />}
						onClick={handleDeleteClick}
					/>
					<Switch
						initialChecked={todo?.completed}
						onChange={handleToggleCompleted}
					/>
				</>
			)}
		</div>
	);
};

export default TodoActions;
