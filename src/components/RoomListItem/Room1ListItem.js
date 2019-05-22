import React from 'react';
import { Link } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import './Room1ListItem.scss'


class Room1ListItem extends React.Component {

  clickHandler = () => {
    const { roomNumber, hall: { _id } } = this.props;
    localStorage.setItem("currentRoom", roomNumber);
    localStorage.setItem("currentHallId", _id);
  }

  render() {
    const { hall: { title, description, imageURL, _id } } = this.props;

    return (
      <div className="room-listitem">
        <Card className='card'>
          <Link to={`/hall/${_id}`}>
            <CardActionArea
              onClick={this.clickHandler}
            >
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
          </Link>
        </Card>
      </div>
    );
  }
}

export default Room1ListItem;