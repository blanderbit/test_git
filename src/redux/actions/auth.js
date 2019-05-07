import * as actionTypes from './actionTypes'
import axios from "axios";

export const signUp = (email, password) => {
  return dispatch => {
    //   dispatch(authStart());
    const user = {
      email,
      password,
    };

    let url = 'http://ec2-3-84-16-108.compute-1.amazonaws.com:4000/signUp';

    axios
      .post(url, user)
      .then(res => {
        console.log(res);
        const { id, email } = res.data;

        localStorage.setItem("userId", id);
        localStorage.setItem("email", email);

        dispatch(signUpSuccess(id, email));

        //   dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch(err => {
        //   dispatch(authFail(err.response.data.error.message));
        console.log(err);

      });
  };
};

export const signIn = (user) => {
  return dispatch => {
    //   dispatch(authStart());

    let url = 'http://ec2-3-84-16-108.compute-1.amazonaws.com:4000/signIn';

    axios
      .post(url, user)
      .then(res => {
        console.log(res);
        const { token, _id } = res.data;

        localStorage.setItem("token", token);
        localStorage.setItem("userId", _id);

        dispatch(signInSuccess(token));

        //   dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch(err => {
        //   dispatch(authFail(err.response.data.error.message));
        console.log(err);

      });
  };
};

export const signUpSuccess = (userId, email) => {
  return {
    type: actionTypes.SIGNUP_SUCCESS,
    email,
    userId
  };
};

export const signInSuccess = (token) => {
  return {
    type: actionTypes.SIGNIN_SUCCESS,
    token
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("email");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.LOGOUT
  };
};