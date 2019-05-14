import * as actionTypes from './actionTypes'
import axios from "axios";

const url = 'http://ec2-3-84-16-108.compute-1.amazonaws.com:4000/halls';

const config = {
  headers: {
    'Authorization': localStorage.getItem("token")
  }
}

export const loadHalls = () => {
  return dispatch => {
    dispatch(loadInit());

    axios
      .get(url, config)
      .then(res => {
        const { halls } = res.data;

        dispatch(loadSuccess(halls));
      })
      .catch(err => {
        dispatch(loadFail(err.message))
      });
  };
};

export const loadInit = () => {
  return {
    type: actionTypes.LOAD_HALLS_INIT
  }
}

export const loadSuccess = (halls) => {
  return {
    type: actionTypes.LOAD_HALLS_SUCCES,
    halls
  };
};

export const loadFail = (err) => {
  return {
    type: actionTypes.LOAD_HALLS_FAIL,
    err
  };
};