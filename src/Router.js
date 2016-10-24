import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import EmployeeList from './components/EmployeeList';
import EmployeeCreate from './components/EmployeeCreate';

const RouterComponent = () => {
  // if you pass Router a param called sceneStyle
  // it acts as a global style variable for all Scenes
  // that are its children

  // back and forward buttons will only exist within a single nest like auth or main
  // you can only navigate with Actions to the parent most Scene of a nest like auth or main

  // a scene's navigation bar is manipulated by passing it props
  return (
    <Router sceneStyle={{ paddingTop: 65 }}>
      <Scene key="auth">
        <Scene key="login" component={LoginForm} title="Please Login" />
      </Scene>
      <Scene key="main">
        <Scene
          onRight={() => Actions.employeeCreate()}
          rightTitle="Add Employee"
          key="employeeList"
          component={EmployeeList}
          title="Employees"
          initial
        />
      </Scene>
      <Scene
        key="employeeCreate"
        component={EmployeeCreate}
        title="Create Employee"
      />
    </Router>
  );
};

export default RouterComponent;
