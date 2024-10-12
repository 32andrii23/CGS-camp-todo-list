export const httpResponseMessages = {
  FETCH_ERROR: 'Error fetching. Please try again later.',
  ADD_ERROR: 'Error adding the todo. Please check the details and try again.',
  UPDATE_ERROR: 'Error updating the todo. Please try again.',
  DELETE_ERROR: 'Error deleting the todo. Please try again.',
  FETCH_SUCCESS: 'Todos fetched successfully.',
  ADD_SUCCESS: 'Todo added successfully.',
  UPDATE_SUCCESS: 'Todo updated successfully.',
  DELETE_SUCCESS: 'Todo deleted successfully.',
  REGISTER_ERROR: 'Error registering the user. Please check the details and try again.',
  LOGIN_ERROR: 'Error logging in. Please check the details and try again.',
  LOGOUT_ERROR: 'Error logging out. Please try again.',
  VERIFY_ERROR: 'Error verifying the user. Please try again.',
  FORGOT_PASSWORD_ERROR: 'Error sending the reset password email. Please try again.',
  RESET_PASSWORD_ERROR: 'Error resetting the password. Please try again.',
};

export const userStoreResponseMessages = {
  register: {
    success: "Registration successful! Welcome!",
    error: "Registration failed: The email address is already in use."
  },
  login: {
    success: "Login successful! Welcome back!",
    error: "Login failed: Incorrect username or password."
  },
  logout: {
    success: "Logout successful! See you soon!",
    error: "Logout failed: Unable to log out at the moment."
  },
  getMe: {
    success: "User information retrieved successfully!",
    error: "Failed to retrieve user information: Please try again later."
  },
  verifyUser: {
    success: "User verification successful! Your account is now verified.",
    error: "Verification failed: Invalid or expired token."
  },
  forgotPassword: {
    success: "Password reset email sent successfully!",
    error: "Forgot password failed: Email not found."
  },
  resetPassword: {
    success: "Password reset successful! You can now log in with your new password.",
    error: "Reset password failed: Invalid or expired token."
  },
  updateUser: {
    success: "User information updated successfully!",
    error: "Failed to update user information: Please try again later."
  }
};

export const todoStoreResponseMessages = {
  getTodos: {
    success: "Todos retrieved successfully!",
    error: "Failed to retrieve todos: Please try again later."
  },
  getTodoById: {
    success: "Todo retrieved successfully!",
    error: "Failed to retrieve todo: Todo not found or invalid ID."
  },
  createTodo: {
    success: "Todo created successfully!",
    error: "Failed to create todo: Please check the input and try again."
  },
  updateTodo: {
    success: "Todo updated successfully!",
    error: "Failed to update todo: Todo not found or invalid data."
  },
  deleteTodo: {
    success: "Todo deleted successfully!",
    error: "Failed to delete todo: Todo not found or invalid ID."
  }
}