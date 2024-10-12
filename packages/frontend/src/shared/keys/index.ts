export const enum ROUTER_KEYS {
	ALL_MATCH = '/*',
	TODOS = '/todos',
	TODO = '/todos/:id',
	EDIT_TODO = '/todos/:id/edit',
	PROFILE = '/profile',
	LOGIN = '/login',
	REGISTER = '/register',
	VERIFY = '/verify',
	FORGOT_PASSWORD = '/forgot-password',
	RESET_PASSWORD = '/change-password',
	NOT_FOUND = '/404',
}

export const STORAGE_KEYS = Object.freeze({
	ACCESS_TOKEN: 'user-store',
	SLIDER_INDEX: 'slider-index',
});
