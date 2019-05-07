import React from 'react';
import { connect } from "react-redux";

import Page from '../../layouts/Page/Page';
import Room1ListItem from '../../components/RoomListItem/Room1ListItem';
// import { halls } from '../../data/rooms';

import './Dashboard.scss'
import { loadHalls } from '../../redux/actions/halls';

class Dashboard extends React.Component {

  componentDidMount() {
    this.props.onLoad();
  }

  render() {
    // const { roomItems } = halls;

    let { halls } = this.props;
    console.log(halls);

    return (

      <Page >
        {/* <div className="dashboard">
          {
            roomItems.map((room, idx) => {
              return (
                <Room1ListItem room={room} key={idx} roomNumber={idx} />
              )
            })
          }
        </div> */}

        <div className="dashboard">
          {
            halls.map((hall, idx) => {
              console.log(hall);
              return (
                <Room1ListItem hall={hall} key={idx} roomNumber={idx} />
              )
            })
          }
        </div>
      </Page>
    )
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
)(Dashboard);

