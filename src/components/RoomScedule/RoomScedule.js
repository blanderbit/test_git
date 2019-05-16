import React from 'react';
import moment from 'moment';
import { withStyles, TextField, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

import './RoomScedule.scss';
import DayScedule from '../DayScedule/DayScedule';
import Wrapper from '../../layouts/Wrapper';
import EditBar from '../EditBar/EditBar';
import Calendar from '../MyCalendar/MyCalendar';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: 400,
    marginBottom: 20
  }
});

class RoomScedule extends React.Component {
  state = {
    date: sessionStorage.getItem("date") || moment().format('YYYY-MM-DD'),
    start: '10:00',
    end: '11:00',
    open: false,
  }

  onChangeTime = (e) => {
    const { name, value } = e.target;
    const { date } = this.state;

    if (name === "start") {
      this.setState({
        end: moment(`${date}T${value}:00`).add(1, 'hours').format('HH:00')
      })
    }

    this.setState({
      [name]: value
    });
    sessionStorage.setItem([name], value);
  }

  onChangeDay = (date) => {
    this.setState({
      date
    })
  }

  onChangeMonth = () => {
    // const { getTickets } = this.props;
    // getTickets();
  }

  render() {
    const { date, start, end } = this.state;
    const isAuthenticated = !!localStorage.getItem('token');

    return (
      <div>
        <form className="roomscedule" noValidate onSubmit={this.onAdd}>
          <div className="picker-container">
            <Calendar
              onChangeDay={(date) => this.onChangeDay(date)}
              onChangeMonth={this.onChangeMonth}
            />

            {isAuthenticated && (
              <Wrapper>
                <TextField
                  id="time"
                  label="Start event"
                  type="time"
                  name="start"
                  value={start}
                  className='textfield'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{ min: "10:00", max: "17:00", step: "1" }}
                  onChange={this.onChangeTime}
                />
                <TextField
                  id="time"
                  label="End event"
                  type="time"
                  name='end'
                  value={end}
                  className='textfield'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{ min: moment(`${date}T${start}:00`).add(1, 'hours').format('HH:00'), max: "18:00", step: "1" }}
                  onChange={this.onChangeTime}
                />
              </Wrapper>)
            }
          </div>

          <EditBar
            date={date}
            start={start}
            end={end}
            isAuthenticated={isAuthenticated}
          />

          <Typography variant='h4' align='center'>Scedule for {date}</Typography>

          <DayScedule currentDate={this.state} {...this.props} />

        </form>
      </div>
    )
  }
}

RoomScedule.propTypes = {
  classes: PropTypes.object.isRequired,
  getTickets: PropTypes.func.isRequired
}

export default (withStyles(styles)(RoomScedule));

