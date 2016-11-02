import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import * as types from './types';
import * as api from '../api/api';

export const employeeUpdate = ({ prop, value }) => {
  // prop references the input field on the form associated with
  // a prop of an employee, for instance "name"
  return {
    type: types.EMPLOYEE_UPDATE,
    payload: { prop, value }
  };
};

export const employeeCreate = ({ name, phone, shift }) => {
  const props = { name, phone, shift };
  return (dispatch) => {
    axios.post(`${api.API_ROUTE}/employee/create`, props)
      .then(() => {
        dispatch({ type: types.EMPLOYEE_CREATE });
        Actions.employeeList();
      })
      .catch(err => console.log(err));
    // firebase.database().ref(`/users/${currentUser.uid}/employees`)
    //   .push({ name, phone, shift })
    //   .then(() => {
    //     dispatch({ type: types.EMPLOYEE_CREATE });
    //     Actions.main();
    //   });
      // having a type of reset pushes the view back to employeeList
      // but removes the back arrow so that it does not appear as a view that
      // the user "advanced" to, it resets the view stack
  };
};

export const employeesFetch = () => {
  return (dispatch) => {
    // fetches all employees, need to add user ID as validation
    axios.get(`${api.API_ROUTE}/employee/fetchAll`)
      .then(employees => {
        dispatch({ type: types.EMPLOYEES_FETCH_SUCCESS, payload: employees });
      })
      .catch(err => console.log(err.stack));
    // firebase.database().ref(`/users/${currentUser.uid}/employees`)
    //   .on('value', snapshot => {
    //     // snapshot is not the actual data, it describes the returned data
    //     // to obtain the data we must call snapshot.val()
    //     dispatch({ type: types.EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() });
    //   });
  };
};

export const employeeEdit = ({ name, phone, shift, id }) => {
  const props = { name, phone, shift, id };
  return (dispatch) => {
    axios.patch(`${api.API_ROUTE}/employee/edit`, props)
      .then(() => {
        // clear out values in EmployeeForm
        dispatch({ type: types.EMPLOYEE_EDIT_SUCCESS });

        // push user back to EmployeeList with a reset view stack
        Actions.employeeList({ type: 'reset' });
      })
      .catch(err => {
        console.log(err.stack);
      });
  };
};

export const employeeDelete = ({ id }) => {
  const props = { id };

  return () => {
    axios.delete(`${api.API_ROUTE}/employee/delete`, props)
      .then((response) => {
        console.log(response);
        // push user back to EmployeeList and reset view stack
        Actions.employeeList({ type: 'reset' });
      })
      .catch(err => {
        console.log(err);
      });
  };
};
