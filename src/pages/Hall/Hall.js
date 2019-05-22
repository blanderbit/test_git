import React from 'react';
import { connect } from "react-redux";
import { Paper, Typography, withStyles, Avatar, Dialog, DialogTitle } from '@material-ui/core';
import PropTypes from 'prop-types';

import Page from '../../layouts/Page/Page';
import Spinner from '../../components/Spinner/Spinner';
import RoomScedule from '../../components/RoomScedule/RoomScedule';
import { getTickets, confirmErr } from '../../redux/actions/tickets';


const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 4,
    margin: 20
  },

  bigAvatar: {
    width: '100%',
    maxWidth: 360,
    height: 260,
    borderRadius: 10,
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
});

class Hall extends React.Component {

  state = {
    open: true,
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.confirmErr();
    this.handleOpen();
  };

  componentDidMount() {
    this.props.getTickets();
    console.log(this.props.halls)
  }

  render() {
    const {
      classes,
      hall,
      hallsErr,
      tickets,
      ticketsErr,
      hallsLoading,
      ticketsLoading,
    } = this.props;

    if (hallsLoading || ticketsLoading) {
      return (
        <Page>
          <Spinner />
        </Page>
      )
    }

    if (hallsErr || ticketsErr) {
      const err = hallsErr || ticketsErr;
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
      <Page>
        {hall && <Paper className={classes.root} elevation={1}>
          <Typography variant="title" component="h3">
            {hall.title}
          </Typography>

          <Avatar
            alt={hall.title}
            src={hall.imageURL}
            className={classes.bigAvatar}
          />

          <Typography variant='subtitle1'>
            {hall.description}
          </Typography>

          <RoomScedule tickets={tickets} hallId={hall._id} />
        </Paper>}
      </Page>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const hallId = ownProps.match.params.hall_id;

  return {
    hallsErr: state.halls.err,
    tickets: state.tickets.tickets,
    ticketsErr: state.tickets.err,
    hallsLoading: state.halls.isLoading,
    ticketsLoading: state.tickets.isLoading,
    hall: state.halls.halls.find(hall => hall._id === hallId),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTickets: () => dispatch(getTickets()),
    confirmErr: () => dispatch(confirmErr())
  };
};

Hall.propTypes = {
  hall: PropTypes.object,
  hallsErr: PropTypes.string,
  ticketsErr: PropTypes.string,
  hallsLoading: PropTypes.bool.isRequired,
  ticketsLoading: PropTypes.bool.isRequired,

  getTickets: PropTypes.func.isRequired,
  confirmErr: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Hall));

