import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import './Room1ListItem.scss'


class Room1ListItem extends React.Component {

  clickHandler = () => {
    const { roomNumber, hallId } = this.props;

    localStorage.setItem("currentRoom", roomNumber);

    localStorage.setItem("currentHallId", hallId);
  }

  render() {
    const { hall: { title, description, imageURL } } = this.props;

    return (
      <div className="room-listitem">
        <Card className='card'>
          <CardActionArea>
            <CardMedia
              className='media'
              image={imageURL}
              title={title}
            />

            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {title}
              </Typography>
              <Typography component="p">
                {description}
              </Typography>
            </CardContent>
          </CardActionArea>

          <CardActions>
            <Button
              size="small"
              onClick={this.clickHandler}
              color="secondary"
              href='/room1'
            >
              Learn More
            </Button>
          </CardActions>
        </Card>
      </div>

    );
  }
}

export default Room1ListItem;