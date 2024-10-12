import React from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { useTodoStore } from '~store/todo.store';
import {
	activeButtonStyle,
	buttonStyle,
	paginationContainerStyle,
} from './pagination.styles';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = () => {
	const { totalPages } = useTodoStore((state) => state);
	const [searchParams, setSearchParams] = useSearchParams();
	const currentPage = parseInt(searchParams.get('page')) || 1;
	const isFirst = currentPage === 1;
	const isLast = currentPage === totalPages;

	const handlePageChange = (page) => {
		setSearchParams({ page: page.toString() });
	};

	return (
		<div className={paginationContainerStyle}>
			{!isFirst && (
				<button
					className={buttonStyle}
					onClick={() => handlePageChange(currentPage - 1)}
				>
					<ChevronLeft size={13} />
				</button>
			)}

			{Array.from({ length: totalPages }, (_, index) => (
				<button
					key={index + 1}
					className={classNames(
						buttonStyle,
						currentPage === index + 1 && activeButtonStyle,
					)}
					onClick={() => handlePageChange(index + 1)}
					disabled={currentPage === index + 1}
				>
					{index + 1}
				</button>
			))}

			{!isLast && (
				<button
					className={buttonStyle}
					onClick={() => handlePageChange(currentPage + 1)}
				>
					<ChevronRight size={13} />
				</button>
			)}
		</div>
	);
};

export default Pagination;
