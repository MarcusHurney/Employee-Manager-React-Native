import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import { employeesFetch } from '../actions';
import EmployeeListItem from './EmployeeListItem';

class EmployeeList extends Component {
  componentWillMount() {
    const { userId } = this.props;
    this.props.employeesFetch(userId);

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

  renderRow(employee) {
    return <EmployeeListItem employee={employee} />;
  }

  render() {
    // renderRow is automatically passed employee as a prop via dataSource
    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

const mapStateToProps = state => {
  return { employees: state.employees, userId: state.auth.user };
};

export default connect(mapStateToProps, { employeesFetch })(EmployeeList);
