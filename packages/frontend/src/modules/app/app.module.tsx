import * as React from 'react';

import { globalStyles } from './app.styles';

const App = ({ children }: { children: React.ReactNode }): React.ReactNode => {
	return (
		<>
			<div className={globalStyles}>{children}</div>
		</>
	);
};

export default App;
