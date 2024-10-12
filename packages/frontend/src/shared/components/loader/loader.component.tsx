import { LoaderCircle } from 'lucide-react';
import * as React from 'react';

import { loaderStyles } from './loader.styles';

const Loader: React.FunctionComponent = () => {
	const [dots, setDots] = React.useState('.');
	React.useEffect(() => {
		const interval = setInterval(() => {
			setDots((prevDots) => {
				if (prevDots === '...') {
					return '.';
				}
				return prevDots + '.';
			});
		}, 300);
		return () => clearInterval(interval);
	}, []);
	return (
		<div className={loaderStyles}>
			<LoaderCircle size={48} />
			<p>Loading{dots}</p>
		</div>
	);
};

export default Loader;
