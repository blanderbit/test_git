import React from 'react';
import moment from 'moment';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Toolbar, withStyles, Button, Typography, Dialog, DialogTitle, TextField } from '@material-ui/core';

import { postTicket, putTicket, deleteTickets } from '../../redux/actions/tickets';
import '../../styles/index.scss';
import './EditBar.scss'

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%'
  },
  margin: {
    margin: theme.spacing.unit,
  },
  marginBottom: {
    marginBottom: 20
  }
});


class EditBar extends React.Component {
  state = {
    newDate: this.props.date,
    newStart: '10:00',
    newEnd: '11:00',
    open: false,
  }

  onChange = (e) => {
    const { name, value } = e.target;
    const { newDate } = this.state;

    if (name === "newStart") {
      this.setState({
        newEnd: moment(`${newDate}T${value}:00`).add(1, 'hours').format('HH:00')
      })
    }

    this.setState({
      [name]: value
    });
    console.log(this.state);
    console.log(this.props)

    sessionStorage.setItem([name], value);
  }

  handleOpen = () => {
    this.setState({
      newDate: this.props.date,
      newStart: '10:00',
      newEnd: '11:00',
      open: true
    });
  };

  handleClose = () => {
    this.setState({      
      open: false
    });
  };

  onAdd = e => {
    e.preventDefault();
    const { date, start, end } = this.props;

    this.props.postTicket({
      hall_id: localStorage.getItem("currentHallId"),
      user_id: localStorage.getItem("userId"),
      from: new Date(date + 'T' + start).getTime() + 1,
      to: new Date(date + 'T' + end).getTime() - 1,
      title: 'AAAAAA'
    });
  }

  onCorrect = e => {
    e.preventDefault();

    const { tickets, correctTicket, date, start } = this.props;
    const { newDate, newStart, newEnd } = this.state;
    let ticketId = null;

    tickets.forEach(ticket => {
      if (moment(`${date}T${start}:55`).isBetween(ticket.from, ticket.to, 'millisecond')) {
        ticketId = ticket._id
      }
    });

    correctTicket({
      hall_id: localStorage.getItem("currentHallId"),
      user_id: localStorage.getItem("userId"),
      from: new Date(`${newDate}T${newStart}`).getTime() + 1,
      to: new Date(`${newDate}T${newEnd}`).getTime() - 1,
    }, ticketId);

    this.setState({ open: false });
  }

  onDelete = e => {
    e.preventDefault();
    const { tickets, deleteTicket, date, start } = this.props;
    let ticketId = null;

    tickets.forEach(ticket => {
      if (moment(`${date}T${start}:55`).isBetween(ticket.from, ticket.to, 'millisecond')) {
        ticketId = ticket._id
      }
    });

    deleteTicket(ticketId);
  }

  render() {
    const { classes, tickets, isAuthenticated, date, start } = this.props;
    const { newDate, newStart, newEnd, open } = this.state;

    const currentHallId = localStorage.getItem("currentHallId");
    const userId = localStorage.getItem("userId");
    const isActive = tickets.some(ticket => {
      if (currentHallId === ticket.hall_id && userId === ticket.user_id) {
        return moment(`${date}T${start}:05`).isBetween(ticket.from, ticket.to, 'milliseconds')
      }
    });

    return (
      <div className={classes.root}>
        <Toolbar className="edit-bar">
          {isAuthenticated
            ? <Button
              type="submit"
              className={classes.margin}
              color='primary'
              variant='contained'
              onClick={this.onAdd}>
              Book the room
              </Button>
            : <Typography>
              <Button
                href='/sign-in'
                variant='text'
                className={classes.margin}
                color='secondary'>
                Login
                </Button>
              for book the room
              </Typography>
          }

          {isAuthenticated &&
            <div className="danger">
              <Button
                className={classes.margin}
                color='secondary'
                disabled={!isActive}
                variant='contained'
                onClick={this.handleOpen}>
                Correct ticket
              </Button>
              OR
              <Button
                className={classes.margin}
                color='secondary'
                disabled={!isActive}
                variant='contained'
                onClick={this.onDelete}>
                Delete ticket
              </Button>
            </div>
          }
        </Toolbar>

        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="simple-dialog-title" >
          <DialogTitle id="simple-dialog-title">Input new date</DialogTitle>

          <div className="flexbox col pd-20">
            <TextField
              id="date"
              label="Book room for date"
              type="date"
              name='newDate'
              value={newDate}
              className={classes.textField}
              inputProps={{ min: moment().format('YYYY-MM-DD') }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.onChange}
            />

            <TextField
              id="time"
              label="Start event"
              type="time"
              name="newStart"
              value={newStart}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{ min: "10:00", max: "18:00", step: "1" }}
              onChange={this.onChange}
            />

            <TextField
              id="time"
              label="End event"
              type="time"
              name='newEnd'
              value={newEnd}
              className={`${classes.textField} ${classes.marginBottom}`}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{ min: newStart, max: "18:00", step: "1" }}
              onChange={this.onChange}
            />

            <Button onClick={this.onCorrect} variant='contained' color='primary' className={classes.marginBottom}>Confirm</Button>

            <Button onClick={this.handleClose} variant='contained' color='secondary'>Cancel</Button>
          </div>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tickets: state.tickets.tickets
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postTicket: (user) => dispatch(postTicket(user)),
    correctTicket: (user, ticketId) => dispatch(putTicket(user, ticketId)),
    deleteTicket: (ticketId) => dispatch(deleteTickets(ticketId)),
  };
};

EditBar.propTypes = {
  classes: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  date: PropTypes.string,
  start: PropTypes.string,
  tickets: PropTypes.array.isRequired,
  postTicket: PropTypes.func.isRequired,
  correctTicket: PropTypes.func.isRequired,
  deleteTicket: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(EditBar));