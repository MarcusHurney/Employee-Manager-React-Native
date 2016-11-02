import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';

class EmployeeListItem extends Component {
  componentWillMount() {

  }
  onRowPress() {
    // tell form which employee to show and navigate to the employee edit form
    // the employee edit form will have access to employee as a prop because
    // it's passed to the Actions.employeeCreate function below
    Actions.employeeEdit({ employee: this.props.employee });
  }
  render() {
    const { name } = this.props.employee;
    return (
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
        <View>
        <CardSection>
          <Text style={styles.titleStyle}>{name}</Text>
        </CardSection>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
};

export default EmployeeListItem;
