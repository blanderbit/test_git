import React from 'react';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import MyForm from '../../components/MyForm/MyForm';
import { signIn, authFail } from '../../redux/actions/auth';
import Page from '../../layouts/Page/Page';
import { Dialog, DialogTitle, Typography, Button } from '@material-ui/core';


class Login extends React.Component {

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
    const { email } = user;
    localStorage.setItem("email", email);

    this.props.onSubmit(user);
    console.log(user);

  }

  render() {
    const { isAuthenticated, err } = this.props;

    if (isAuthenticated) {
      return (
        <Redirect exact to='/' />
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
      <MyForm userRequest={this.handleRequest} formType="Login">
        <Typography align='center'> Have no account?</Typography>
        <Button
          href='/sign-up'
          variant='text'
          color='secondary'>
          Sign Up
        </Button>
      </MyForm>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: !!localStorage.getItem("token"),
    err: state.auth.err
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: (user) => dispatch(signIn(user)),
    onClose: () => dispatch(authFail(null))
  };
};

Login.propTypes = {
  isAuthenticated: PropTypes.bool,
  err: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

