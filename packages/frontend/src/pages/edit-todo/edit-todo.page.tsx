import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CircleArrowLeft, Edit } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Button from '~shared/components/button/button.component';
import { useTodoStore } from '~store/todo.store';
import { editTodoPageStyles } from './edit-todo.styles';
import Loader from '~shared/components/loader/loader.component';
import CustomForm from '~shared/components/form/form.component';
import { todoSchema } from '~shared/validations/todo.validation';
import { TodoType } from '~/types/todos.type';
import { CustomInput } from '~shared/components/input/input.component';
import Switch from '~shared/components/switch/switch.component';
import { useUserStore } from '~store/user.store';
import { ROUTER_KEYS } from '~shared/keys';

type EditTodoType = Partial<TodoType>;

const EditTodoPage: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	const { todos, isLoading, error, getTodoById, updateTodo } = useTodoStore(
		(state) => ({
			todos: state.todos,
			isLoading: state.isLoading,
			error: state.error,
			getTodoById: state.getTodoById,
			updateTodo: state.updateTodo,
		}),
	);
	const todo = todos.find((t) => t.id == id);

	const { user } = useUserStore((state) => state);
	const userId = user?.id;

	React.useEffect(() => {
		if (todos.length > 0 && Number(todo?.userId) !== userId) {
			navigate(ROUTER_KEYS.TODOS);
		}
	}, [todo, userId]);

	const {
		handleSubmit,
		reset,
		register,
		setValue,
		watch,
		formState: { errors },
	} = useForm<EditTodoType>({
		defaultValues: {
			title: todo?.title ?? '',
			description: todo?.description ?? '',
		},
		resolver: yupResolver(todoSchema),
	});

	useEffect(() => {
		const fetchTodo = async () => {
			if (id) {
				await getTodoById(id);
			}
		};

		fetchTodo();

		setValue('title', todo?.title ?? '');
		setValue('description', todo?.description ?? '');
	}, [id, getTodoById, todo]);

	const navigateBack = () => {
		window.history.back();
	};

	if (isLoading) {
		return <Loader />;
	}

	if (error) {
		return <div>{error}</div>;
	}

	const onSubmit = async (data: EditTodoType) => {
		await updateTodo(todo?.id, data);
		navigateBack();
	};

	const initialCompleted = todo?.completed ?? false;
	const initialPrivate = todo?.private ?? false;

	const completed = watch('completed', initialCompleted);
	const handleCompletedChange = (checked: boolean) =>
		setValue('completed', checked);

	const privateTodo = watch('private', initialPrivate);
	const handlePrivateChange = (checked: boolean) =>
		setValue('private', checked);

	return (
		<main className={editTodoPageStyles}>
			<h1>Edit Todo</h1>
			{todo && (
				<CustomForm
					handleSubmit={handleSubmit}
					onSubmit={onSubmit}
					buttonText="Save Changes"
					buttonIcon={<Edit size={14} />}
				>
					<CustomInput
						id="title"
						{...register('title')}
						placeholder="Title"
						label="Title"
					/>
					<div className="error">{errors.title?.message}</div>
					<CustomInput
						id="description"
						{...register('description')}
						placeholder="Description"
						label="Description"
					/>
					<Switch
						label="Private"
						onChange={handlePrivateChange}
						initialChecked={privateTodo}
					/>
					<Switch
						label="Completed"
						onChange={handleCompletedChange}
						initialChecked={completed}
					/>
				</CustomForm>
			)}
			<div className="action-btn">
				<Button
					text="Back"
					icon={<CircleArrowLeft size={14} />}
					onClick={navigateBack}
				/>
			</div>
		</main>
	);
};

export default EditTodoPage;
