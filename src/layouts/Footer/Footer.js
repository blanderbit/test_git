import React from 'react';
import {Button} from '@material-ui/core'

const Footer = () => (
    <div className="footer">
        <Button href='/sign-in'>SignIn</Button>
        <Button href='/'>Sign Up</Button>
    </div>
);

export default Footer;