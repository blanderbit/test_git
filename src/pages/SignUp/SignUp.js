import React from 'react';
import { connect } from "react-redux";

import { Typography, Button } from '@material-ui/core';


import MyForm from '../../components/MyForm/MyForm';
import { signUp } from '../../redux/actions/auth';

class SignUp extends React.Component {

  handleRequest = (user) => {

    this.props.onSubmit(user);
    console.log(user);

  }

  render() {
    if (this.props.isSignedUp) {
      return (
        <Typography align='center' variant='h3'>
          Account created please
          <Button
            href='/sign-in'
            variant='text'
            color='secondary'>
            Login
          </Button>
        </Typography>
      )
    }

    return (
      <MyForm userRequest={this.handleRequest} formType="Sign Up">
        <Typography align='center'>
          Have an account?
          <Button
            href='/sign-in'
            variant='text'
            color='secondary'>
            Login
          </Button>
        </Typography>
      </MyForm>
    )
  }
}

const mapStateToProps = state => {
  return {
    isSignedUp: state.auth.userId !== null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: ({ email, password }) => dispatch(signUp(email, password)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);