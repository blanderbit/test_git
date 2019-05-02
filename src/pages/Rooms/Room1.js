import React from 'react';
import Page from '../../layouts/Page/Page';
import { Paper, Typography, withStyles, Avatar } from '@material-ui/core';
import RoomScedule from '../../components/RoomScedule/RoomScedule';

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
    return (
        <Page>
            <Paper className={classes.root} elevation={1}>
                <Typography variant="h5" component="h3">
                    Book conference room for 200
                </Typography>

                <Avatar
                    alt="Room1"
                    src="https://www.bird-office.com/media/cache/thumbPlaceImage/prod/place/location-salle-de-conference-pour-200-personnes-a-metz-1705151052112.jpeg"
                    className={classes.bigAvatar}
                />

                <Typography component="p">
                    Discover a large conference room that can accomodate up to 200 people. The presentation room is perfect for your professional event such as a conference, product presentation or seminar.
                    Materials included in the booking of the conference room : unlimited WiFi access, video projector, projection screen and whiteboard. The minimum booking for this presentation room is half a day.
                    The conference room is located in Metz, close to shops, bars and restaurants. You will be about one hour by car from Luxembourg.
                </Typography>

                <RoomScedule />

            </Paper>
        </Page>
    );
}

export default withStyles(styles)(Room1);