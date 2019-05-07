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
    const { roomNumber } = this.props;

    sessionStorage.setItem("currentRoom", roomNumber)

    localStorage.setItem("currentRoom", roomNumber)
  }

  render() {
    const { hall: { title, description } } = this.props;

    return (
      <div className="room-listitem">
        <Card className='card'>
          <CardActionArea>
            <CardMedia
              className='media'
              image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6pCbrCEE95Wjx2hHuTi_G8neBVVdinnrkK9GqF8drnW9LnNOu6g'
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
              color="primary"
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