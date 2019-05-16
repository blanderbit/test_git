import React from 'react';
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Typography, Button, Snackbar, withStyles } from "@material-ui/core";
import AccountCircle from '@material-ui/icons/AccountCircle';

import './Header.scss'
import { logout } from '../../redux/actions/auth';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  }
});

class Header extends React.Component {
  state = {
    open: false
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  // handleLogOut = () => {
  //   localStorage.removeItem("token");
  //   this.setState()
  // }

  render() {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    const { classes } = this.props;

    let controlls = (
      <div>
        <Button href='/sign-in' variant='contained' color='secondary' className={classes.margin}>Sign In</Button>
        <Button href='/sign-up' variant='contained' color='secondary' className={classes.margin}>Sign Up</Button>
      </div>
    )

    if (token) {
      controlls = (
        <div>
          <div className="controll">
            <Button onClick={this.handleOpen}>
              {token && <Typography color='secondary'>{email}</Typography>}
              <AccountCircle color='secondary' />
            </Button>
          </div>

          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={this.state.open}
            onClose={this.handleClose}
            message={
              <Button
                href='/'
                onClick={this.props.onLogOut}
                variant='contained'
                color='secondary'
              >
                LogOut
            </Button>
            } />
        </div>
      )
    }

    return (
      <div className="header">
        <NavLink exact to='/'><Typography variant="h1">BOOKING-TEST</Typography></NavLink>

        {controlls}
      </div>
    );
  }
}

const mapStateToProps = state => {

  return {
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogOut: () => dispatch(logout()),
  };
};

Header.propTypes = {
  token: PropTypes.string,
  onLogOut: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Header));

