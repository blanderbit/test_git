import React from 'react';
import moment from 'moment';

import './DaySceduleCell.scss';
import Wrapper from '../../layouts/Wrapper'
import { Typography, IconButton } from '@material-ui/core';
import Cached from '@material-ui/icons/Cached';
import Delete from '@material-ui/icons/Delete';


const DaySceduleCell = (props) => {
  // const currentRoom = sessionStorage.getItem("currentRoom")
  // const { items } = JSON.parse(localStorage.getItem("data" + currentRoom)) || { items: [] };
  const { hours, currentDate, tickets, hallId } = props;
  const { date } = currentDate;
  const userId = localStorage.getItem("userId");
  const hallTickets = tickets.filter(ticket => ticket.hall_id === hallId);
  const usertickets = hallTickets.filter(ticket => ticket.user_id === userId);
  const isBookedTime = hallTickets.find(ticket => moment(date + 'T' + hours + ':01').isBetween(ticket.from, ticket.to, 'millisecond'));
  const isMineBooking = usertickets.find(ticket => moment(date + 'T' + hours + ':01').isBetween(ticket.from, ticket.to, 'millisecond'));

  return (
    <div className="cell">
      <div className="hours">{hours}:00- {hours + 1}:00</div>

      <div className={`mark ${isBookedTime ? 'booked' : 'free'} `} onClick={() => console.log('*****')}>
        {isMineBooking && (
          <Wrapper>
            <IconButton
              onClick={() => null}
              aria-label="Correct"
            >
              <Cached />
            </IconButton>

            <IconButton
              color='secondary'
              onClick={() => null}
              aria-label="Delete"
            >
              <Delete />
            </IconButton>
          </Wrapper>
        )}
      </div>     
    </div>
  );
}


export default DaySceduleCell;
