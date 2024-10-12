import React from 'react';

import { tableStyles } from './todo-table.styles';
import TodoActions from '~components/todo-actions/todo-actions.component';
import { completionIcons, privacyIcons } from '~shared/styles/icons';
import { useTodoStore } from '~store/todo.store';
import Pagination from '~components/pagination/pagination.component';

const TodoTable = () => {
	const tableHeaders = ['Title', 'Description', 'Actions'];

	const { todos } = useTodoStore();

	return (
		<>
			<table className={tableStyles}>
				<thead>
					<tr>
						{tableHeaders.map((header) => (
							<th key={header}>{header}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{todos.map((todo, index) => (
						<tr key={todo.id}>
							<td className="title">
								{completionIcons[todo.completed.toString()]}
								{todo.title}
								{privacyIcons[todo.private.toString()]}
							</td>
							<td>{todo.description}</td>
							<td>
								<TodoActions todo={todo} />
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<Pagination />
		</>
	);
};

export default TodoTable;
