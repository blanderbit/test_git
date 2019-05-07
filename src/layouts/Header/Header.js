import React from 'react';
import { NavLink } from "react-router-dom";

import { Typography, Button, Snackbar } from "@material-ui/core";
import AccountCircle from '@material-ui/icons/AccountCircle';


import './Header.scss'

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

  handleLogOut = () => {
    localStorage.removeItem("token");
    this.setState()
  }

  render() {
    const token = localStorage.getItem('token');
    const useId = localStorage.getItem('useId');

    return (
      <div className="header">
        <NavLink exact to='/'><Typography variant="h1">BOOKING-TEST</Typography></NavLink>
        <div className="controll">
          {token
            ? <Button onClick={this.handleOpen}><Typography color='secondary'>email</Typography><AccountCircle color='secondary' /></Button>
            : <Button href='/sign-up' variant='contained' color='secondary'>Sign Up</Button>
          }
        </div>

        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: "right" }}
          open={this.state.open}
          onClose={this.handleClose}
          message={
            <Button
              href='/'
              onClick={this.handleLogOut}
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

export default Header;