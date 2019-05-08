import React from 'react';
import { connect } from "react-redux";

import { Typography, Button, Dialog, DialogTitle } from '@material-ui/core';


import MyForm from '../../components/MyForm/MyForm';
import { signUp, authFail } from '../../redux/actions/auth';
import Page from '../../layouts/Page/Page';

class SignUp extends React.Component {

  state = {
    open: false,
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.onClose();
  };

  handleRequest = (user) => {
    this.props.onSubmit(user);
    console.log(user);
  }

  render() {
    const { isSignedUp, err } = this.props;

    if (isSignedUp) {
      return (
        <Page>
          <Typography align='center' variant='h3'>
            Account created please
          <Button
              href='/sign-in'
              variant='text'
              color='secondary'>
              Login
          </Button>
          </Typography>
        </Page>
      )
    }

    if (err) {
      console.log(err);

      return (
        <Page>
          <Dialog
            open={true}
            onClose={this.handleClose}
            aria-labelledby="simple-dialog-title" >
            <DialogTitle id="simple-dialog-title">{err}</DialogTitle>
          </Dialog>
        </Page>
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
    err: state.auth.err
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: ({ email, password }) => dispatch(signUp(email, password)),
    onClose: () => dispatch(authFail(null))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);