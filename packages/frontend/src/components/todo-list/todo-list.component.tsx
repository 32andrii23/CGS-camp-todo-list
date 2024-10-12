import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { listStyles, lastElementStyles } from './todo-list.styles';
import TodoActions from '~components/todo-actions/todo-actions.component';
import { completionIcons, privacyIcons } from '~shared/styles/icons';
import { useTodoStore } from '~store/todo.store';

const TodoList = () => {
	const { todos, total, totalPages } = useTodoStore();
	const [searchParams, setSearchParams] = useSearchParams();
	const currentPage = parseInt(searchParams.get('page'));
	const lastElement = React.useRef(null);
	const observer = React.useRef(null);

	const nextPage = () => {
		setSearchParams({ page: `${currentPage + 1}` });
	};

	React.useEffect(() => {
		const callback = (entries) => {
			if (entries[0].isIntersecting && currentPage < totalPages) {
				nextPage();
			}
		};

		observer.current = new IntersectionObserver(callback);
		observer.current.observe(lastElement.current);
	}, []);

	const scrollToCurrentPage = () => {
		window.scrollTo({
			top:
				lastElement.current.offsetTop -
				220 * (total > 10 ? total % 10 : total),
			behavior: 'instant',
		});
	};

	React.useEffect(() => {
		if (currentPage > 1) {
			scrollToCurrentPage();
		}
	}, [currentPage]);

	return (
		<>
			<ul className={listStyles}>
				{todos.map((todo) => (
					<li key={todo.id} className="todo-item">
						<div className="title-container">
							{completionIcons[todo.completed.toString()]}
							<span className="title">{todo.title}</span>
							{privacyIcons[todo.private.toString()]}
						</div>
						<p className="description">{todo.description}</p>
						<TodoActions todo={todo} />
					</li>
				))}
			</ul>
			<div ref={lastElement} className={lastElementStyles} />
		</>
	);
};

export default TodoList;
