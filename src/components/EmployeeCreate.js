import React, { Component } from 'react';
import { connect } from 'react-redux';
import { employeeUpdate, employeeCreate } from '../actions';
import { Card, CardSection, Button } from './common';
import EmployeeForm from './EmployeeForm';

class EmployeeCreate extends Component {
  onButtonPress() {
    // this.props.user is the currently logged in user
    const { name, phone, shift, userId } = this.props;
    // because shift is a string in the reducer, empty string produces a
    // falsey value, so this || works
    this.props.employeeCreate({ userId, name, phone, shift: shift || 'Monday' });
  }
  render() {
    // all the props from this component are passed to EmployeeForm via {...this.props}
    return (
      <Card>
        <EmployeeForm {...this.props} />
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Create
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  // get logged in user's ID
  const userId = state.auth.user;
  // get values of the employee form
  const { name, phone, shift } = state.employeeForm;
  return { name, phone, shift, userId };
};

export default connect(mapStateToProps, {
  employeeUpdate, employeeCreate
})(EmployeeCreate);
