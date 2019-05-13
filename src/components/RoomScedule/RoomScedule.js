import React from 'react';
import moment from 'moment';
import { withStyles, TextField, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

import './RoomScedule.scss';
import DayScedule from '../DayScedule/DayScedule';
import Wrapper from '../../layouts/Wrapper';
import EditBar from '../EditBar/EditBar';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  }
});

class RoomScedule extends React.Component {
  state = {
    date: moment().format('YYYY-MM-DD'),
    start: '10:00',
    end: '11:00',
    open: false,
  }

  onChange = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
    sessionStorage.setItem([name], value)
  }

  render() {
    const { classes } = this.props;
    const { date, start, end } = this.state;
    const isAuthenticated = !!localStorage.getItem('token');

    return (
      <div>
        <form className="roomscedule" noValidate onSubmit={this.onAdd}>
          <div className="picker-container">
            <TextField
              id="date"
              label={(isAuthenticated ? "Book" : "Check") + " room for date"}
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

            {isAuthenticated && (
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

          <EditBar date={date} start={start} end={end} isAuthenticated={isAuthenticated} />

          <Typography variant='h4'>Scedule for {date}</Typography>

          <DayScedule currentDate={this.state} {...this.props} />

        </form>
      </div>
    )
  }
}

RoomScedule.propTypes = {
  classes: PropTypes.object.isRequired  
}

export default (withStyles(styles)(RoomScedule));

