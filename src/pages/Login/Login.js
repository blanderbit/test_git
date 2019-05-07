import React from 'react';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import MyForm from '../../components/MyForm/MyForm';
import { signIn } from '../../redux/actions/auth';


class Login extends React.Component {

  handleRequest = (user) => {
    const { email } = user;
    localStorage.setItem("email", email);

    this.props.onSubmit(user);
    console.log(user);

  }

  render() {
    if (this.props.isAuthenticated) {
      return (
        <Redirect exact to='/' />
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: (user) => dispatch(signIn(user)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

