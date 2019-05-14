import * as actionTypes from './actionTypes'
import axios from "axios";
import moment from 'moment';
// import moment from 'moment';

const url = 'http://ec2-3-84-16-108.compute-1.amazonaws.com:4000/tickets';
const putUrl = 'http://ec2-3-84-16-108.compute-1.amazonaws.com:4000/ticket';
const config = {
  headers: {
    'Authorization': localStorage.getItem("token")
  }
}

export const postTicket = (hall) => {
  return dispatch => {
    dispatch(getTicketsInit());
    const { from, to } = hall;

    if (new Date().getTime() > from) {
      dispatch(getTicketsFail("This time is already past"))
    } else if (from > to) {
      dispatch(getTicketsFail("End must be later then start"))
    } else {
      axios
        .post(url, hall, config)
        .then(res => {
          dispatch(getTickets());
        })
        .catch(err => {
          dispatch(getTicketsFail(err.message));
        });
    }
  };
};

export const putTicket = (hall, ticketId) => {
  return dispatch => {
    dispatch(getTicketsInit());
    const { from, to } = hall;

    if (new Date().getTime() > from) {
      dispatch(getTicketsFail("This time is already past"))
    } else if (from > to) {
      dispatch(getTicketsFail("End must be later then start"))
    } else {
      axios
        .put(`${putUrl}/${ticketId}`, { from, to }, config)
        .then(() => {
          dispatch(getTickets());
        })
        .catch(err => {
          dispatch(getTicketsFail(err.message));
        });
    }
  };
};

export const getTickets = () => {
  const date = sessionStorage.getItem("date") || moment().format('YYYY-MM-DD')
  const from = new Date(`${date}T10:00`).getTime();
  const to = new Date(`${date}T18:00`).getTime();
  console.log(from);

  return dispatch => {
    dispatch(getTicketsInit());
    axios
      // .get(`${url}`)
      .get(`${url}params/${from}/${to}`)
      .then(res => {
        const tickets = res.data;
        dispatch(getTicketsSuccess(tickets));
        console.log(tickets);
      })
      .catch(err => {
        dispatch(getTicketsFail(err.message));
      });
  };
};

export const deleteTickets = (ticketId) => {
  return dispatch => {
    axios
      .delete(`${url}/${ticketId}`, config)
      .then(res => {
        dispatch(getTickets());
      })
      .catch(err => {
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

