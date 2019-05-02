import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        maxWidth: 345,
        margin: 10
    },
    media: {
        height: 140,
    },
};

const Room1ListItem = (props) => {
    const { classes } = props;
    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image="https://www.bird-office.com/media/cache/thumbPlaceImage/prod/place/location-salle-de-conference-pour-200-personnes-a-metz-1705151052112.jpeg"
                    title="Book conference room for 200 people"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Book conference room for 200 people
                    </Typography>
                    <Typography component="p">
                        Discover a large conference room that can accomodate up to 200 people. The presentation room is perfect for your professional event such as a conference, product presentation or seminar.
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" href='/room1'>
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
}

export default withStyles(styles)(Room1ListItem);