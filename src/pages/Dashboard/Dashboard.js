import React from 'react';
import Page from '../../layouts/Page/Page';
import Room1ListItem from '../../components/RoomListItem/Room1ListItem';

import { rooms } from '../../data/rooms';
import './Dashboard.scss'

class Dashboard extends React.Component {
  state = {
    date: new Date(),
  }

  onChange = date => this.setState({ date })

  render() {
    const { roomItems } = rooms
    return (
      <Page >
        <div className="dashboard">
          {
            roomItems.map((room, idx) => (
              <Room1ListItem room={room} key={idx} />
            ))
          }
        </div>
      </Page>
    )
  }
}

export default Dashboard;