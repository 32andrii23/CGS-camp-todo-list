import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CirclePlus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';

import { useTodoStore } from '~store/todo.store';
import { createTodoStyles } from './create-todo.styles';
import CustomForm from '~shared/components/form/form.component';
import { todoSchema } from '~shared/validations/todo.validation';
import { CustomInput } from '~shared/components/input/input.component';
import { TodoType } from '~/types/todos.type';
import Switch from '~shared/components/switch/switch.component';
import { todoStoreResponseMessages } from '~shared/response-messages';
import { ROUTER_KEYS } from '~shared/keys';

type CreateTodoType = Partial<TodoType>;

const initialCompleted = false;
const initialPrivate = false;

const CreateTodo: React.FC = () => {
	const navigate = useNavigate();

	const { createTodo } = useTodoStore((state) => ({
		createTodo: state.createTodo,
	}));

	const {
		handleSubmit,
		reset,
		register,
		setValue,
		watch,
		formState: { errors },
	} = useForm<CreateTodoType>({
		resolver: yupResolver(todoSchema),
	});

	const onSubmit = async (data: CreateTodoType) => {
		const response = await createTodo(data);
		if (response === todoStoreResponseMessages.createTodo.error) {
			toast.error('Error creating todo');
		} else {
			reset();
			navigate(ROUTER_KEYS.TODOS);
		}
	};

	const completed = watch('completed', initialCompleted);
	const handleCompletedChange = (checked: boolean) =>
		setValue('completed', checked);

	const privateTodo = watch('private', initialPrivate);
	const handlePrivateChange = (checked: boolean) =>
		setValue('private', checked);

	return (
		<div className={createTodoStyles}>
			<h1 className="create-todo-title">Create Todo</h1>
			<CustomForm
				handleSubmit={handleSubmit}
				onSubmit={onSubmit}
				buttonText="Create Todo"
				buttonIcon={<CirclePlus size={14} />}
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
				<div className="error">{errors.description?.message}</div>
			</CustomForm>
		</div>
	);
};

export default CreateTodo;
