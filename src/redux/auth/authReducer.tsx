// Reducer
export const authReducer = (state = { user: null, error: '' }, action) => {
  switch (action.type) {
    case 'LOGIN_FAILED':
      return {
        ...state,
        user: null,
        error: action.payload.error
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        error: ''
      };
    default:
      return state;
  }
};
