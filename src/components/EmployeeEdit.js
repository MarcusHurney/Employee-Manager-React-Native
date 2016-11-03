import React, { Component } from 'react';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
import _ from 'lodash';
import EmployeeForm from './EmployeeForm';
import { employeeUpdate, employeeEdit, employeeDelete } from '../actions';
import { Card, CardSection, Button, Confirm } from './common';

class EmployeeEdit extends Component {
  state = { showModal: false };

  componentWillMount() {
    // we have access to the employee which needs to be edited
    // via the Action method which routed here
    // now the edit form below needs to be populated with the
    // employee's data
    _.each(this.props.employee, (value, prop) => {
      this.props.employeeUpdate({ prop, value });
    });
  }

  onButtonPress() {
    // pull name, phone, and shift from the employeeForm reducer
    // these will be the new props to save to the employee model
    const { name, phone, shift, userId } = this.props;
    this.props.employeeEdit({ userId, id: this.props.employee._id, name, phone, shift });
  }

  onTextPress() {
    const { phone, shift } = this.props;
    Communications.text(phone, `Your upcoming shift is on ${shift}`);
  }

  onAccept() {
    this.props.employeeDelete({ id: this.props.employee._id });
  }

  onDecline() {
    // hide Confirm Modal
    this.setState({ showModal: false });
  }

  render() {
    return (
      <Card>
        <EmployeeForm />
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Save Changes
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={this.onTextPress.bind(this)}>
            Text Schedule
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
            Fire Employee
          </Button>
        </CardSection>

        <Confirm
          visible={this.state.showModal}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
        >
          Are you sure you want to delete this employee?
        </Confirm>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  // id of logged in user
  const userId = state.auth.user;

  const { name, phone, shift } = state.employeeForm;

  return { name, phone, shift, userId };
};

export default connect(mapStateToProps, {
  employeeUpdate, employeeEdit, employeeDelete
 })(EmployeeEdit);
