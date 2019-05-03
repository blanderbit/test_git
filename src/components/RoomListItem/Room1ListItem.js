import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import './Room1ListItem.scss'


const Room1ListItem = (props) => {
    const { img, heading, text } = props.room;
    console.log(img);

    return (
        <div className="room-listitem">
            <Card className='card'>
                <CardActionArea>
                    <CardMedia
                        className='media'
                        image={img}
                        title={heading}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {heading}
                        </Typography>
                        <Typography component="p">
                            {text}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary" href='/room1'>
                        Learn More
                    </Button>
                </CardActions>
            </Card>
        </div>

    );
}

export default Room1ListItem;