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
        localStorage.removeItem("email");
        this.setState()
    }

    render() {
        const email = localStorage.getItem('email');

        return (
            <div className="header">
                <NavLink exact to='/'><Typography variant="h1">BOOKING-TEST</Typography></NavLink>
                <div className="controll">
                    {email
                        ? <Button onClick={this.handleOpen}><Typography color='secondary'>{email}</Typography><AccountCircle color='secondary' /></Button>
                        : <Button href='/sign-in' variant='contained' color='secondary'>Log In</Button>}
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
                            color='secondary'>
                            LogOut
                        </Button>
                    } />
            </div>
        );
    }

}

export default Header;