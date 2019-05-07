import React from 'react';
import axios from "axios";
import { Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";



import MyForm from '../../components/MyForm/MyForm';
import Wrapper from '../../layouts/Wrapper'
import { Typography } from '@material-ui/core';

class SignUp extends React.Component {

    handleRequest = (user) => {
        // const { email, password } = user;

        console.log(user);
        axios
            .post('http://ec2-3-84-16-108.compute-1.amazonaws.com:4000/signUp', user)
            .then(res => {
                console.log(res);

                const { userId, email } = res.data;
                localStorage.setItem("userId", userId);
                localStorage.setItem("email", email);
            })
    }

    render() {
        if (localStorage.getItem("email")) {
            return (
                <Redirect exact to='/' />
            )
        }

        return (
            <Wrapper >
                <MyForm userRequest={this.handleRequest} formType="Sign Up" />
                <Typography>Already have account? <NavLink to="/sign-in">Login</NavLink></Typography>
            </Wrapper>
        )
    }
}

export default SignUp;