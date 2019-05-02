import React from 'react';
import { withStyles } from '@material-ui/core';
import Page from '../../layouts/Page/Page';
import Room1ListItem from '../../components/RoomListItem/Room1ListItem';


const styles = () => ({
  root: {
    width: '100%',
    maxWidth: 360,
  }
});


class Root extends React.Component {
  state = {
    date: new Date(),
  }

  onChange = date => this.setState({ date })

  render() {
    const {classes} = this.props;

    return (
      <Page className={classes.root}>
        <Room1ListItem />
        <Room1ListItem />
        <Room1ListItem />
        <Room1ListItem />
      </Page>
    )
  }
}

export default withStyles(styles)(Root);