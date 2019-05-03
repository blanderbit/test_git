import React from 'react';
import { Divider, Typography } from '@material-ui/core';

import './Footer.scss'

const Footer = () => (
    <div className="footer">
        <Divider />
        <Typography align='right' color='secondary'>Made by Yaroslav Antonchyk</Typography>
    </div>
);

export default Footer;