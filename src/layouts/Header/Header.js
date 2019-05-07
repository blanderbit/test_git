import React from 'react';
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";


import { Typography, Button, Snackbar } from "@material-ui/core";
import AccountCircle from '@material-ui/icons/AccountCircle';

import './Header.scss'
import { logout } from '../../redux/actions/auth';

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

    return (
      <div className="header">
        <NavLink exact to='/'><Typography variant="h1">BOOKING-TEST</Typography></NavLink>

        <div className="controll">
          <Button onClick={this.handleOpen}>
            {token && <Typography color='secondary'>{email}</Typography>}
            <AccountCircle color='secondary' />
          </Button>
        </div>

        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: "right" }}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

