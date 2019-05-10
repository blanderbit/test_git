import React from 'react';
import moment from 'moment';
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import './DaySceduleCell.scss';
import { Typography, Dialog, DialogTitle } from '@material-ui/core';

const DaySceduleCell = (props) => {
  // const currentRoom = sessionStorage.getItem("currentRoom")
  // const { items } = JSON.parse(localStorage.getItem("data" + currentRoom)) || { items: [] };
  const { hours, currentDate, tickets } = props;

  const { date } = currentDate;

  const currentHallId = localStorage.getItem("currentHallId");
  const userId = localStorage.getItem("userId");

  return (
    <div className="cell">
      <div className="hours">{hours}:00- {hours + 1}:00</div>

      <div className="mark ">
        {
          tickets.map((ticket, idx) => {
            const isBooked = moment(date + 'T' + hours + ':01').isBetween(ticket.from, ticket.to, 'millisecond')
            const isMine = ticket.user_id === userId;

            if (ticket.hall_id === currentHallId) {
              return (
                <div key={idx}>
                  {isBooked && <Typography color='secondary'> Booked</Typography>}
                  {isBooked && isMine && <Typography color='secondary'>(My Booking)</Typography>}
                </div>
              )
            };
          })
        }
      </div>
    </div>
  );
}

export default DaySceduleCell;
