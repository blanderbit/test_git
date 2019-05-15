import React from 'react';

import { Paper, TextField, withStyles, Button } from '@material-ui/core';

import Page from '../../layouts/Page/Page';
import './MyForm.scss'

const styles = () => ({
  login: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  margin: {
    margin: 20
  },
  form: {
    height: 260,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    display: 'flex',
    alignItems: 'center'
  }
})

class MyForm extends React.Component {
  state = {
    email: '',
    password: '',
    isVaild: true
  }

  handleChange = name => event => {
    this.checkValid()
    this.setState({ [name]: event.target.value });
  };

  checkValid = () => {
    const { email } = this.state;
    const regExp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    console.log(regExp.test(email));
    this.setState({
      isVaild: regExp.test(email)
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.userRequest(this.state);

    this.setState({
      email: '',
      password: '',
    });
  }

  render() {
    const { classes, formType } = this.props;
    const { email, password, isVaild } = this.state;
    // const userId = localStorage.getItem("userId");

    return (
      <Page>
        <div className={classes.login}>
          <Paper >
            <form onSubmit={this.handleSubmit} className={classes.form}>
              <TextField
                error={!isVaild}
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
                color='secondary'
                type='submit'
                className={classes.button}
                disabled={!(email && password && isVaild)}
              >
                {formType}
              </Button>
            </form>

            <div className={classes.margin + ' ' + classes.text}>
              {this.props.children}
            </div>

          </Paper>
        </div>
      </Page>
    );
  }

}

export default withStyles(styles)(MyForm);