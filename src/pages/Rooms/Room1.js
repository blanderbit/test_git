import React from 'react';
import { connect } from "react-redux";

import Page from '../../layouts/Page/Page';
import { Paper, Typography, withStyles, Avatar } from '@material-ui/core';
import RoomScedule from '../../components/RoomScedule/RoomScedule';
import { loadHalls } from '../../redux/actions/halls';


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

class Room1 extends React.Component {

  componentWillMount() {
    this.props.onLoad();
  }

  render() {
    const { classes, halls } = this.props;

    console.log(this.props);

    const currentRoom = + localStorage.getItem("currentRoom") || 0;

    console.log(halls[currentRoom]);

    return (
      <Page>
        {halls[currentRoom] && <Paper className={classes.root} elevation={1}>
          <Typography variant="h5" component="h3">
            {halls[currentRoom].title}
          </Typography>

          <Avatar
            alt={halls[currentRoom].heading}
            src=''
            className={classes.bigAvatar}
          />

          <Typography>
            {halls[currentRoom].description}
          </Typography>

          <RoomScedule />

        </Paper>}
      </Page>
    );
  }

}

const mapStateToProps = state => {
  return {
    halls: state.halls,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoad: () => dispatch(loadHalls()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Room1));

