import React, { Component } from 'react';
import moment from 'moment';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { TextField, withStyles, IconButton } from '@material-ui/core';
import { postTicket } from '../../redux/actions/tickets';
import Delete from '@material-ui/icons/Delete';


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
  },
  container: {
    color: 'red'
  },
  textField: {
    color: 'red'
  }
});

class FormBooking extends Component {
  state = {
    date: this.props.date,
    start: '10:00',
    end: '11:00',
    title: '',
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
  }

  onAdd = e => {
    e.preventDefault();
    const { date, start, end, title } = this.state;

    this.props.postTicket({
      hall_id: localStorage.getItem("currentHallId"),
      user_id: localStorage.getItem("userId"),

      from: new Date(date + 'T' + start).getTime() + 1,
      to: new Date(date + 'T' + end).getTime() - 1,
      title
    });
  }

  render() {
    const { classes, tickets, isAuthenticated, date, hallId } = this.props;
    const { title, start, end, open } = this.state;

    return (
      <div className="flexbox col pd-20">
        <TextField
          id="title"
          label="Title"
          type="text"
          name='title'
          value={title}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={this.onChange}
        />

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
          className={`${classes.textField} ${classes.marginBottom}`}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{ min: start, max: "18:00", step: "1" }}
          onChange={this.onChange}
        />

<IconButton
              color='secondary'
              onClick={() => null}
              aria-label="Delete"
            >
              <Delete />
            </IconButton>
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
    postTicket: (user) => dispatch(postTicket(user))
  };
};

FormBooking.propTypes = {
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
)(withStyles(styles)(FormBooking));