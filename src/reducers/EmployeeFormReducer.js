import * as types from '../actions/types';

const INITIAL_STATE = { name: '', phone: '', shift: '' };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.EMPLOYEE_UPDATE:
      // action.payload = { prop: 'name', value: 'Jane' }
      // below uses key interpolation to construct state object
      return { ...state, [action.payload.prop]: action.payload.value };

    case types.EMPLOYEE_CREATE:
      return INITIAL_STATE;
      
    default:
      return state;
  }
};
