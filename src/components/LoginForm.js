import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser, logoutUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';


class LoginForm extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }
  onLoginPress() {
    // pull value from text boxes via redux state
    const { email, password } = this.props;
    // call login action creator
    this.props.loginUser({ email, password });
  }
  onLogoutPress() {
    this.props.logoutUser();
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    } else if (this.props.user) {
      return (
        <Button onPress={this.onLogoutPress.bind(this)}>
          Logout
        </Button>
      );
    }
    return (
      <Button onPress={this.onLoginPress.bind(this)}>
        Login
      </Button>
    );
  }

  render() {
    console.log(this.props.user);
    return (
      <Card>
        <CardSection>
          <Input
            label="email"
            placeholder="email@gmail.com"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            label="password"
            placeholder="password"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.props.error}
        </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading, user } = auth;

  return { email, password, error, loading, user };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser, logoutUser
})(LoginForm);
