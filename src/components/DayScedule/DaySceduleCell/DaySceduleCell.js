import React from 'react';
import moment from 'moment';
import { connect } from "react-redux";


import './DaySceduleCell.scss';
import { Typography, Dialog, DialogTitle } from '@material-ui/core';

const DaySceduleCell = (props) => {
  // const currentRoom = sessionStorage.getItem("currentRoom")
  // const { items } = JSON.parse(localStorage.getItem("data" + currentRoom)) || { items: [] };
  const { hours, currentDate, tickets } = props;

  const { date } = currentDate;

  const currentHallId = localStorage.getItem("currentHallId");

  return (
    <div className="cell">
      <div className="hours">{hours}:00- {hours + 1}:00</div>

      <div className="mark ">
        {
          !!tickets && tickets.map((ticket, idx) => {

            const isActive = (
              moment(date + 'T' + hours + ':01').isBetween(ticket.from, ticket.to, 'millisecond') // true            )
            )

            if (ticket.hall_id === currentHallId) {
              return (
                isActive && <Typography key={idx} color='secondary'> Booked</Typography>
              )
            };
          })
        }
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    tickets: state.tickets.tickets,
    err: state.tickets.err,
  };
};


export default connect(
  mapStateToProps,
)(DaySceduleCell);

