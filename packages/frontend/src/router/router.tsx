import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import App from '~modules/app/app.module';
import { privateRoutes, publicRoutes } from './routes';
import Loader from '~shared/components/loader/loader.component';
import WithAuth from '~components/withAuth/withAuth.component';

const Router: React.FunctionComponent = () => {
	return (
		<BrowserRouter>
			<React.Suspense fallback={<Loader />}>
				<App>
					<Toaster />
					<Routes>
						{publicRoutes.map((route) => (
							<Route
								key={route.path}
								path={route.path}
								element={<route.element />}
							/>
						))}
						{privateRoutes.map((route) => (
							<Route
								key={route.path}
								path={route.path}
								element={
									<WithAuth>
										<route.element />
									</WithAuth>
								}
							/>
						))}
					</Routes>
				</App>
			</React.Suspense>
		</BrowserRouter>
	);
};

export default Router;
