import * as types from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  error: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  // a new state object must be returned for each action
  // the new state and the old state refer to the same object in memory
  // so you can't mutate state directly and return it, redux will think
  // nothing had changed due to their shared location in memory
  switch (action.type) {
    case types.EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case types.PASSWORD_CHANGED:
      return { ...state, password: action.payload };

    case types.LOGIN_USER_START:
      return { ...state, loading: true, error: '' };
    case types.LOGIN_USER_SUCCESS:
      return {
        ...state,
        ...INITIAL_STATE,
        user: action.payload.data.user_id,
      };
    case types.LOGIN_USER_FAIL:
      return {
        ...state,
        error: 'Authentication Failed',
        password: '',
        loading: false
      };

    case types.SIGNUP_USER_START:
      return { ...state, loading: true, error: '' };
    case types.SIGNUP_USER_SUCCESS:
      return {
        ...state,
        ...INITIAL_STATE,
        user: action.payload.data.user_id,
      };
    case types.SIGNUP_USER_FAIL:
      return {
        ...state,
        error: 'Could not create new account',
        password: '',
        loading: false
      };

    case types.LOGOUT_USER_SUCCESS:
      return { ...INITIAL_STATE };
    default:
      return state;
  }
};
