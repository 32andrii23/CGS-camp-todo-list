import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import {
	activeTabStyle,
	searchContainerStyle,
	tabButtonStyle,
	tabsContainerStyle,
} from './filters.styles';
import { CustomInput } from '~shared/components/input/input.component';

const tabs = ['All', 'Private', 'Public', 'Completed'];

const Filters = () => {
	const [activeTab, setActiveTab] = useState('All');
	const [searchParams, setSearchParams] = useSearchParams();
	const [searchText, setSearchText] = useState('');

	useEffect(() => {
		const status = searchParams.get('status') || 'all';
		const search = searchParams.get('search') || '';
		const capitalizedStatus =
			status.charAt(0).toUpperCase() + status.slice(1);

		setActiveTab(capitalizedStatus);
		setSearchText(search);
	}, [searchParams]);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSearchText(value);

		const statusParam = searchParams.get('status') || '';
		setSearchParams({
			search: value,
			status: statusParam,
		});
	};

	const handleTabClick = (tab: string) => {
		setActiveTab(tab);

		const searchParam = searchParams.get('search') || '';
		const statusParam = tab === 'All' ? '' : tab.toLowerCase();
		const params = {
			search: searchParam,
		};

		if (statusParam) params['status'] = statusParam;
		setSearchParams(params);
	};

	return (
		<>
			<div className={searchContainerStyle}>
				<div className="search-input">
					<CustomInput
						placeholder="Search by title..."
						id="search"
						value={searchText}
						onChange={handleSearchChange}
					/>
				</div>
			</div>
			<div className={tabsContainerStyle}>
				{tabs.map((tab) => (
					<button
						key={tab}
						className={classNames(
							tabButtonStyle,
							tab === activeTab && activeTabStyle,
						)}
						onClick={() => handleTabClick(tab)}
					>
						{tab}
					</button>
				))}
			</div>
		</>
	);
};

export default Filters;
