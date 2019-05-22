import * as actionTypes from './actionTypes'
import axios from "axios";

const url = 'http://ec2-35-175-143-145.compute-1.amazonaws.com:4000/tickets';
const putUrl = 'http://ec2-35-175-143-145.compute-1.amazonaws.com:4000/ticket';
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
        .then(() => {
          dispatch(getTickets());
        })
        .catch(err => {
          console.log(err)
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
        .put(`${putUrl}/${ticketId}`, { from, to, title: "event" }, config)
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
  // const date = sessionStorage.getItem("date") || moment().format('YYYY-MM-DD');
  // const currentMomth = sessionStorage.getItem("currentMonth")
  // console.log(moment(currentMomth).format('YYYY-MM'))

  // const from = new Date(moment(currentMomth).clone().format('YYYY-MM')).getTime();
  // const to = new Date(moment(currentMomth).clone().add(1, 'month').format('YYYY-MM')).getTime();

  // console.log(from);
  // console.log(to);

  return dispatch => {
    dispatch(getTicketsInit());
    axios
      .get(`${url}`)
      // .get(`${url}params/${from}/${to}`)
      .then(res => {
        const tickets = res.data;
        dispatch(getTicketsSuccess(tickets));
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

