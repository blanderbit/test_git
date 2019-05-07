import React from 'react';
import Page from '../../layouts/Page/Page';
import { Paper, Typography, withStyles, Avatar } from '@material-ui/core';
import RoomScedule from '../../components/RoomScedule/RoomScedule';

import { rooms } from '../../data/rooms';


const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        margin: 20
    },

    bigAvatar: {
        width: '100%',
        maxWidth: 360,
        height: 260,
        borderRadius: 10
    },
});

const Room1 = (props) => {
    const { classes } = props;
    const { roomItems } = rooms;
    const currentRoom = + localStorage.getItem("currentRoom") || 0;
    console.log(currentRoom);


    return (
        <Page>
            <Paper className={classes.root} elevation={1}>
                <Typography variant="h5" component="h3">
                    {roomItems[currentRoom].heading}
                </Typography>

                <Avatar
                    alt={roomItems[currentRoom].heading}
                    src={roomItems[currentRoom].img}
                    className={classes.bigAvatar}
                />

                <Typography component="p">
                    {roomItems[currentRoom].text}
                </Typography>

                <RoomScedule />

            </Paper>
        </Page>
    );
}

export default withStyles(styles)(Room1);