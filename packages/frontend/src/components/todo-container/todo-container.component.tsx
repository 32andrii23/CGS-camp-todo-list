import React from 'react';
import { useSearchParams } from 'react-router-dom';

import TodoTable from '../todo-table/todo-table.component';
import TodoSlider from '../todo-slider/todo-slider.component';
import TodoList from '../todo-list/todo-list.component';
import { useTodoStore } from '~store/todo.store';
import useScreenType from '~shared/hooks/useScreenType';
import { containerStyles } from './todo-container.styles';
import Loader from '~shared/components/loader/loader.component';

const TodoContainer: React.FC = () => {
	const [searchParams] = useSearchParams();
	const deviceType = useScreenType();

	const { todos, isLoading } = useTodoStore((state) => ({
		todos: state.todos,
		isLoading: state.isLoading,
	}));
	const getTodos = useTodoStore((state) => state.getTodos);

	React.useEffect(() => {
		getTodos(searchParams.toString(), deviceType !== 'desktop');
	}, [getTodos, searchParams]);

	if (todos.length === 0) {
		return (
			<div className={containerStyles}>
				<h1>No todos have been found!</h1>
			</div>
		);
	}

	if (isLoading) {
		return <Loader />;
	}

	const componentMap: Record<string, React.FC> = {
		desktop: TodoTable,
		tablet: TodoSlider,
		mobile: TodoList,
	};

	const ComponentToRender = componentMap[deviceType] || TodoList;
	return (
		<div className={containerStyles}>
			<ComponentToRender />
		</div>
	);
};

export default TodoContainer;
