import React from 'react';

import { Paper, TextField, withStyles, Button } from '@material-ui/core';

import Page from '../../layouts/Page/Page';

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
  }
})

class MyForm extends React.Component {
  state = {
    email: '',
    password: '',
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

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
    const { email, password } = this.state;
    // const userId = localStorage.getItem("userId");

    return (
      <Page>
        <div className={classes.login}>
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
                color='secondary'
                type='submit'
                className={classes.button}
                disabled={!(email && password)}
              >
                {formType}
              </Button>
            </form>

            <div className={classes.margin}>
              {this.props.children}
            </div>

          </Paper>
        </div>
      </Page>
    );
  }

}

export default withStyles(styles)(MyForm);