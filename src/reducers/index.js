// root reducer
import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import EmployeeFormReducer from './EmployeeFormReducer';
import EmployeeReducer from './EmployeeReducer';

export default combineReducers({
  employeeForm: EmployeeFormReducer,
  auth: AuthReducer,
  employees: EmployeeReducer
});
