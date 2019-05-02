import React from 'react';
import { Redirect } from "react-router-dom";

import { Paper, TextField, withStyles, Button } from '@material-ui/core';

import Page from '../../layouts/Page/Page';

const styles = () => ({
    margin: {
        margin: 20
    },
    form: {
        height: 200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
})

class Login extends React.Component {
    state = {
        email: '',
        password: '',
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();
        localStorage.setItem("email", this.state.email)
        this.setState({
            email: '',
            password: '',
        });
    }

    render() {
        const { classes } = this.props;
        const { email, password } = this.state;

        if (localStorage.getItem("email")) {
            return (
                <Redirect exact to='/' />
            )
        }

        return (
            <Page>
                <Paper >
                    <form onSubmit={this.handleSubmit} className={classes.form}>
                        <TextField
                            className={classes.margin}
                            name='email'
                            placeholder='Email'
                            value={email}
                            onChange={this.handleChange('email')} />
                        <br />

                        <TextField
                            className={classes.margin}
                            name='password'
                            type='password'
                            placeholder='Password'
                            value={password}
                            onChange={this.handleChange('password')} />
                        <br />

                        <Button
                            variant='contained'
                            type='submit'
                            className={classes.button}
                        >
                            LogIn
                        </Button>
                    </form>
                </Paper>
            </Page>
        );
    }

}

export default withStyles(styles)(Login);