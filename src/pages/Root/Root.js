import React from 'react';
import { Link, List, withStyles, Button } from '@material-ui/core';
import Page from '../../layouts/Page/Page';
import Calendar from 'react-calendar'


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
    return (
      <Page>
        <Calendar
          onChange={this.onChange}
          value={this.state.date}
        />
      </Page>
    )
  }
}

export default withStyles(styles)(Root);