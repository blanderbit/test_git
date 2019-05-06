import React from 'react';
import moment from 'moment';

import './DaySceduleCell.scss';
import { Typography } from '@material-ui/core';

const DaySceduleCell = (props) => {
  const currentRoom = sessionStorage.getItem("currentRoom")

  const { items } = JSON.parse(localStorage.getItem("data" + currentRoom)) || { items: [] };

  const { hours, currentDate } = props

  const { date } = currentDate;

  return (
    <div className="cell">
      <div className="hours">{hours}:00-{hours + 1}:00</div>

      <div className="mark ">
        {
          items.map((event, idx) => {
            const isActive = (
              moment(date + 'T' + hours + ':01').isBetween(event.date + 'T' + event.start, event.date + 'T' + event.end, 'minute') // true            )
            )
            return (
              isActive && <Typography key={idx} color='secondary'> Booked</Typography>
            )
          })
        }
      </div>

    </div>
  );
}

export default DaySceduleCell;