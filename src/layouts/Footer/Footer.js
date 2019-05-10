import React from 'react';
import { Typography, Button, withStyles } from '@material-ui/core';

import './Footer.scss';

const styles = theme => ({
    margin: {
        margin: theme.spacing.unit,
    }
});

const Footer = (props) => {
    const { classes } = props;
    return (
        <div className="footer">
            <div>
                <Button href='/sign-in' variant='contained' color='secondary' className={classes.margin}>Sign In</Button>
                <Button href='/sign-up' variant='contained' color='secondary' className={classes.margin}>Sign Up</Button>
            </div>
            <Typography align='right' color='secondary'> Made by Yaroslav Antonchyk </Typography>
        </div>
    )
};

export default withStyles(styles)(Footer);