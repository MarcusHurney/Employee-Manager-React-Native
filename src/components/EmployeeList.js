import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ListView } from 'react-native';
import { employeesFetch } from '../actions';

class EmployeeList extends Component {
  componentWillMount() {
    this.props.employeesFetch();

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // nextProps are the props the component is about to receive
    // this.props are still the old props
    this.createDataSource(nextProps);
  }

  createDataSource({ employees }) {
    // the props object should always have a key called employees
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(employees);
  }

  render() {
    return (
      <View>
        <Text>Hello From Employee List</Text>
        <Text>Hello From Employee List</Text>
        <Text>Hello From Employee List</Text>
        <Text>Hello From Employee List</Text>
        <Text>Hello From Employee List</Text>
        <Text>Hello From Employee List</Text>
        <Text>Hello From Employee List</Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    employees: state.employees.employees
  };
};

export default connect(mapStateToProps, { employeesFetch })(EmployeeList);
