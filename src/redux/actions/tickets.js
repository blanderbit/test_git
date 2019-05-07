import * as actionTypes from './actionTypes'
import axios from "axios";

export const putTicket = (hall) => {
  return dispatch => {

    let url = 'http://ec2-3-84-16-108.compute-1.amazonaws.com:4000/tickets';

    console.log(hall);

    axios
      .put(url, hall)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const getTickets = () => {
  return dispatch => {

    let url = 'http://ec2-3-84-16-108.compute-1.amazonaws.com:4000/tickets';

    axios
      .get(url)
      .then(res => {
        console.log(res);
        const { tickets } = res.data;

        dispatch(getTicketsSuccess(tickets));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const getTicketsSuccess = (tickets) => {
  return {
    type: actionTypes.GET_TICKETS,
    tickets
  };
};


