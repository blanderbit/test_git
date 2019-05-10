import * as actionTypes from './actionTypes'
import axios from "axios";
import moment from 'moment';


const url = 'http://ec2-3-84-16-108.compute-1.amazonaws.com:4000/tickets';

export const putTicket = (hall) => {
  return dispatch => {
    const config = {
      headers: {
        'Authorization': localStorage.getItem("token")
      }
    }
    dispatch(getTicketsInit());
    const { from } = hall;
    console.log(from);

    if (new Date().getTime() < from) {
      axios
        .post(url, hall, config)
        .then(res => {
          dispatch(getTickets());
        })
        .catch(err => {
          dispatch(getTicketsFail(err.message));
        });
    } else {
      dispatch(getTicketsFail("This time is already past"))
    }


  };
};

export const getTickets = () => {
  return dispatch => {
    dispatch(getTicketsInit());
    axios
      .get(url)
      .then(res => {
        console.log(res);
        const tickets = res.data;
        dispatch(getTicketsSuccess(tickets));
      })
      .catch(err => {
        console.log(err);
        dispatch(getTicketsFail(err.message));
      });
  };
};

export const deleteTickets = (hall, ticketId) => {
  return dispatch => {
    const config = {
      headers: {
        'Authorization': localStorage.getItem("token")
      }
    }
    console.log(`${url}/${ticketId}`);

    axios
      .delete(`${url}/${ticketId}`, config)
      .then(res => {
        console.log(res);
        dispatch(getTickets());
      })
      .catch(err => {
        console.log(err);
        dispatch(getTicketsFail(err.message));
      });
  };
};

export const getTicketsInit = () => {
  return {
    type: actionTypes.GET_TICKETS_INIT,
  };
};

export const getTicketsSuccess = (tickets) => {
  return {
    type: actionTypes.GET_TICKETS_SUCCESS,
    tickets
  };
};

export const getTicketsFail = (err) => {
  return {
    type: actionTypes.GET_TICKETS_FAIL,
    err
  };
};

export const confirmErr = () => {
  return {
    type: actionTypes.ERR_CONFIRM,
  };
};

