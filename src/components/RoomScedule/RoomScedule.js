import React from 'react';
import moment from 'moment'
import { connect } from "react-redux";
import PropTypes, { func } from 'prop-types';

import './RoomScedule.scss'
import DayScedule from '../DayScedule/DayScedule';
import { withStyles, TextField, Button, Typography, Dialog, DialogTitle } from '@material-ui/core';
import Wrapper from '../../layouts/Wrapper';
import { putTicket, getTickets, deleteTickets } from '../../redux/actions/tickets';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  margin: {
    margin: theme.spacing.unit,
  }
});

class RoomScedule extends React.Component {
  state = {
    date: moment().format('YYYY-MM-DD'),
    start: '10:00',
    end: '11:00',
    open: false,
  }

  handleOpen = () => {
    this.setState({
      open: true,
      isBooked: false
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onChange = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  onAdd = e => {
    const { date, start, end } = this.state;

    e.preventDefault();

    this.props.putTicket({
      hall_id: localStorage.getItem("currentHallId"),
      user_id: localStorage.getItem("userId"),
      from: new Date(date + 'T' + start).getTime() + 1,
      to: new Date(date + 'T' + end).getTime() - 1,
      title: 'AAAAAA'
    });
  }

  onDelete = e => {
    e.preventDefault();

    const { date, start, end } = this.state;

    const { tickets } = this.props;

    let ticketId = null;

    tickets.forEach(ticket => {
      // console.log(moment(`${date}T${start}:55`).isBetween(ticket.from, ticket.to, 'millisecond'));

      if (moment(`${date}T${start}:55`).isBetween(ticket.from, ticket.to, 'millisecond')) {
        ticketId = ticket._id
      }
    });

    console.log(ticketId);


    this.props.deleteTicket({
      hall_id: localStorage.getItem("currentHallId"),
      user_id: localStorage.getItem("userId"),
      from: new Date(date + 'T' + start).getTime() + 1,
      to: new Date(date + 'T' + end).getTime() - 1,
    }, ticketId);
  }

  render() {
    const { classes } = this.props;
    const { date, start, end } = this.state;
    const email = localStorage.getItem('email');

    return (
      <div>
        <form className="roomscedule" noValidate onSubmit={this.onAdd}>
          <div className="picker-container">
            <TextField
              id="date"
              label={(email ? "Book" : "Check") + " room for date"}
              type="date"
              name='date'
              value={date}
              className={classes.textField}
              inputProps={{ min: moment().format('YYYY-MM-DD') }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.onChange}
            />
            {email && (
              <Wrapper>
                <TextField
                  id="time"
                  label="Start event"
                  type="time"
                  name="start"
                  value={start}
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
                  name='end'
                  value={end}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{ min: start, max: "18:00", step: "1" }}
                  onChange={this.onChange}
                />
              </Wrapper>)
            }
          </div>

          <DayScedule currentDate={this.state} {...this.props} />

          {email
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
          {email && <Button
            className={classes.margin}
            color='secondary'
            variant='contained'
            onClick={this.onDelete}>
            Delete ticket
          </Button>}
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    tickets: state.tickets.tickets
  };
};

const mapDispatchToProps = dispatch => {
  return {
    putTicket: (user) => dispatch(putTicket(user)),
    deleteTicket: (user, ticketId) => dispatch(deleteTickets(user, ticketId)),
  };
};

RoomScedule.propTypes = {
  isAuthenticated: PropTypes.bool,

  putTicket: PropTypes.func.isRequired,
  deleteTicket: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(RoomScedule));

