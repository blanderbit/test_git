import React, { Component } from 'react';
import { Divider, Button, TextField } from '@material-ui/core';

class SignInForm extends Component {
    state = { 
        email: '',
        password: ''
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() { 
        return ( 
            <form>
                <TextField
                    id="outlined-email-input"
                    label="Email"
                    type="email"
                    name="email"
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleChange('email')}
                />
                <Divider />
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleChange('password')}
                />
                <Button variant='contained' type='submit'>Submit</Button>
            </form>
        );
    }
}
 
export default SignInForm;