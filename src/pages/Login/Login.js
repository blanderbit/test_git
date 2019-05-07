import React from 'react';
import { Redirect } from "react-router-dom";
import axios from "axios";


import MyForm from '../../components/MyForm/MyForm';


class Login extends React.Component {

  handleRequest = (user) => {
    // const { email, password } = user;

    console.log(user);
    axios
      .post('http://ec2-3-84-16-108.compute-1.amazonaws.com:4000/signIn', user)
      .then(res => {
        console.log(res);

        const { token } = res.data;
        localStorage.setItem("token", token)
      })
  }

  render() {
    if (localStorage.getItem("token")) {
      return (
        <Redirect exact to='/' />
      )
    }

    return (
      <MyForm userRequest={this.handleRequest} formType="Login" />
    )
  }

}

export default Login;