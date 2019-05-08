import React from 'react';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import MyForm from '../../components/MyForm/MyForm';
import { signIn, authFail } from '../../redux/actions/auth';
import Page from '../../layouts/Page/Page';
import { Dialog, DialogTitle } from '@material-ui/core';


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
      <MyForm userRequest={this.handleRequest} formType="Login" />
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    err: state.auth.err
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: (user) => dispatch(signIn(user)),
    onClose: () => dispatch(authFail(null))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

