import { useState, useEffect } from 'react';

type ScreenType = 'desktop' | 'tablet' | 'mobile';

const getScreenType = (width: number): ScreenType => {
	const deviceType =
		width >= 1024 ? 'desktop' : width >= 768 ? 'tablet' : 'mobile';
	return deviceType;
};

const useScreenType = () => {
	const [screenType, setScreenType] = useState<ScreenType>(
		getScreenType(window.innerWidth),
	);

	useEffect(() => {
		const handleResize = () => {
			setScreenType(getScreenType(window.innerWidth));
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return screenType;
};

export default useScreenType;
