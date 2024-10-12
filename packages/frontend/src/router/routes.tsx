import * as React from 'react';

import { ROUTER_KEYS } from '~shared/keys';

export const publicRoutes = [
	{
		path: ROUTER_KEYS.ALL_MATCH,
		element: React.lazy(() => import('~/pages/home/home.page')),
	},
	{
		path: ROUTER_KEYS.REGISTER,
		element: React.lazy(() => import('~/pages/register/register.page')),
	},
	{
		path: ROUTER_KEYS.LOGIN,
		element: React.lazy(() => import('~/pages/login/login.page')),
	},
	{
		path: ROUTER_KEYS.VERIFY,
		element: React.lazy(() => import('~/pages/verify/verify.page')),
	},
	{
		path: ROUTER_KEYS.FORGOT_PASSWORD,
		element: React.lazy(
			() => import('~/pages/forgot-password/forgot-password.page'),
		),
	},
	{
		path: ROUTER_KEYS.RESET_PASSWORD,
		element: React.lazy(
			() => import('~/pages/reset-password/reset-password.page'),
		),
	},
];

export const privateRoutes = [
	{
		path: ROUTER_KEYS.TODOS,
		element: React.lazy(() => import('~/pages/todos/todos.page')),
	},
	{
		path: ROUTER_KEYS.TODO,
		element: React.lazy(() => import('~/pages/todo/todo.page')),
	},
	{
		path: ROUTER_KEYS.EDIT_TODO,
		element: React.lazy(() => import('~/pages/edit-todo/edit-todo.page')),
	},
	{
		path: ROUTER_KEYS.PROFILE,
		element: React.lazy(() => import('~/pages/profile/profile.page')),
	},
];
