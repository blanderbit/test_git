import React from 'react';
import { connect } from "react-redux";

import Page from '../../layouts/Page/Page';
import Room1ListItem from '../../components/RoomListItem/Room1ListItem';
// import { halls } from '../../data/rooms';

import './Dashboard.scss'
import { loadHalls } from '../../redux/actions/halls';
import Spinner from '../../components/Spinner/Spinner';
import { Dialog, DialogTitle } from '@material-ui/core';

class Dashboard extends React.Component {
  state = {
    open: true,
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    this.props.onLoad();
  }

  render() {

    let { halls, err, isLoading } = this.props;

    if (isLoading) {
      return (
        <Page >
          <Spinner />
        </Page>
      )
    }

    if (err) {
      return (
        <Page>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="simple-dialog-title" >
            <DialogTitle id="simple-dialog-title">{err}</DialogTitle>
          </Dialog>
        </Page>
      )
    }

    return (

      <Page >
        <div className="dashboard">
          {
            halls.map((hall, idx) => {
              return (
                <Room1ListItem hall={hall} key={idx} roomNumber={idx} hallId={hall._id} />
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
    halls: state.halls.halls,
    err: state.halls.err,
    isLoading: state.halls.isLoading,
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

